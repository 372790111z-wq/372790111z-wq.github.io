# 个人主站源码

本仓库 `source` 分支保存个人主站的完整 React / TypeScript 源码，包括已上线的作品集和关于我入口。

仓库：https://github.com/372790111z-wq/372790111z-wq.github.io/tree/source
正式网站：https://fuluoyide.top/

`main` 保留原有静态发布内容；本分支不自动部署到 Vercel。不要直接将本分支合并到 main，部署流程需先统一。

源码以用户提供的 Manus 导出为基线，下载原件未修改。

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
