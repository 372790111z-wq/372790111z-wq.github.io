# 个人主站源码

用户提供的 Manus 源码为基线，恢复到本地独立 Git 仓库。没有配置远端；下载原件保持不变。

## 本地开发

使用项目锁定包管理器 `pnpm@10.4.1`。安装：`pnpm install --frozen-lockfile --ignore-scripts`。
开发：`pnpm dev:static`，地址 http://127.0.0.1:18933/ 。
构建前将 `.env.example` 复制为 `.env.production.local`（仅含原站公开统计配置）。构建：`pnpm build:static`。检查：`pnpm check`。

`vite.static.config.ts` 是不依赖 Manus 存储服务的静态构建入口；原配置保留。图片和公开 PDF 从部署仓库 8927f70 恢复。
生产统计参数应从现有公开页面核对后配置，禁止在仓库加入私有凭据。
开发环境不加载统计；仅带 `?annotations` 时显示需求标注。

## 发布边界

不能把本源码目录整个作为公开静态目录。发布文件沿用原站仓库，只替换 index.html 并添加构建出的两份 assets 文件；保留原有静态资源、404.html 和 vercel.json。
不要把 docs、annotations、node_modules、Git 数据或 Manus 项目配置上传为公开网页。

本次需求：docs/homepage-entries-v1.md。两个入口为 portfolio-zijian-link、about-personal-site-link。
