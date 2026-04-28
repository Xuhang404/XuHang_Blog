# XuHang Blog

个人博客项目，基于 Next.js 16 (App Router) 构建，使用 Markdown 文件存储内容，无需数据库。

## 技术栈

- **框架**: Next.js 16 (Turbopack) + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + `@tailwindcss/typography`
- **内容**: Markdown + YAML 前置元数据（gray-matter）
- **字体**: Geist Sans / Geist Mono

## 功能

- Markdown 文章渲染（react-markdown + remark-gfm）
- 密码保护的管理后台（文章 CRUD、个人信息、关于页编辑）
- 暗色/亮色模式切换（localStorage 持久化）
- 文章标签筛选
- 文章阅读量统计
- 文章目录侧栏（桌面端）
- 自适应双栏布局

## 项目结构

```
├── content/posts/        # Markdown 文章文件
├── data/                 # JSON 数据文件
│   ├── profile.json      # 个人信息
│   ├── about.json        # 关于页内容
│   └── views.json        # 阅读量计数
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── page.tsx      # 首页
│   │   ├── posts/        # 文章详情
│   │   ├── about/        # 关于页
│   │   ├── admin/        # 管理后台
│   │   └── api/          # API 路由
│   ├── components/       # UI 组件
│   └── lib/              # 数据层（文件读写）
└── public/
```

## 开发

```bash
npm run dev     # 启动开发服务器 http://localhost:3000
npm run build   # 生产构建
npm run start   # 启动生产服务器
npm run lint    # 代码检查
```

## 部署

### 环境变量

设置管理员密码：

```
ADMIN_PASSWORD=你的密码
```

### 部署到云服务器

```bash
git clone 你的仓库
cd XuHang_Blog
npm install
npm run build
export ADMIN_PASSWORD=你的密码
npm start
```

推荐使用 PM2 管理进程：

```bash
npm install -g pm2
pm2 start npm --name "blog" -- start
pm2 save
```
