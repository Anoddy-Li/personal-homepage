# CONTENT_GUIDE

这份文档只讲一件事：你以后自己怎么改这个网站。

## 1. 我想修改姓名、简介、技能、学习经历、爱好、联系方式

统一修改：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

这个文件里主要有这些区域：

- `name`：姓名
- `role`：身份标题
- `hero`：首页标题、简介、按钮文案
- `statement`、`quickIntro`：个人简介
- `skills`：技能
- `tools`：常用工具
- `education`：学习经历
- `hobbies`：兴趣与长期关注
- `projects`：最近在做的事
- `contact`：邮箱、所在地、交流方向

## 2. 我想修改首页文案

改这里：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

主要是：

- `hero.eyebrow`
- `hero.headline`
- `hero.intro`
- `hero.primaryCta`
- `hero.secondaryCta`

## 3. 我想修改“关于我”页面内容

内容来源仍然在：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

页面结构本身在：

- [src/app/(site)/about/page.tsx](/E:/personal-homepage/src/app/(site)/about/page.tsx)

如果你只是改文字，通常只需要改 `src/content/site.ts`。

## 4. 我想修改联系页内容

改这里：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)

重点看：

- `contact.email`
- `contact.emailNote`
- `contact.location`
- `contact.availability`

## 5. 我想新增一篇学习日志

学习日志不是改文件，而是走后台和数据库。

操作流程：

1. 打开线上站点或本地站点的 `/login`
2. 用管理员账号登录
3. 进入 `/admin/study-logs`
4. 点击“新建日志”
5. 填写标题、日期、摘要、正文、标签、状态、时长
6. 勾选“公开显示”后保存，就会出现在公开的学习日志页

## 6. 我想修改一篇已有学习日志

也是走后台：

1. 登录 `/login`
2. 进入 `/admin/study-logs`
3. 点击对应日志的“编辑”
4. 修改后保存

## 7. 我想把日志变成草稿或重新公开

在后台日志列表页直接操作：

1. 登录 `/login`
2. 进入 `/admin/study-logs`
3. 点击“发布”或“转为草稿”

## 8. 管理员登录入口和基本流程

登录入口：

- `/login`

基本流程：

1. 管理员邮箱必须写在环境变量 `ADMIN_EMAILS` 里
2. 这个邮箱对应的用户必须存在于 Supabase Auth
3. 登录成功后会进入 `/admin`
4. 后台只允许管理员访问

## 9. 我改完静态内容后，怎么同步到线上

如果你改的是文件内容，比如首页文案或个人资料：

```bash
pnpm lint
pnpm typecheck
pnpm build
git add .
git commit -m "更新个人主页内容"
git push origin main
```

当前项目已接入 Vercel：

- push 到 `main` 后会自动触发线上部署

## 10. 我最常用的文件

最常改的 3 个入口通常是：

- [src/content/site.ts](/E:/personal-homepage/src/content/site.ts)
- [src/app/(site)/about/page.tsx](/E:/personal-homepage/src/app/(site)/about/page.tsx)
- [README.md](/E:/personal-homepage/README.md)
