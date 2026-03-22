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
- 可以有轻量 reveal、hover、scroll 状态变化，但必须性能友好并尊重 `prefers-reduced-motion`
- 背景装饰保持轻，不要加重页面

## 内容维护原则

- 静态内容优先集中在 [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- 学习日志新增 / 编辑 / 删除 / 发布，必须通过 `/login` 和 `/admin/study-logs`
- 不要在公开页面提示用户通过改源文件来发布日志

## 修改后必须做的事

1. 运行：
   `pnpm lint`
   `pnpm typecheck`
   `pnpm test`
   `pnpm build`
2. 提交到 GitHub 仓库
3. push 到 `main`
4. 确认 Vercel 生产部署成功

## 最常改的文件

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)
- [src/app/globals.css](/E:/personal-homepage/src/app/globals.css)
- [src/app/(site)/about/page.tsx](/E:/personal-homepage/src/app/(site)/about/page.tsx)
