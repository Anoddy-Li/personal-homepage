export const siteContent = {
  locale: "zh-CN",
  repo: "personal-homepage",
  name: "李卓然",
  initials: "李",
  role: "物理学本科生 / 学生开发者",
  focus: ["物理", "编程", "研究", "学习记录"],
  tone: "简洁、安静、克制",
  siteTitle: "李卓然的个人主页",
  siteDescription: "李卓然的个人网站，记录物理学习、编程实践与日常反思。",
  brand: {
    label: "个人主页",
  },
  hero: {
    eyebrow: "李卓然",
    headline: "把学习过程认真地记录下来。",
    intro:
      "我是李卓然，主修物理，也在持续写代码。这个网站主要用来放个人介绍，以及一份可以长期积累的学习日志。",
    primaryCta: {
      label: "查看学习日志",
      href: "/study-log",
    },
    secondaryCta: {
      label: "关于我",
      href: "/about",
    },
  },
  statement:
    "我更看重稳定、长期、可复盘的进步。物理让我保持好奇，编程让我训练精确表达，写作让我知道自己真正学会了什么。",
  quickIntro: [
    "我在学校里学习物理，也会用编程做一些顺手的工具和小项目。",
    "相比一次性的冲刺，我更相信持续积累：每天学一点、写一点，再把过程安静地记录下来。",
  ],
  navigation: [
    { label: "首页", href: "/" },
    { label: "关于我", href: "/about" },
    { label: "学习日志", href: "/study-log" },
    { label: "联系", href: "/contact" },
  ],
  footer: {
    summary: "记录物理、编程与持续学习。",
    loginLabel: "后台登录",
    adminLabel: "进入管理后台",
  },
  aboutPage: {
    eyebrow: "关于我",
    title: "一个以物理为主线，也持续写代码的人。",
    description:
      "这里集中放个人简介、技能、学习经历、兴趣方向和最近在做的事。后续维护时，静态内容也尽量都放在同一个入口里。",
  },
  contactPage: {
    eyebrow: "联系",
    title: "用一页简单的信息，保留清楚的联系入口。",
    description:
      "如果你想交流学习方法、研究兴趣或编程实践，可以从这里找到最直接的联系方式。",
  },
  studyLogPage: {
    eyebrow: "学习日志",
    title: "公开整理每天的学习、复盘与反思。",
    description:
      "默认只展示已公开的日志。你可以按关键词、日期和标签筛选，也可以直接顺着时间往下读。",
    emptyTitle: "还没有公开日志",
    emptyDescription: "当后台有日志被发布后，它会自动出现在这里。",
    filteredEmptyTitle: "没有找到符合条件的日志",
    filteredEmptyDescription: "可以换一个关键词，或者清掉日期与标签后再试试。",
    backLabel: "返回学习日志",
  },
  loginPage: {
    eyebrow: "后台登录",
    title: "登录后管理学习日志。",
    description:
      "只有在 ADMIN_EMAILS 中配置过的管理员账号，才能进入后台、编辑日志和切换公开状态。",
  },
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Supabase",
    "PostgreSQL",
    "Python",
    "数据分析",
    "技术写作",
  ],
  tools: [
    "VS Code",
    "GitHub",
    "Vercel",
    "pnpm",
    "Notion",
    "Obsidian",
    "Jupyter",
  ],
  education: [
    {
      phase: "本科阶段",
      school: "学校名称待补充",
      major: "物理学",
      period: "2023 - 至今",
      focus: "以基础理论学习为主，同时补充编程与计算相关训练。",
      note: "正式上线前，建议把学校、专业方向和阶段信息替换为你的真实内容。",
    },
    {
      phase: "自主学习",
      school: "长期进行中",
      major: "编程与问题整理",
      period: "持续进行",
      focus: "围绕 Web 开发、工程习惯和笔记整理建立更稳定的学习节奏。",
      note: "我更在意长期积累是否清晰，而不是短时间内做了多少事。",
    },
  ],
  hobbies: [
    {
      title: "阅读与整理笔记",
      description: "会反复看值得回读的材料，把零散想法整理成能复用的笔记。",
    },
    {
      title: "慢慢搭建小工具",
      description: "喜欢做能真正减少摩擦的小系统，而不是只停留在演示层面。",
    },
    {
      title: "长期关注的问题",
      description: "关注学习方法、研究训练、知识整理和写作表达之间的关系。",
    },
  ],
  projects: [
    {
      title: "学习日志系统",
      status: "持续维护",
      description: "把每天的学习记录、总结和反思稳定地存进数据库，并持续整理成公开归档。",
    },
    {
      title: "物理笔记整理",
      status: "进行中",
      description: "把课程笔记、推导过程和概念误区逐步梳理成更清晰的长期资料。",
    },
  ],
  contact: {
    email: "your-email@example.com",
    emailNote: "当前这里是占位邮箱，正式对外前请替换成你的真实联系方式。",
    location: "中国 · 上海时区",
    availability: "欢迎围绕学习、研究和编程实践交流。",
  },
  studyLog: {
    featuredTags: ["物理", "力学", "编程", "反思", "研究"],
    moodOptions: ["专注", "好奇", "平稳", "疲惫", "满足"],
    pageSize: 12,
    homePreviewCount: 3,
  },
} as const;

export type SiteContent = typeof siteContent;
