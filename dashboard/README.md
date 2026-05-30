# 📊 数据看板

上传 Excel 或 CSV 文件，自动生成交互式图表和统计分析。支持柱状图、折线图、饼图三种可视化方式。

> 🎯 练手项目二：React + Recharts 数据分析工具

> 🌐 **在线体验**：[https://wencheng132.github.io/CTT--Repository/](https://wencheng132.github.io/CTT--Repository/)

---

## ✨ 功能

- 📂 **文件上传** — 拖拽或点击上传 .xlsx / .xls / .csv 文件
- 📊 **三种图表** — 柱状图、折线图、饼图，自由切换
- 🔧 **灵活配置** — 自选 X 轴（标签列）和 Y 轴（数值列）
- 📈 **统计分析** — 自动计算每列的总和、均值、中位数、最值、标准差
- 👀 **数据预览** — 表格展示原始数据，支持分页
- 📱 **响应式** — Tailwind CSS 适配桌面和移动端

---

## 🛠 技术栈

| 用途 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建 | Vite 8 |
| 图表 | Recharts |
| 文件解析 | PapaParse（CSV）+ SheetJS/xlsx（Excel） |
| 样式 | Tailwind CSS 4 |
| 部署 | GitHub Pages |

---

## 📁 项目结构

```
dashboard/
├── src/
│   ├── App.jsx                   # 主应用入口
│   ├── components/
│   │   ├── Header.jsx            # 页面标题栏
│   │   ├── FileUploader.jsx      # 文件上传（拖拽/点击）
│   │   ├── DataPreview.jsx       # 数据表格预览
│   │   ├── ChartPanel.jsx        # 图表区域（柱/线/饼）
│   │   └── StatisticsPanel.jsx   # 统计指标卡
│   └── utils/
│       ├── parseFile.js          # Excel/CSV 解析
│       └── statistics.js         # 统计计算
└── test-data.csv                 # 示例数据
```

---

## 🚀 本地运行

```bash
cd dashboard
npm install
npm run dev
```

访问 **http://localhost:5173**，上传 Excel 或 CSV 文件即可体验。

---

## 📦 部署到 GitHub Pages

```bash
cd dashboard
npm run deploy
```

---

## 📸 截图

> 💡 使用 ScreenToGif 录制演示 GIF 后替换此处

```
┌─────────────────────────────────────┐
│          [截图占位 - 上传页面]        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       [截图占位 - 图表+统计面板]       │
└─────────────────────────────────────┘
```

---

## 📄 License

MIT
