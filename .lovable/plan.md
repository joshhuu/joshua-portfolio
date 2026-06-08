
# Josh Portfolio — "AI Engineer's OS"

A single-page, dark, OS-themed portfolio with a title bar, left sidebar nav, and view-swapped main content. SPA feel using local state (no route changes), plus a floating `josh.ai` chatbot backed by an AI model.

## Structure

```
src/
  routes/
    index.tsx                # mounts <OsShell />
  components/os/
    OsShell.tsx              # title bar + sidebar + main + floating chat
    TitleBar.tsx             # traffic-light dots, title, live clock
    Sidebar.tsx              # nav items, "open to work" status
    BootSequence.tsx         # first-load typewriter boot lines
    views/
      HomeView.tsx
      ProjectsView.tsx       # grid + ProjectModal (shadcn Dialog)
      ExperienceView.tsx     # log/timeline w/ expandable entries
      MissionsView.tsx       # achievement cards
      StackView.tsx          # grouped tech chips
      AboutView.tsx          # bio + fake `ls -la` terminal
      ContactView.tsx        # copy-to-clipboard + form
    chat/
      JoshAiWidget.tsx       # floating panel, suggestion chips, streaming
  data/
    portfolio.ts             # projects, experience, missions, stack (hardcoded)
  lib/josh-system-prompt.ts  # JOSH_SYSTEM_PROMPT string
  lib/chat.functions.ts      # createServerFn → calls model API
src/styles.css               # OS tokens (bg #0d0d10, panel #13131a, accent #7c6fcd)
```

Navigation between views is local `useState<View>` inside `OsShell` — no router changes, matching the SPA "OS" feel. Boot animation runs once per session (sessionStorage flag).

## Design tokens (added to `src/styles.css`)

- `--background: oklch(...)` ≈ `#0d0d10`
- `--card / --panel`: ≈ `#13131a`
- `--primary` (accent): ≈ `#7c6fcd` soft purple
- `--muted-foreground`, `--border` tuned for dark OS
- Per-project accent colors as inline styles on cards (not tokens)
- Subtle dot-grid via `background-image: radial-gradient(...)` on body

Fonts: load `JetBrains Mono` + `Geist` (or DM Sans fallback) from Google Fonts in `__root.tsx` head.

## Content (hardcoded from prompt)

`src/data/portfolio.ts` exports:
- `projects[]` — 6 entries incl. accent color, tags, long description, GitHub URL, results
- `experience[]` — Infynd, GfG KAHE, Stepping Edge, KAHE degree
- `missions[]` — InFynd AIM 2025, SIH 2024, Rakathon 2024
- `stackGroups[]` — AI/ML, Languages, Frontend, Backend, Data, Infra, Cloud/Certs
- `contact` — email, GitHub, portfolio, LinkedIn placeholder

## Views (behavior highlights)

- **Home**: typewriter `whoami` → name + tagline + two terminal-style CTA buttons (`./view_projects.sh`, `cat resume.pdf`) + status chips
- **Projects**: 2-col grid (1-col mobile); "Open →" opens shadcn `Dialog` with full detail
- **Experience**: vertical log timeline, click to expand bullets (shadcn `Collapsible`)
- **Missions**: dark cards with top glow line + hover gold/silver glow
- **Stack**: grouped rows of dark chips, accent-glow on hover, no bars/percentages
- **About**: two-column bio + decorative fake terminal showing `ls -la projects/`
- **Contact**: click-to-copy email (sonner toast), simple contact form (no backend submit yet — toast confirm)

## josh.ai chatbot

Floating bottom-right panel (FAB on mobile). Suggestion chips, input, streaming reply bubble. Powered by a server function `askJosh` that calls the LLM with `JOSH_SYSTEM_PROMPT` + user message.

**Model provider:** Two options:
1. **Default — Lovable AI Gateway** (recommended): zero setup, no API key needed. I'd use `google/gemini-2.5-flash` (or similar) instead of Groq's llama-3.3-70b.
2. **Groq (as you specified)**: needs `GROQ_API_KEY` secret. I'll prompt you to add it via the secrets tool, then the server fn calls `https://api.groq.com/openai/v1/chat/completions` with `llama-3.3-70b-versatile`.

I'll default to **Groq** since you explicitly named it. If you'd rather use Lovable AI Gateway (no key required), say so and I'll swap.

## Mobile

- Sidebar collapses to bottom tab bar (`useIsMobile`)
- Projects 1-col
- Boot animation shortened (fewer lines, faster)
- josh.ai widget becomes a FAB that opens a sheet

## Tech / libraries

- Already present: React, Tailwind v4, shadcn/ui, TanStack Start
- Add: `framer-motion` for boot lines, card stagger, sidebar transitions
- Live clock: `useEffect` + `setInterval(1000)`

## Out of scope / placeholders

- `resume.pdf` link is a `#` placeholder until you provide a file
- LinkedIn URL placeholder
- Two project cards marked "[Add your own]" kept as placeholders
- Contact form is UI-only (no email backend) — can wire to Resend later if you want

## Open question (one)

Use **Groq** (you'll add `GROQ_API_KEY`) or **Lovable AI Gateway** (no key, free credits included)? I'll proceed with Groq if you don't say.
