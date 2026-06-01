# 📊 数据看板

一个纯前端的数据可视化工具，上传 CSV 或 Excel 文件，自动生成图表和统计分析。

> 🎯 练手项目二：React + Recharts + Tailwind CSS 数据可视化实战

---

## ✨ 功能

- 📂 **文件上传** — 支持 CSV、Excel（.xlsx / .xls），拖拽或点击上传
- 📊 **多种图表** — 柱状图、折线图、饼图，自由切换
- 📈 **统计分析** — 自动计算总和、均值、中位数、最大/最小值、标准差
- 🔍 **数据预览** — 表格形式展示数据，支持横向滚动
- 🎨 **智能识别** — 自动区分数值列和文本列，智能选择图表轴

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + Vite 8 |
| 图表 | Recharts 2 |
| 样式 | Tailwind CSS 4 |
| 文件解析 | PapaParse（CSV）+ SheetJS（Excel） |

---

## 📁 项目结构

```
dashboard/
├── index.html                     # 入口 HTML
├── vite.config.js                 # Vite 配置（base: /CTT--Repository/）
├── package.json
└── src/
    ├── main.jsx                   # React 入口
    ├── index.css                  # Tailwind CSS
    ├── App.jsx                    # 主应用组件
    ├── utils/
    │   ├── parseFile.js           # CSV/Excel 文件解析
    │   └── statistics.js          # 统计计算（均值、中位数、标准差等）
    └── components/
        ├── Header.jsx             # 顶部标题
        ├── FileUploader.jsx       # 文件拖拽上传
        ├── DataPreview.jsx        # 数据预览表格
        ├── ChartPanel.jsx         # 图表展示（柱状图/折线图/饼图）
        └── StatisticsPanel.jsx    # 统计分析面板
```

---

## 🚀 本地运行

### 前提条件

- Node.js 18+

### 1. 克隆项目

```bash
git clone https://github.com/Wencheng132/CTT--Repository.git
cd CTT--Repository/dashboard
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器访问 **http://localhost:5175**

### 4. 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

---

## 📸 演示

![数据看板演示](../docs/dashboard-demo.gif)

---

## 🔗 在线访问

**https://wencheng132.github.io/CTT--Repository/**

---

## 📄 License

MIT
