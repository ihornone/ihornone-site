export interface StackTool {
  name: string
  refs: string[]
}

export interface StackSection {
  title: string
  body: string[][]
}

export const sectionContent: StackSection[] = [
  {
    title: "Mobile",
    body: [
      ["I build cross-platform mobile apps with ", "React Native", " using the ", "Expo", " ecosystem — from prototype to publication."],
      ["I handle local storage, configure push notifications, and optimize rendering for complex, data-heavy lists. I focus on fluid animations and responsive interfaces to make the app feel as native as possible."],
    ],
  },
  {
    title: "Web",
    body: [
      ["My main web stack is ", "React", " paired with ", "TypeScript", ". I build projects with ", "Next.js", ", actively leveraging App Router, server components, and ISR for fast page loads. For styling I use ", "Tailwind CSS", "."],
      ["For an ultra-fast runtime, package manager, and automation tooling I use ", "Bun", ", along with ", "Node.js", " for building API routes and serverless functions. I deploy projects to Vercel, keep code on ", "GitHub", ", and track tasks and sprints in ", "Jira", "."],
    ],
  },
  {
    title: "Desktop",
    body: [
      ["I build desktop apps with ", "Tauri", " backed by ", "Rust", ". I appreciate the minimal binary size and the absence of a heavy runtime (unlike ", "Electron", "). I use this stack to create fast utilities where web technologies on the frontend pair perfectly with ", "Rust", " system calls."],
    ],
  },
  {
    title: "AI & LLM",
    body: [
      ["I actively integrate AI into my development workflow and experiment with language model integrations in apps. For daily coding I rely on ", "Claude Code", " and ", "Claude AI", "."],
      ["In projects I route requests across providers using ", "OpenRouter", ". I have experience working with APIs from ", "OpenAI", ", ", "Gemini", ", ", "DeepSeek", ", ", "Mistral AI", ", ", "Kimi", ", ", "Qwen", ", and ", "Grok xAI", ", understanding the strengths of each model. For discovering and testing open source solutions I use ", "Hugging Face", "."],
    ],
  },
  {
    title: "Services & Infra",
    body: [
      ["I use ", "Cloudflare", " for domains, DNS configuration, and serverless functions (Workers, R2)."],
      ["I build backend services and server-side logic with ", "Firebase", " (Auth, Firestore, Cloud Functions) or ", "Supabase", " (PostgreSQL, Realtime, Row Level Security). I design relational databases in ", "PostgreSQL", " — from simple schemas to complex queries."],
      ["For caching I use ", "Redis", ". I also have experience integrating payments via ", "Stripe", " — from simple Checkout sessions to complex Subscription flows."],
    ],
  },
  {
    title: "Design",
    body: [
      ["I create design systems, interactive prototypes, and interfaces in ", "Figma", ". Well versed in components, variants, Auto Layout, and design tokens."],
      ["Design and code are one and the same to me, so I build interfaces pixel-perfect from the start, saving time during development."],
    ],
  },
  {
    title: "Tools",
    body: [
      ["My primary editor is ", "VS Code", ". I manage code with ", "Git", " through meaningful commits and clean Pull Requests. For environment isolation and service containerization I use ", "Docker", "."],
    ],
  },
]
