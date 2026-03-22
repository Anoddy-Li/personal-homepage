# CONTENT_GUIDE

这份文档只讲一件事：你以后自己怎么改这个网站。

## 1. 修改首页文案改哪个文件

优先修改：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

首页最常改的字段：

- `hero.eyebrow`
- `hero.kicker`
- `hero.headline`
- `hero.intro`
- `hero.primaryCta`
- `hero.secondaryCta`
- `homeHighlights`
- `statement`
- `quickIntro`

如果你想改首页布局本身，再看：

- [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)

补充说明：
- 首页主标题上方那条灰色身份信息条是保留元素，文案来自 `hero.eyebrow` 和 `hero.kicker`
- 如果只是改这条信息条的文字，优先改 [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

## 2. 修改个人资料改哪个文件

统一修改：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

常见字段：

- `name`：姓名
- `nickname`：昵称
- `institution`：学校
- `city`：所在地
- `role`：身份标题
- `statement`、`quickIntro`：简介
- `researchInterests`：研究方向
- `principles`：做事方式
- `skills`：技能
- `tools`：常用工具
- `education`：学习经历
- `hobbies`：兴趣与长期关注
- `projects`：最近在做的事

## 3. 修改联系信息改哪个文件

改这里：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

重点看：

- `contact.email`
- `contact.emailNote`
- `contact.location`
- `contact.availability`

如果你想改联系页的排版结构，再看：

- [src/app/(site)/contact/page.tsx](/E:/personal-homepage/src/app/(site)/contact/page.tsx)

## 4. 学习日志以后如何新增 / 编辑 / 发布

学习日志不是改源文件，而是走后台和数据库。

操作流程：

1. 打开线上站点或本地站点的 `/login`
2. 用管理员账号登录
3. 进入 `/admin/study-logs`
4. 点击“新建日志”可以新增
5. 点击“编辑”可以修改已有日志
6. 点击“发布”或“转为草稿”可以切换公开状态
7. 点击“删除”可以移除日志

当前后台支持维护的字段：

- 标题
- 日期
- 摘要
- 正文（Markdown）
- 标签
- 是否公开
- 学习时长
- 心情

正文编辑器支持实时预览，保存后直接写入数据库。

## 5. 标签现在如何维护

标签通过后台维护，不靠前端写死。

操作入口：

- `/admin/tags`

你可以直接：

- 新增标签
- 修改标签名称
- 删除未被日志使用的标签

注意：

- 如果某个标签仍被已有日志使用，后台会阻止直接删除，并提示你先去修改相关日志
- 在新增或编辑学习日志时，可以直接选择这些已存在标签

## 6. 管理员账号有什么要求，怎么登录

登录入口：

- `/login`

要求：

1. 管理员邮箱必须写在环境变量 `ADMIN_EMAILS` 里
2. 这个邮箱对应的用户必须存在于 Supabase Auth
3. 登录成功后会进入 `/admin`
4. 后台只允许管理员访问

## 7. 哪些内容是静态内容，哪些内容在数据库里维护

静态内容：

- 首页文案
- 个人简介
- 关于我页面内容
- 联系方式
- 技能、工具、学习经历、兴趣、研究方向

这些内容都主要在：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

数据库内容：

- 学习日志列表
- 学习日志详情
- 学习日志的公开 / 草稿状态
- 标签目录

这些内容通过后台维护，不通过改源文件维护。

## 8. 当前字体方案和后续如何替换

当前字体方案在：

- [src/app/layout.tsx](/E:/personal-homepage/src/app/layout.tsx)

当前使用：

- 正文：`Noto Sans SC`
- 标题：`Noto Serif SC`
- 备用：系统中文字体 fallback

如果以后要换字体，建议保持这几个原则：

- 中文优先，不要让中文退回到生硬的默认拉丁字体
- 标题和正文要继续保持明确区分
- 先保证生产可用和加载稳定，再追求个性
- 全站只保留一组清晰的排版逻辑，不要随意混搭

## 9. 当前首页设计原则和后续修改建议

当前首页的目标不是“内容很多”，而是“信息少但层次清楚”。

请尽量保持：

- 首屏紧凑，但不要拥挤
- 有留白，但不要出现夸张的大空白
- 视觉像正式科技产品官网，而不是模板站
- 动效要轻，只做淡入、轻位移、hover 微交互
- 装饰要克制，只保留背景层次、细线、模糊光斑、网格等轻元素

主要涉及文件：

- [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)
- [src/app/globals.css](/E:/personal-homepage/src/app/globals.css)
- [src/components/site-header.tsx](/E:/personal-homepage/src/components/site-header.tsx)
- [src/components/site-footer.tsx](/E:/personal-homepage/src/components/site-footer.tsx)

顶部栏补充原则：
- 当前 header 采用“仅顶部范围可见”的交互
- 相关逻辑在 [src/components/site-header.tsx](/E:/personal-homepage/src/components/site-header.tsx)
- 回到顶部按钮与 header 共用同一套顶部阈值，辅助逻辑在 [src/lib/site-header-scroll.ts](/E:/personal-homepage/src/lib/site-header-scroll.ts)
- 修改时要继续保证：不抖动、不闪烁、不造成布局跳动，并尊重 `prefers-reduced-motion`

## 10. 我改完后怎么同步到线上

如果你改的是静态内容或页面文件：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
git add .
git commit -m "更新个人主页内容"
git push origin main
```

当前项目已接入 Vercel：

- push 到 `main` 后会自动触发线上部署
- 同步前建议先验收：首页灰色身份信息条、header 顶部范围显示、回到顶部按钮、学习日志公开页、管理员日志 CRUD、标签管理

## 11. 我以后最常改的几个文件

最常用的入口通常是：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- [src/app/(site)/page.tsx](/E:/personal-homepage/src/app/(site)/page.tsx)
- [src/app/globals.css](/E:/personal-homepage/src/app/globals.css)
- [src/app/(site)/about/page.tsx](/E:/personal-homepage/src/app/(site)/about/page.tsx)
- [README.md](/E:/personal-homepage/README.md)
