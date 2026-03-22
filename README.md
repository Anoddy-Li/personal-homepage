# personal-homepage

一个基于 Next.js、Supabase 和 Vercel 的中文个人主页项目。当前版本的重点是两件事：

- 公开前台保持简洁、克制、现代，并带一点正式科技官网的设计感
- 学习日志全部通过后台管理，真实写入数据库，不靠修改源文件维护

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

- `NEXT_PUBLIC_SITE_URL` 本地开发时通常使用 `http://localhost:3000`
- 线上部署后应改成正式站点地址
- `ADMIN_EMAILS` 支持多个邮箱，用英文逗号分隔
- `SUPABASE_SERVICE_ROLE_KEY` 只允许在服务端使用，不能暴露到前端

## Supabase 配置

1. 创建 Supabase 项目
2. 把项目的 URL、anon key、service role key 填进 `.env.local`
3. 执行数据库 migration：
   [202603220001_create_study_logs.sql](/E:/personal-homepage/supabase/migrations/202603220001_create_study_logs.sql)
4. 在 Supabase Auth 中创建管理员账号，邮箱要和 `ADMIN_EMAILS` 一致
5. 如需写入演示数据，执行：

```bash
pnpm seed
```

## 静态内容和数据库内容分别改哪里

静态内容：

- 主要改 [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- 包括：首页文案、个人资料、关于我、联系信息、研究兴趣、技能、学习经历
- 首页首屏灰色身份信息条的文案来自 `hero.eyebrow` 和 `hero.kicker`，渲染位置在 [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)，这是保留元素，不要再误删

数据库内容：

- 学习日志通过后台维护
- 标签通过后台维护
- 不要靠修改源文件来新增日志
- 登录入口：`/login`
- 后台入口：`/admin/study-logs`
- 标签入口：`/admin/tags`
- 顶部栏滚动行为在 [src/components/site-header.tsx](/E:/personal-homepage/src/components/site-header.tsx) 里维护，当前规则是“向下滚动时隐藏、向上滚动时出现”，修改时不要破坏这个交互

## 管理员后台如何登录和使用

1. 确保登录邮箱已经写进 `ADMIN_EMAILS`
2. 确保这个邮箱对应的用户已存在于 Supabase Auth
3. 打开 `/login`
4. 登录后进入 `/admin`
5. 在 `/admin/study-logs` 中可以：
   - 新增学习日志
   - 编辑学习日志
   - 删除学习日志
   - 发布 / 转为草稿
   - 管理标题、日期、摘要、正文、标签、时长、心情等字段
6. 在 `/admin/tags` 中可以：
   - 新增标签
   - 修改标签名称
   - 删除未被日志使用的标签

当前编辑器支持 Markdown 正文编辑和实时预览，保存后直接写入数据库；标签目录同样保存在数据库里，不再写死在前端。

## 修改后的验收建议

每次准备同步到线上前，至少完成下面这组检查：

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- 检查首页灰色身份信息条是否正常显示
- 检查顶部栏下滑隐藏、上滑出现是否自然
- 检查学习日志公开页筛选、详情跳转、管理员日志 CRUD 和标签管理是否正常

## 字体方案

当前站点使用：

- 正文：`Noto Sans SC`
- 标题：`Noto Serif SC`
- 备用字体：`PingFang SC`、`Hiragino Sans GB`、`Microsoft YaHei UI`、`Songti SC` 等系统中文字体

对应文件：

- [src/app/layout.tsx](/E:/personal-homepage/src/app/layout.tsx)

如果以后要替换字体，优先保持：

- 中文优先
- 标题与正文有明确区分
- 加载稳定
- 不牺牲整体克制感

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

- 仓库地址：[https://github.com/Anoddy-Li/personal-homepage](https://github.com/Anoddy-Li/personal-homepage)
- 默认分支：`main`

如果本机 `gh` 未登录，可先执行：

```bash
gh auth login
```

## 你以后最常改的内容

- 静态文案和个人资料：
  [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- 首页结构与视觉节奏：
  [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)
- 全站背景、字体、细节样式：
  [src/app/globals.css](/E:/personal-homepage/src/app/globals.css)
- 详细维护说明：
  [CONTENT_GUIDE.md](/E:/personal-homepage/CONTENT_GUIDE.md)

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
- 四项导航：首页 / 关于我 / 学习日志 / 联系
- 设计感升级后的首页、关于页、联系页、学习日志页
- 克制的滚动 reveal 与细微 hover/scroll 交互
- 学习日志公开列表、详情、筛选
- 管理员登录
- 学习日志后台创建 / 编辑 / 删除 / 发布 / 转草稿
- Supabase 持久化
- 前后端 Zod 校验
- 404 / loading / error / sitemap / robots / Open Graph
