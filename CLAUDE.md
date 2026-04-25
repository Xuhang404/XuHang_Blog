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
- **Tailwind CSS v4** — `@tailwindcss/postcss` 插件
- **ESLint** — flat config (`eslint.config.mjs`)，集成 `eslint-config-next`
- **npm** — registry 已配置为 `registry.npmmirror.com`，cache 在项目本地 `.npm-cache`

## Project Structure

```
src/
  app/
    globals.css    # Tailwind 全局样式
    layout.tsx     # 根布局（Geist 字体、全局 metadata）
    page.tsx       # 首页
public/            # 静态资源
next.config.ts     # Next.js 配置
eslint.config.mjs  # ESLint flat config
postcss.config.mjs # PostCSS（Tailwind）
tsconfig.json      # TypeScript 配置
```

## Architecture Notes

- 所有页面在 `src/app/` 下，遵循 Next.js App Router 文件路由约定
- 组件、工具函数等按功能放在 `src/` 下的子目录
- 博客文章计划用 MDX 或 Markdown，存储在 `content/` 或 `posts/` 目录
- 优先使用 `output: 'export'`（SSG）或 `next build` 部署到静态托管
- npm registry 已配置为 npmmirror.com 镜像以适配中国大陆网络环境
