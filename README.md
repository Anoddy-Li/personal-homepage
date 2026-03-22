# personal-homepage

一个基于 Next.js、Supabase 和 Vercel 的中文个人主页项目。当前版本重点放在两个方向：

- 用简洁的公开页面展示个人信息
- 用后台维护数据库里的学习日志

## 技术栈

- Next.js 16（App Router）
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Supabase Postgres + Auth
- Zod
- Vitest

## 本地启动

```bash
pnpm install
pnpm dev
```

常用检查命令：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm seed
```

## 环境变量

把 `.env.example` 复制为 `.env.local`，然后填写：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=你的 Supabase 项目地址
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service role key
ADMIN_EMAILS=你的管理员邮箱
```

说明：

- `NEXT_PUBLIC_SITE_URL` 本地开发时可用 `http://localhost:3000`
- 线上部署后应改成正式站点地址
- `ADMIN_EMAILS` 支持多个邮箱，用英文逗号分隔
- `SUPABASE_SERVICE_ROLE_KEY` 只允许在服务端使用，不能暴露到前端

## Supabase 配置

1. 创建 Supabase 项目
2. 把项目的 URL、anon key、service role key 填进 `.env.local`
3. 执行数据库 migration：
   [supabase/migrations/202603220001_create_study_logs.sql](/E:/personal-homepage/supabase/migrations/202603220001_create_study_logs.sql)
4. 在 Supabase Auth 中创建管理员账号，邮箱要和 `ADMIN_EMAILS` 一致
5. 如需写入演示数据，执行：

```bash
pnpm seed
```

## 修改后如何提交并更新线上网站

推荐流程：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
git add .
git commit -m "你的提交说明"
git push origin main
```

## Vercel 自动部署如何触发

当前项目已经和 GitHub 仓库联动。

- 当你把代码 push 到 `main` 后，Vercel 会自动拉取最新提交并重新部署
- 部署完成后，线上地址会自动更新到最新版本
- 如果你只想手动触发一次生产部署，也可以在本地执行：

```bash
vercel --prod
```

## GitHub 仓库

- 仓库地址：
  [https://github.com/Anoddy-Li/personal-homepage](https://github.com/Anoddy-Li/personal-homepage)
- 默认分支：`main`

如果本机 `gh` 未登录，可先执行：

```bash
gh auth login
```

## 你以后最常改的内容

静态文案和个人资料：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

学习日志后台录入：

- `/login`
- `/admin/study-logs`

详细维护说明：

- [CONTENT_GUIDE.md](/E:/personal-homepage/CONTENT_GUIDE.md)

## 项目结构

- [src/app](/E:/personal-homepage/src/app)：页面、布局、API Route
- [src/components](/E:/personal-homepage/src/components)：页面组件、表单、表格
- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)：集中维护站点静态内容
- [src/db](/E:/personal-homepage/src/db)：数据仓储与数据库类型
- [src/lib](/E:/personal-homepage/src/lib)：鉴权、环境变量、服务逻辑
- [src/schemas](/E:/personal-homepage/src/schemas)：Zod 校验
- [scripts/seed.ts](/E:/personal-homepage/scripts/seed.ts)：演示学习日志 seed

## 当前已实现

- 中文化的公开主页
- 精简后的四项导航：首页 / 关于我 / 学习日志 / 联系
- 合并后的“关于我”页面
- 学习日志公开列表、详情、筛选
- 管理员登录
- 学习日志后台创建 / 编辑 / 删除 / 发布 / 转草稿
- Supabase 持久化
- 前后端 Zod 校验
- 404 / loading / error / sitemap / robots / Open Graph
