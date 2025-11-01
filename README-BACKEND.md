# 后端搭建指南 - 小白友好版

## 方案一：Node.js + Express（推荐，最简单）

### 优点
- ✅ 不需要数据库，数据存在JSON文件
- ✅ 代码简单易懂
- ✅ 直接配合现有前端使用
- ✅ 本地运行，无需注册账号

### 快速开始

#### 1. 安装 Node.js
去官网下载：https://nodejs.org/
下载 LTS 版本（长期支持版）

#### 2. 初始化项目
在项目文件夹打开终端（终端/命令提示符），运行：

```bash
npm init -y
npm install express cors
```

#### 3. 创建服务器文件

我已经为你创建好了 `server.js` 文件，直接运行即可。

#### 4. 启动服务器

```bash
node server.js
```

看到 "服务器运行在 http://localhost:3000" 就成功了！

#### 5. 修改前端连接后端

打开 `admin.html`，找到 JavaScript 部分，把保存和读取数据的部分改成调用后端API即可。

---

## 方案二：Python Flask（如果你更熟悉Python）

### 优点
- ✅ Python语法简单
- ✅ 使用SQLite数据库（自动创建）
- ✅ 适合Python学习者

### 快速开始

#### 1. 安装Python
确保已安装Python 3.7+

#### 2. 安装依赖

```bash
pip install flask flask-cors
```

#### 3. 运行服务器

```bash
python server.py
```

---

## 数据存储位置

### Node.js方案
数据保存在 `data/` 文件夹：
- `fresh.json` - 新鲜速递数据
- `classic.json` - 经典重温数据
- `topics.json` - 榜上有名数据

### Python方案
数据保存在 `music_site.db` SQLite数据库文件中

---

## API接口说明

### 获取数据
- `GET /api/fresh` - 获取所有新鲜速递
- `GET /api/classic` - 获取所有经典重温
- `GET /api/topics` - 获取所有专题

### 添加数据
- `POST /api/fresh` - 添加新鲜速递
- `POST /api/classic` - 添加经典重温
- `POST /api/topics` - 添加专题

### 更新数据
- `PUT /api/fresh/:id` - 更新新鲜速递
- `PUT /api/classic/:id` - 更新经典重温
- `PUT /api/topics/:id` - 更新专题

### 删除数据
- `DELETE /api/fresh/:id` - 删除新鲜速递
- `DELETE /api/classic/:id` - 删除经典重温
- `DELETE /api/topics/:id` - 删除专题

---

## 下一步

1. 选择一个方案（推荐方案一）
2. 按照步骤安装和启动
3. 修改 `admin.html` 中的代码，连接后端API
4. 测试添加、编辑、删除功能

需要帮助？查看代码注释，都有详细说明！

