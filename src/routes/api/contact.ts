import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, 1-hour window.
//
// The 1-hour window is reliable for the contact form: Cloudflare Worker
// isolates stay alive for hours on active deployments, and even if a cold
// start occurs the worst case is one extra email per IP — acceptable for a
// portfolio. Timestamps are pruned on every request to keep memory bounded.
// ---------------------------------------------------------------------------
const rateLimits = new Map<string, number[]>();
const HOUR_WINDOW = 60 * 60 * 1000;
const MAX_PER_HOUR = 3; // 3 contact messages per IP per hour is generous for legit users

/** Returns true if rate-limited, updates map if not. */
function checkAndUpdateRateLimit(ip: string): boolean {
  const now = Date.now();
  const fresh = (rateLimits.get(ip) ?? []).filter((t) => now - t < HOUR_WINDOW);
  if (fresh.length >= MAX_PER_HOUR) {
    rateLimits.set(ip, fresh);
    return true;
  }
  rateLimits.set(ip, [...fresh, now]);
  return false;
}

// C5/C6: Zod schema with format + length validation
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email format").max(320, "Email is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long (max 5000 characters)"),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          let rawBody: unknown;
          try {
            rawBody = await request.json();
          } catch {
            return new Response("Invalid JSON", { status: 400 });
          }

          // C5/C6: Validate with zod
          const parsed = ContactSchema.safeParse(rawBody);
          if (!parsed.success) {
            const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
            return new Response(firstError, { status: 400 });
          }
          const { name, email, message } = parsed.data;

          // S6: Prefer cf-connecting-ip (Cloudflare's trusted header)
          const ip =
            request.headers.get("cf-connecting-ip") ||
            request.headers.get("x-forwarded-for") ||
            "unknown";

          // Rate limit check with memory pruning
          if (checkAndUpdateRateLimit(ip)) {
            return new Response(
              "Too many messages sent. Please try again in an hour.",
              { status: 429 },
            );
          }

          const key = process.env.RESEND_API_KEY;
          if (!key) {
            console.error("[contact] RESEND_API_KEY missing");
            return new Response(
              "Email service is not configured. Please reach out via LinkedIn or email directly.",
              { status: 500 },
            );
          }

          const resend = new Resend(key);

          const { data, error } = await resend.emails.send({
            from: "Portfolio Contact Form <onboarding@resend.dev>",
            to: "joshulive@gmail.com",
            subject: `New Portfolio Message from ${name}`,
            replyTo: email,
            text: `You received a new message from your portfolio contact form!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          });

          if (error) {
            // S5: Log only message string, not full error object
            console.error("[contact] Resend error:", error.message ?? "unknown");
            return new Response("Failed to send email. Please try again.", { status: 500 });
          }

          return Response.json({ success: true, id: data?.id });
        } catch (error) {
          // S5: Log only message string
          console.error(
            "[contact] Unexpected error:",
            error instanceof Error ? error.message : "unknown",
          );
          return new Response("Internal server error", { status: 500 });
        }
      },
    },
  },
});
