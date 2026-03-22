export const siteContent = {
  locale: "zh-CN",
  repo: "personal-homepage",
  name: "李卓然",
  initials: "李",
  nickname: "Anoddy",
  institution: "青岛大学",
  city: "山东青岛",
  role: "物理学本科生 · 学生开发者",
  focus: ["物理", "编程", "科研", "学习记录"],
  tone: "简洁、安静、克制，但保留明确的设计感",
  siteTitle: "李卓然的个人主页",
  siteDescription: "李卓然的个人网站，记录物理学习、轻量科研、编程实践与日常反思。",
  brand: {
    label: "个人主页",
  },
  hero: {
    eyebrow: "Anoddy / 李卓然",
    kicker: "青岛大学物理学本科生 · 量子非互易计算 / 物理学科教育",
    headline: "把学习、科研与写代码的过程认真记录下来。",
    intro:
      "我就读于青岛大学，常住山东青岛。主线是物理学习，也持续写代码、做一点科研，并把每天的思考整理成长期可回看的学习日志。",
    primaryCta: {
      label: "查看学习日志",
      href: "/study-log",
    },
    secondaryCta: {
      label: "关于我",
      href: "/about",
    },
  },
  homeHighlights: [
    {
      label: "学校与方向",
      value: "青岛大学 · 物理学",
      description: "以本科训练为主线，也持续补充计算与工程实践。",
    },
    {
      label: "研究关注",
      value: "量子非互易计算、物理学科教育",
      description: "把课程、阅读与问题整理成长期积累，而不是短期堆叠。",
    },
    {
      label: "记录方式",
      value: "学习日志 + 持续复盘",
      description: "让推导、代码和反思都能被重新回看、继续完善。",
    },
  ],
  statement:
    "我更看重稳定、长期、可复盘的进步。物理让我保持好奇，科研训练让我更认真地面对问题，编程让我练习精确表达，写作则帮助我确认自己真正学会了什么。",
  quickIntro: [
    "我在学校里学习物理，也会用编程做一些顺手的工具、小系统和日常资料整理。",
    "相比一次性的冲刺，我更相信持续积累：每天学一点、写一点，再把过程安静地记录下来。",
  ],
  navigation: [
    { label: "首页", href: "/" },
    { label: "关于我", href: "/about" },
    { label: "学习日志", href: "/study-log" },
    { label: "联系", href: "/contact" },
  ],
  footer: {
    summary: "长期记录物理学习、科研训练与编程实践。",
    note: "青岛大学 · 山东青岛",
    loginLabel: "后台登录",
    adminLabel: "进入管理后台",
  },
  aboutPage: {
    eyebrow: "关于我",
    title: "把物理、科研与编程放在同一条长期线上。",
    description:
      "这里集中放个人简介、研究兴趣、技能、学习经历和最近在做的事。后续维护时，静态内容也尽量都放在同一个入口里。",
  },
  contactPage: {
    eyebrow: "联系",
    title: "保留一个清楚、克制、可长期使用的联系入口。",
    description:
      "如果你想交流物理学习、研究兴趣、长期记录方法或编程实践，这里会是最直接的入口。",
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
  principles: [
    {
      title: "长期主义",
      description: "更重视稳定推进和可复盘的积累，而不是短期内做很多看起来热闹的事情。",
    },
    {
      title: "认真表达",
      description: "无论是推导、代码还是写作，我都更偏向清楚、克制、能被反复回看的表达方式。",
    },
    {
      title: "轻量但真实",
      description: "偏爱能直接解决问题的小系统和长期笔记，而不是只适合展示的表面效果。",
    },
  ],
  researchInterests: [
    {
      title: "量子非互易计算",
      description: "保持对量子体系、计算框架与相关问题表达方式的持续关注，也会把阅读和理解过程记进日志里。",
    },
    {
      title: "物理学科教育",
      description: "关心物理知识如何被更好地理解、讲清楚和长期掌握，尤其在学习路径与表达方式上。",
    },
  ],
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
      school: "青岛大学",
      major: "物理学",
      period: "2023 - 至今",
      focus: "以本科物理训练为主，同时持续补充编程、资料整理和计算相关能力。",
      note: "现在的重点是把课程学习、研究兴趣和长期记录方式慢慢接到一起。",
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
      description: "把每天的学习记录、总结和反思稳定地存进数据库，并逐步整理成可以长期回看的公开归档。",
    },
    {
      title: "科研与课程笔记整理",
      status: "进行中",
      description: "把课程笔记、推导过程、阅读记录和概念误区逐步梳理成更清晰的长期资料。",
    },
  ],
  contact: {
    email: "18561712548@163.com",
    emailNote: "邮件是最稳定的联系方式，适合交流学习方法、研究兴趣、笔记整理或编程实践。",
    location: "中国 · 山东青岛",
    availability: "欢迎围绕物理学习、量子非互易计算、物理学科教育和长期记录方法交流。",
  },
  studyLog: {
    moodOptions: ["专注", "好奇", "平稳", "疲惫", "满足"],
    editorTips: [
      "摘要先写最重要的收获或卡点，方便以后快速回看。",
      "正文建议按“今天做了什么 / 为什么 / 下一步”来组织。",
      "标签尽量保持简洁稳定，方便以后按主题筛选。",
    ],
    pageSize: 12,
    homePreviewCount: 3,
  },
} as const;

export type SiteContent = typeof siteContent;
