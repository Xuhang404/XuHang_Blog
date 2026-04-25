# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XuHang 的个人博客，基于 Next.js 16 (App Router) + TypeScript + Tailwind CSS v4。

## Commands

```bash
npm run dev      # 启动开发服务器 → http://localhost:3000
npm run build    # 生产构建（Turbopack）
npm run start    # 启动生产服务器
npm run lint     # ESLint 代码检查
```

## Tech Stack

- **Next.js 16** — App Router, Turbopack, React 19
- **TypeScript** — strict mode, `@/*` path alias → `src/*`
- **Tailwind CSS v4** — 自定义 dark 模式（class 切换）
- **ESLint** — flat config (`eslint.config.mjs`)，集成 `eslint-config-next`
- **npm** — registry 已配置为 `registry.npmmirror.com`，cache 在项目本地 `.npm-cache`

## Project Structure

```
content/posts/           # Markdown 文章（gray-matter frontmatter）
data/
  profile.json           # 个人信息（名称、签名、头像）
  views.json             # 文章浏览量（自动生成，不提交 git）
src/
  app/
    globals.css          # Tailwind + 暗色模式
    layout.tsx           # 根布局（Header + Footer）
    page.tsx             # 首页（头像 + 签名 + 文章列表 + 阅读量）
    about/
      page.tsx           # 关于页面
    posts/[slug]/
      page.tsx           # 文章详情（Markdown 渲染 + 阅读量）
    admin/               # 后台管理（需登录）
      page.tsx           # 文章管理 + 个人信息入口
      login/page.tsx
      profile/page.tsx   # 编辑个人信息
      posts/
        new/page.tsx     # 新建文章
        [slug]/edit/     # 编辑文章
    api/
      posts/             # 文章 CRUD（认证）
      auth/              # 登录/登出/校验
      profile/           # 个人信息读写
      views/             # 浏览量增查
  components/
    Header.tsx           # 导航 + 暗色模式切换
    Footer.tsx           # 页脚
    PostEditor.tsx       # Markdown 编辑器（分栏 + 实时预览）
    PostViews.tsx        # 浏览量显示组件
    AdminBar.tsx         # 编辑/删除按钮（登录后可见）
    ThemeToggle.tsx      # 暗色模式切换按钮
  lib/
    posts.ts             # 文章 CRUD（gray-matter）
    auth.ts              # 密码认证
    profile.ts           # 个人信息读写
    views.ts             # 浏览量持久化
  middleware.ts          # 保护 /admin 路由
.env.local               # ADMIN_PASSWORD
```

## Admin

后台路径 `/admin`，密码在 `.env.local` 中设置。

```env
ADMIN_PASSWORD=admin123
```

功能：
- 密码登录（cookie session，7 天有效）
- 文章列表 / 新建 / 编辑 / 删除
- Markdown 编辑器 + 实时预览
- 个人信息编辑（名称、签名、头像）
- 首页直接显示编辑/删除按钮（登录后可见）
- 文章浏览量统计

> 修改内容后重新 `npm run build` 才会更新 SSG 页面。dev 模式刷新即可。

## Notes

- npm registry 已配置为 npmmirror.com 镜像
- `.npm-cache/`、`.env.local`、`data/views.json` 不提交 git
- 暗色模式基于 class 切换（`<html class="dark">`），选择保存在 localStorage
