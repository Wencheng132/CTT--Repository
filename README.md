# 📝 Todo 任务管理工具

一个全栈任务管理应用，支持用户注册登录、任务的增删改查、优先级排序和状态筛选。

> 🎯 练手项目一：React + Node.js + SQLite 全栈实战

---

## ✨ 功能

- 🔐 **用户认证** — JWT 注册/登录，7天有效
- ✅ **任务管理** — 创建、编辑、删除、完成标记
- 📊 **优先级系统** — 0-3 级优先级，高优先级置顶
- 🔍 **状态筛选** — 全部 / 待完成 / 已完成
- 📱 **响应式设计** — Tailwind CSS 适配各种屏幕

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 19 + Vite 8 + Tailwind CSS 4 |
| 后端 | Node.js + Express 5 |
| 数据库 | SQLite（sql.js，纯 JS 无需编译） |
| 认证 | JWT + bcryptjs |

---

## 📁 项目结构

```
first--cc/
├── client/                 # React 前端
│   └── src/
│       ├── App.jsx              # 主入口
│       ├── api.js               # API 封装
│       └── components/
│           ├── Login.jsx        # 登录/注册页
│           ├── TodoList.jsx     # 任务列表
│           ├── TodoItem.jsx     # 单个任务
│           └── TodoForm.jsx     # 添加任务表单
└── server/                 # Express 后端
    ├── index.js                 # 入口 + 静态文件托管
    ├── db.js                    # SQLite 初始化
    ├── auth.js                  # JWT 中间件
    └── routes/
        ├── auth.js              # /api/auth/register, /api/auth/login
        └── todos.js             # /api/todos CRUD
```

---

## 🚀 本地运行

### 前提条件

- Node.js 18+

### 1. 克隆项目

```bash
git clone https://github.com/Wencheng132/CTT--Repository.git
cd CTT--Repository
```

### 2. 安装依赖

```bash
cd server && npm install
cd ../client && npm install
```

### 3. 启动

```bash
# 终端 1：启动后端（端口 3001）
cd server
npm start

# 终端 2：启动前端（端口 5173）
cd client
npm run dev
```

### 4. 打开浏览器

访问 **http://localhost:5173**

---

## 🔌 API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 注册 | ❌ |
| POST | `/api/auth/login` | 登录 | ❌ |
| GET | `/api/todos` | 获取任务列表 | ✅ |
| POST | `/api/todos` | 创建任务 | ✅ |
| PUT | `/api/todos/:id` | 更新任务 | ✅ |
| DELETE | `/api/todos/:id` | 删除任务 | ✅ |
| GET | `/api/health` | 健康检查 | ❌ |

---

## 📸 截图

> 💡 使用 ScreenToGif 录制演示 GIF 后替换此处

```
┌─────────────────────────────────────┐
│          [截图占位 - 登录页]          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          [截图占位 - 任务列表]         │
└─────────────────────────────────────┘
```

---

## 📄 License

MIT
