export type Project = {
  id: string;
  name: string;
  accent: string;
  short: string;
  description: string;
  tags: string[];
  github?: string;
  architecture: string[];
  results?: string[];
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "agentic-company-intel",
    name: "Agentic Company Intelligence System",
    accent: "#7c6fcd",
    short:
      "Agentic AI that crawls company websites and B2B datasets, extracting and structuring company/people data at scale.",
    description:
      "An agentic intelligence pipeline that autonomously discovers, crawls, and structures company and people data from open web sources and B2B datasets. Built end-to-end with offline LLM orchestration, multi-step planning, and automated QA. 1st place winner at InFynd AIM 2025.",
    tags: ["LangChain", "Llama 3", "LangGraph", "Python", "Web Scraping"],
    architecture: [
      "LangGraph planner → researcher → extractor → QA agents",
      "Llama 3 served locally via Ollama (offline capable)",
      "Async scraping layer with anti-bot strategies",
      "Structured output via Pydantic schemas + auto QA reports",
    ],
    results: [
      " 1st place — InFynd AIM 2025 hackathon",
      "Scaled extraction across 1000s of company pages",
    ],
    github: "https://github.com/joshhuu/B2B-Agent",
  },

  {
    id: "rural-ai",
    name: "Rural AI Assistant",
    accent: "#d97706",
    short:
      "Offline-first AI assistant for low-connectivity rural environments — voice stock tracking, sales logging, intent extraction.",
    description:
      "An offline-first assistant designed for rural shopkeepers and field workers. Voice-driven stock tracking and sales logging that runs entirely on-device, no internet required.",
    tags: ["Python", "Offline LLM", "Voice Interfaces", "Local Storage"],
    architecture: [
      "On-device speech-to-text",
      "Local LLM for intent extraction",
      "SQLite-based stock + sales ledger",
      "Sync layer for opportunistic online uploads",
    ],
    results: ["Shortlisted for Yukti Innovation Challenge (up to 2nd round)"],
    github: "https://github.com/joshhuu/rural-ai-app",
  },
  {
    id: "satellite-air",
    name: "Satellite Air Quality Downscaling",
    accent: "#2563eb",
    short:
      "ML models that convert low-resolution satellite pollution data into high-resolution air quality maps.",
    description:
      "A two-stage ML pipeline (Random Forest + CNN) that downscales coarse satellite pollution measurements into high-resolution air quality maps, validated against ground stations.",
    tags: ["Python", "Random Forest", "CNN", "Satellite Data"],
    architecture: [
      "Preprocessing of .nc satellite datasets",
      "Random Forest baseline + CNN spatial model",
      "Validation against ground-station ground truth",
    ],
    results: [
      "SIH 2024 Finalist (Smart India Hackathon)",
      ">90% validation accuracy on held-out regions",
    ],
    github: "https://github.com/joshhuu/airquality-downscaling",
  },

];

export type Experience = {
  id: string;
  range: string;
  org: string;
  role: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    id: "infynd",
    range: "2026-03 → Present",
    org: "Infynd",
    role: "AI Engineering Intern",
    bullets: [
      "Building production AI pipelines and agentic systems at an AI-first B2B startup.",
      "Owning extraction, orchestration, and evaluation layers for live data workflows.",
    ],
  },
  {
    id: "gfg",
    range: "2025-06 → 2026-03",
    org: "GeeksforGeeks KAHE",
    role: "Technical Head",
    bullets: [
      "Conducted hands-on workshops on Python and Data Science.",
      "Led and organized a 2-day intra-college hackathon.",
      "Mentored students on projects and technology career paths.",
    ],
  },
  {
    id: "stepping-edge",
    range: "2024-06 → 2024-12",
    org: "Stepping Edge",
    role: "AI Intern",
    bullets: [
      "Built web scraping pipelines for structured data extraction and knowledge-graph organization.",
      "Implemented website summarization workflows using LangChain.",
    ],
  },
];

export type Education = {
  id: string;
  range: string;
  institution: string;
  degree: string;
  bullets: string[];
};

export const education: Education[] = [
  {
    id: "kahe",
    range: "2023 → 2027",
    institution: "Karpagam Academy of Higher Education",
    degree: "B.Tech AI & Data Science (ongoing)",
    bullets: ["Coursework spanning AI, Data Science and Software Engineering."],
  },
];

export type Mission = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  status: string;
};

export const missions: Mission[] = [
  {
    id: "infynd-aim",
    title: "1st Place — InFynd AIM",
    subtitle: "Agentic AI & B2B Data Intelligence",
    year: "2025",
    status: "ACCOMPLISHED",
  },
  {
    id: "sih",
    title: "SIH Finalist",
    subtitle: "Smart India Hackathon · ISRO Problem Statement",
    year: "2024",
    status: "COMPLETED",
  },
  {
    id: "rakathon",
    title: "Top 100 / 8,000+ Teams",
    subtitle: "Rakathon 2024 · Rakuten India",
    year: "2024",
    status: "ACHIEVED",
  },
  {
    id: "gfg-ambassador",
    title: "Campus Ambassador",
    subtitle: "GeeksforGeeks",
    year: "2024",
    status: "COMPLETED",
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  {
    label: "AI / ML",
    items: [
      "LangChain",
      "LangGraph",
      "CrewAI",
      "HuggingFace",
      "Ollama",
      "ChromaDB",
      "Pinecone",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
    ],
  },
  { label: "Languages", items: ["Python", "JavaScript", "Java", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["FastAPI", "Node.js", "REST APIs"] },
  { label: "Data", items: ["NumPy", "Pandas", "Web Scraping", "Pydantic v2"] },
  { label: "Infrastructure", items: ["Docker", "Git", "GitHub", "MySQL"] },
  { label: "Cloud / Certs", items: ["Microsoft Azure AI", "IBM Data Science Professional"] },
];

export const contact = {
  email: "joshuasuresh08@gmail.com",
  github: "https://github.com/joshhuu",
  githubHandle: "joshhuu",
  portfolio: "joshuatech.vercel.app",
  linkedin: "https://www.linkedin.com/in/joshua08/",
};
