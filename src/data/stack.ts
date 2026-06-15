export interface StackCategory {
  label: string
  items: { name: string; icon: string }[]
}

export const stack: StackCategory[] = [
  {
    label: 'Mobile',
    items: [
      { name: 'React Native', icon: '/icons/react-native.svg' },
      { name: 'Expo', icon: '/icons/expo.svg' },
    ],
  },
  {
    label: 'Web',
    items: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Next.js', icon: '/icons/nextjs.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
      { name: 'Bun', icon: '/icons/bun.svg' },
    ],
  },
  {
    label: 'Desktop',
    items: [
      { name: 'Tauri', icon: '/icons/tauri.svg' },
      { name: 'Rust', icon: '/icons/rust.svg' },
      { name: 'Electron', icon: '/icons/electron.svg' },
    ],
  },
  {
    label: 'AI',
    items: [
      { name: 'Claude AI', icon: '/icons/claude-ai.svg' },
      { name: 'Claude Code', icon: '/icons/claude-code.svg' },
      { name: 'OpenAI', icon: '/icons/openai.svg' },
      { name: 'Codex OpenAI', icon: '/icons/codex-openai.svg' },
      { name: 'DeepSeek', icon: '/icons/deepseek.svg' },
      { name: 'Gemini', icon: '/icons/gemini.svg' },
      { name: 'Gemini CLI', icon: '/icons/gemini-cli.svg' },
      { name: 'Grok xAI', icon: '/icons/grok-xai.svg' },
      { name: 'Mistral AI', icon: '/icons/mistral-ai.svg' },
      { name: 'Kimi', icon: '/icons/kimi.svg' },
      { name: 'Qwen', icon: '/icons/qwen.svg' },
      { name: 'Hugging Face', icon: '/icons/hugging-face.svg' },
      { name: 'OpenRouter', icon: '/icons/openrouter.svg' },
    ],
  },
  {
    label: 'Services',
    items: [
      { name: 'Cloudflare', icon: '/icons/cloudflare.svg' },
      { name: 'Firebase', icon: '/icons/firebase.svg' },
      { name: 'Supabase', icon: '/icons/supabase.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
      { name: 'Stripe', icon: '/icons/stripe.svg' },
      { name: 'Redis', icon: '/icons/redis.svg' },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'Figma', icon: '/icons/figma.svg' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'GitHub', icon: '/icons/github.svg' },
      { name: 'VS Code', icon: '/icons/vscode.svg' },
      { name: 'Jira', icon: '/icons/jira.svg' },
      { name: 'Docker', icon: '/icons/docker.svg' },
    ],
  },
]
