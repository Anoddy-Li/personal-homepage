export const profile = {
  locale: "zh-CN",
  repo: "personal-homepage",
  name: "李卓然",
  initials: "LZ",
  role: "Physics undergraduate / student developer",
  focus: ["physics", "coding", "research", "learning reflection"],
  tone: "clean minimal academic",
  siteTitle: "李卓然 | Personal Homepage",
  siteDescription:
    "李卓然的个人主页，记录物理学习、编程实践、研究兴趣与日常反思。",
  hero: {
    headline: "Building a quiet, disciplined space for physics, code, and reflection.",
    intro:
      "I study physics, build software to sharpen my thinking, and keep a daily log so progress stays visible.",
    primaryCta: {
      label: "Browse Study Log",
      href: "/study-log",
    },
    secondaryCta: {
      label: "About Me",
      href: "/about",
    },
  },
  quickLinks: [
    {
      title: "Study Log",
      description: "Daily notes, summaries, and long-form reflections.",
      href: "/study-log",
    },
    {
      title: "About",
      description: "Profile, skill stack, tools, and personal statement.",
      href: "/about",
    },
    {
      title: "Contact",
      description: "How to reach out and what kind of work I care about.",
      href: "/contact",
    },
  ],
  statement:
    "I care about slow, reliable progress. Physics trains my curiosity, software trains my precision, and writing trains my ability to notice what I actually learned.",
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Supabase",
    "PostgreSQL",
    "Python",
    "Data analysis",
    "Technical writing",
  ],
  tools: [
    "VS Code",
    "Git & GitHub",
    "Vercel",
    "pnpm",
    "Notion",
    "Obsidian",
    "Jupyter",
  ],
  education: [
    {
      phase: "Undergraduate",
      school: "Placeholder University",
      major: "Physics",
      period: "2023 - Present",
      focus: "Theoretical foundations, computation, and research literacy.",
      note: "Replace this block with your actual school, major, and research interests.",
    },
    {
      phase: "Independent study",
      school: "Self-directed practice",
      major: "Programming & problem solving",
      period: "Ongoing",
      focus: "Web development, backend thinking, and engineering habits.",
      note: "Daily repetition matters more than occasional intensity.",
    },
  ],
  hobbies: [
    {
      title: "Reading and annotation",
      description: "Scientific writing, essays, and books that reward close rereading.",
    },
    {
      title: "Long-form note taking",
      description: "Turning scattered ideas into durable notes and better questions.",
    },
    {
      title: "Quiet building",
      description: "Small tools, thoughtful interfaces, and systems that reduce friction.",
    },
  ],
  projects: [
    {
      title: "Study Log System",
      status: "Active",
      description:
        "A private/public writing workflow for logging daily study sessions and reflective notes.",
    },
    {
      title: "Physics note archive",
      status: "In progress",
      description:
        "A structured set of notes for courses, solved problems, and recurring conceptual gaps.",
    },
  ],
  contact: {
    emailLabel: "Add your real email in src/config/profile.ts before launch.",
    location: "Asia/Shanghai",
    availability: "Open to research conversations, student collaborations, and thoughtful side projects.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Education", href: "/education" },
    { label: "Hobbies", href: "/hobbies" },
    { label: "Projects", href: "/projects" },
    { label: "Study Log", href: "/study-log" },
    { label: "Contact", href: "/contact" },
  ],
  studyLog: {
    featuredTags: ["physics", "coding", "research", "math", "reflection"],
    moodOptions: ["Focused", "Curious", "Tired", "Steady", "Satisfied"],
    pageSize: 12,
    homePreviewCount: 3,
  },
} as const;

export type ProfileConfig = typeof profile;
