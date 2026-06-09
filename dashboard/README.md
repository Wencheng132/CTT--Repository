# 📊 数据看板 — Dashboard

拖拽上传 Excel / CSV 文件，自动生成交互式图表和智能统计分析。纯前端实现，无需后端。

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Recharts](https://img.shields.io/badge/Chart-Recharts-22b5bf)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind_4-06B6D4?logo=tailwindcss)

> 🎯 练手项目二 · 独立完成 · React + Recharts 数据可视化实战

> 🌐 **在线体验**：[wencheng132.github.io/CTT--Repository/](https://wencheng132.github.io/CTT--Repository/)

---

## 📸 演示

![Dashboard 演示](docs/dashboard-demo.gif)

---

## ✨ 功能

| 模块 | 功能 |
|------|------|
| 📂 文件上传 | 拖拽或点击上传 .xlsx / .xls / .csv，自动解析 |
| 📊 三种图表 | 柱状图、折线图、饼图，一键切换 |
| 🔀 灵活配置 | X 轴（标签列）和 Y 轴（数值列）自由组合 |
| 📋 数据预览 | 表格展示前 50 行，横向滚动，数据一览无余 |
| 📈 智能统计 | 自动识别列类型，分别计算数值/文本统计指标 |
| 📱 响应式 | 大屏图表 + 手机适配，Tailwind CSS 布局 |

### 统计指标详情

| 列类型 | 指标 |
|--------|------|
| 数值列 | 总和、均值、中位数、最大值、最小值、标准差 |
| 文本列 | 有效值计数、唯一值数、最高频值、空值数 |

---

## 🛠 技术栈

| 用途 | 技术 | 说明 |
|------|------|------|
| 框架 | React 19 | Hooks 状态管理 |
| 构建 | Vite 8 | 秒级热更新 |
| 图表 | Recharts 2 | 声明式图表，动画流畅 |
| 样式 | Tailwind CSS 4 | 响应式布局 |
| Excel 解析 | SheetJS (xlsx) | 支持 .xlsx / .xls |
| CSV 解析 | PapaParse 5 | 流式解析，大文件友好 |
| 部署 | GitHub Pages | 纯前端，免费部署 |

---

## 📁 项目结构

```
dashboard/
├── src/
│   ├── App.jsx                    # 主入口，数据流调度
│   ├── main.jsx                   # ReactDOM 挂载
│   ├── index.css                  # Tailwind 入口
│   ├── components/
│   │   ├── Header.jsx             # 页面标题栏
│   │   ├── FileUploader.jsx       # 拖拽上传区域 + 文件格式校验
│   │   ├── DataPreview.jsx        # 数据预览表格（前 50 行 + 横向滚动）
│   │   ├── ChartPanel.jsx         # 图表区：柱/线/饼 + 轴选择控件
│   │   └── StatisticsPanel.jsx    # 统计指标卡片
│   └── utils/
│       ├── parseFile.js           # Excel/CSV 统一解析
│       └── statistics.js          # 统计计算（数值/文本自动识别）
├── test-data.csv                  # 测试数据
└── 空调销售数据.xlsx               # 测试数据
```

---

## 🚀 本地运行

**环境要求：** Node.js 18+

```bash
# 1. 克隆
git clone https://github.com/Wencheng132/CTT--Repository.git
cd CTT--Repository/dashboard

# 2. 安装 + 启动
npm install
npm run dev
```

浏览器访问 **http://localhost:5173**，上传 Excel 或 CSV 即可体验。

---

## 📦 部署

```bash
npm run deploy   # 构建 + 推送到 gh-pages 分支
```

---

## 💡 技术亮点

- **自动类型识别** — 根据每列数据特征自动判定数值/文本类型，智能选择统计方法
- **拖拽上传** — HTML5 Drag & Drop API，拖文件到页面即可解析
- **多格式兼容** — SheetJS + PapaParse 双解析器，覆盖 Excel 和 CSV
- **声明式图表** — Recharts 组件化写法，图表类型切换只需改一个 state
- **零依赖启动** — 纯前端，不需要任何后端服务或数据库

---

> 📝 **项目一：全栈任务管理 Todo App** → [源码](https://github.com/Wencheng132/CTT--Repository)

---

## 📄 License

MIT
