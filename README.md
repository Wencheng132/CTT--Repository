# 📝 全栈任务管理工具 — Todo App

一个完整的全栈任务管理应用，支持用户注册登录、任务增删改查、优先级排序和状态筛选。

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![SQLite](https://img.shields.io/badge/SQLite-sql.js-003B57?logo=sqlite)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind_4-06B6D4?logo=tailwindcss)

> 🎯 练手项目一 · 独立完成 · React + Node.js + SQLite 全栈实战

---

## 📸 演示

![Todo 应用演示](docs/todo-demo.gif)

---

## ✨ 功能

| 模块 | 功能 |
|------|------|
| 🔐 用户认证 | JWT 注册/登录，密码 bcrypt 加密，Token 7 天有效 |
| 📝 任务管理 | 创建、编辑、删除、勾选完成，表单实时验证 |
| 📊 优先级 | 0-3 级优先级，高优先级自动置顶 |
| 🔍 筛选 | 全部 / 待完成 / 已完成，一键切换 |
| 📱 响应式 | Tailwind CSS 适配桌面端和移动端 |

---

## 🛠 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | React 19 + Vite 8 + Tailwind CSS 4 | Hooks 状态管理，组件化架构 |
| 后端 | Node.js + Express 5 | RESTful API，JWT 中间件 |
| 数据库 | SQLite（sql.js） | 纯 JS 实现，零配置，数据持久化到文件 |
| 认证 | JWT + bcryptjs | Token 过期自动跳转登录 |

---

## 📁 项目结构

```
├── client/                  # React 前端 (Vite)
│   └── src/
│       ├── App.jsx              # 根组件，登录态切换
│       ├── api.js               # axios 封装 + 请求/响应拦截
│       └── components/
│           ├── Login.jsx        # 登录/注册（Tab 切换）
│           ├── TodoList.jsx     # 任务列表 + 筛选 + 排序
│           ├── TodoItem.jsx     # 单任务卡片（编辑/删除/完成）
│           └── TodoForm.jsx     # 添加任务表单（含优先级选择）
└── server/                  # Express 后端
    ├── index.js                 # 入口 + 静态文件托管 + SPA fallback
    ├── db.js                    # SQLite 初始化 + 建表
    ├── auth.js                  # JWT 认证中间件
    └── routes/
        ├── auth.js              # POST /api/auth/register, /api/auth/login
        └── todos.js             # GET/POST/PUT/DELETE /api/todos
```

---

## 🚀 本地运行

**环境要求：** Node.js 18+

```bash
# 1. 克隆
git clone https://github.com/Wencheng132/CTT--Repository.git
cd CTT--Repository

# 2. 安装依赖
cd server && npm install
cd ../client && npm install

# 3. 启动后端（端口 3001）
cd server && npm start

# 4. 另开终端，启动前端（端口 5173）
cd client && npm run dev
```

浏览器访问 **http://localhost:5173**

---

## 🔌 API 接口

| 方法 | 路径 | 请求体 | 认证 | 说明 |
|------|------|--------|------|------|
| POST | `/api/auth/register` | `{username, password}` | ❌ | 注册 |
| POST | `/api/auth/login` | `{username, password}` | ❌ | 登录，返回 JWT |
| GET | `/api/todos` | — | ✅ | 获取任务列表 |
| POST | `/api/todos` | `{title, description?, priority?}` | ✅ | 创建任务 |
| PUT | `/api/todos/:id` | `{title?, description?, priority?, completed?}` | ✅ | 更新任务 |
| DELETE | `/api/todos/:id` | — | ✅ | 删除任务 |
| GET | `/api/health` | — | ❌ | 健康检查 |

---

## 💡 技术亮点

- **SQLite 纯 JS 实现** — 不需要安装 MySQL/PostgreSQL，`npm install` 即跑
- **JWT 认证流程** — Token 存储 localStorage，请求拦截器自动携带，过期自动跳转登录
- **Vite 代理** — 开发时自动将 `/api` 请求代理到后端，无跨域问题
- **组件拆分** — 登录/列表/表单独立组件，状态提升到 App 根组件

---

> 📊 **项目二：数据看板 Dashboard** → [在线体验](https://wencheng132.github.io/CTT--Repository/) | [源码](https://github.com/Wencheng132/CTT--Repository/tree/gh-pages)

---

## 📄 License

MIT
