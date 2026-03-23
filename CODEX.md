# CODEX

这个仓库给后续 Codex / AI 维护时的默认要求如下。

## 产品与架构边界

- 保留现有技术栈：Next.js App Router + TypeScript + Tailwind + shadcn/ui + Supabase + Zod
- 不要推倒重来
- 不要破坏数据库结构、认证链路、Vercel 部署链路
- 学习日志必须继续走后台和数据库，不要改回手写源文件

## 设计原则

- 整体气质参考头部科技公司官网：简洁、克制、现代、有设计感但不浮夸
- 保持中文个人主页的温度，不做成炫技作品集
- 首页首屏要紧凑，避免夸张大空白
- 首页主标题上方的灰色身份信息条是保留元素，不要再误删
- 可以有轻量 reveal、hover、scroll 状态变化，但必须性能友好并尊重 `prefers-reduced-motion`
- 背景装饰保持轻，不要加重页面

## 内容维护原则

- 静态内容优先集中在 [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- 学习日志新增 / 编辑 / 删除 / 发布，必须通过 `/login` 和 `/admin/study-logs`
- 标签必须通过 `/admin/tags` 和数据库维护，不要重新写回前端常量
- header 保持“仅顶部范围可见”的产品级交互，回到顶部按钮与它共用同一套顶部阈值
- 不要在公开页面提示用户通过改源文件来发布日志
- README 应保持“项目主页 + 开发文档并存”的风格，不要退回操作手册式写法
- 正式项目介绍文档维护在 [docs/project-introduction.md](/E:/personal-homepage/docs/project-introduction.md)，需要保持结构化、图表化与严谨表达

## 修改后必须做的事

1. 运行：
   `pnpm lint`
   `pnpm typecheck`
   `pnpm test`
   `pnpm build`
2. 验收：首页灰色身份信息条、header 顶部范围显示、回到顶部按钮、学习日志公开页、管理员日志 CRUD、标签管理
3. 提交到 GitHub 仓库
4. push 到 `main`
5. 确认 Vercel 生产部署成功

## 最常改的文件

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)
- [src/app/globals.css](/E:/personal-homepage/src/app/globals.css)
- [src/app/(site)/about/page.tsx](/E:/personal-homepage/src/app/(site)/about/page.tsx)
