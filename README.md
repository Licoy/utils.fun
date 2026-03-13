简体中文|[English](./README.en.md)

# Utils.fun

`Utils.fun` 是一个面向开发、文本、图片、时间、编码与快速生成场景的在线工具站。项目基于 `Next.js App Router` 构建，强调本地优先、打开即用、双语完整，以及便于长期扩展的目录化结构。

![Utils.fun](./docs/index.png)


## 项目定位

很多工具站的问题不在于工具太少，而在于真正高频、可靠、好找的工具不够多。`Utils.fun` 更关注一套可长期维护的工具站底盘，而不是单纯堆砌页面数量。

项目当前主要坚持这些方向：

- 本地优先：尽量在浏览器端完成计算、转换和处理，减少把用户内容上传到服务器
- 高复用优先：优先收录开发、文本、时间、图片、金额与编码等高频场景
- 统一目录驱动：首页、搜索、侧边栏和详情页共享同一份工具元数据
- 双语一致：中文与 English 文案同步维护，路由和文档都能直接切换
- 易于扩展：新增工具时，尽量只改元数据、图标映射和工作台注册点

## 功能亮点

- `55` 个工具按 `8` 个分类组织，首页浏览和搜索定位都比较直接
- 默认中文，英文使用独立 `/en` 路由，同时保留统一的页面结构
- 文本、开发、换算、编码、财务、图片等多数工具在浏览器端本地运行
- 代码类工具使用 `Monaco Editor` 承载，适合 JSON、SQL、HTML、CSS、JS 等场景
- 站点品牌信息集中放在根目录 `site.config.ts`，便于统一维护品牌与基础信息
- 桌面端与移动端共用一套工具目录和交互模型，降低维护成本

## 工具分类

- `在线生成 / Generate`
- `图片处理 / Image`
- `加密编码 / Encrypt`
- `日期时间 / Time`
- `单位换算 / Convert`
- `财务计算 / Finance`
- `文本工具 / Text`
- `开发工具 / Dev`

## 技术栈

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Monaco Editor`
- `dayjs`
- `crypto-js`
- `sql-formatter`
- `browser-image-compression`

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看站点。

### 3. 检查与构建

```bash
npm run lint
npm run build
```

## 常用脚本

- `npm run dev`：启动本地开发环境
- `npm run lint`：运行 ESLint 校验
- `npm run build`：构建生产版本
- `npm run start`：启动生产服务

## 项目结构

```text
.
├─ app/
│  ├─ (tools)/
│  ├─ en/
│  ├─ pages/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ sitemap.ts
├─ components/
│  ├─ ui/
│  ├─ tool-explorer.tsx
│  ├─ tool-sidebar.tsx
│  ├─ tool-search-dialog.tsx
│  └─ tool-workbench.tsx
├─ lib/
│  ├─ i18n.ts
│  ├─ locale.ts
│  ├─ locale-server.ts
│  ├─ site.ts
│  └─ tools.ts
├─ public/
│  └─ favicon.ico
├─ site.config.ts
└─ package.json
```

## 关键文件说明

- `lib/tools.ts`：维护分类、工具 slug、标题、说明与亮点等核心元数据
- `components/tool-workbench.tsx`：承载各工具的主要交互与本地处理逻辑
- `app/pages/home-page.tsx`：首页工具总览入口
- `app/pages/tool-page.tsx`：工具详情页头部与工作区编排
- `lib/i18n.ts`：站点级通用文案字典
- `lib/locale.ts`：中英文路由构建与语言偏好持久化
- `site.config.ts`：站点标题、描述、Logo、页脚和仓库地址配置

## 双语与路由约定

- `README.md` 为默认中文文档
- [README.en.md](./README.en.md) 为英文文档
- 根路径 `/` 为中文主入口
- `/en` 为英文镜像入口
- 当前语言偏好会通过 `utilsfun-locale` Cookie 持久化

## 新增工具的推荐流程

1. 在 `lib/tools.ts` 中补充 `ToolSlug`、工具信息和分类归属
2. 在 `components/tool-icon.tsx` 中为新工具映射图标
3. 在 `components/tool-workbench.tsx` 中注册工具实现
4. 需要的话，把复杂逻辑继续拆成独立组件或工具函数
5. 同时补齐中文和 English 文案
6. 执行 `npm run lint` 和 `npm run build`

## 站点配置

站点级品牌与基础信息统一通过根目录 `site.config.ts` 选择：

- `title`：站点标题
- `titleSeparator`：页面标题连接符
- `description`：站点描述
- `url`：线上地址
- `logo`：头部 Logo
- `footerHtml`：页脚 HTML
- `githubUrl`：GitHub 仓库地址

- `npm run dev` 会读取 `site.config.dev.ts`
- `npm run build` 和生产环境会读取 `site.config.prod.ts`
- 修改这些配置后，需要重新执行 `npm run build`，再启动生产服务

## 贡献建议

欢迎提交 Issue 或 PR。若你准备新增工具，建议在说明中至少包含这些信息：

- 这个工具解决什么问题
- 是否可以完全本地处理
- 是否新增依赖，以及为什么需要引入
- 中英文文案是否已经补齐
- 是否已经通过 `npm run lint` 和 `npm run build`

## License

本仓库采用 [MIT License](./LICENSE) 开源协议。

你可以自由使用、修改、分发和商用本项目，但需要保留原始版权声明与许可证文本。
