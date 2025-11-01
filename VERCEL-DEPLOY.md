# 🚀 Vercel 部署详细步骤（5分钟搞定）

## 第一步：准备代码

✅ 我已经为你准备好了所有文件：
- ✅ `vercel.json` - Vercel配置文件
- ✅ `api/` 文件夹 - 所有API路由
- ✅ `admin.html` - 已更新，自动识别本地/线上环境

## 第二步：上传到 GitHub

### 2.1 注册 GitHub 账号
1. 访问 https://github.com
2. 点击右上角 "Sign up"
3. 填写信息注册（完全免费）

### 2.2 创建新仓库
1. 登录后，点击右上角 "+" → "New repository"
2. 仓库名称：`mantou-music`（或任意名字）
3. 选择 **Public**（公开）
4. ✅ **不要**勾选 "Add a README file"
5. 点击 "Create repository"

### 2.3 上传代码（最简单的方法）

**方法A：用GitHub网页上传（推荐给小白）**

1. 在新建的仓库页面，点击 "uploading an existing file"
2. 把项目文件夹里**所有文件**拖进去
3. 点击 "Commit changes"
4. 完成！

**方法B：用Git命令（如果会的话）**

```bash
cd /Users/mantou/Desktop/馒头音乐
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/mantou-music.git
git push -u origin main
```

## 第三步：部署到 Vercel

### 3.1 登录 Vercel
1. 访问 https://vercel.com
2. 点击 "Sign Up"
3. 选择 "Continue with GitHub"（用GitHub账号登录）

### 3.2 导入项目
1. 登录后，点击 "Add New Project"
2. 在 "Import Git Repository" 中找到你的仓库
3. 点击 "Import"

### 3.3 配置项目（自动检测，通常不用改）
- Framework Preset: **Other**
- Root Directory: `./`（默认）
- Build Command: （留空）
- Output Directory: （留空）

### 3.4 部署
1. 点击 **"Deploy"** 按钮
2. 等待 1-2 分钟
3. 看到 ✅ "Congratulations!" 就成功了！

## 第四步：获得网址

部署成功后，Vercel 会给你一个网址，比如：
```
https://mantou-music.vercel.app
```

**这就是你的网站地址！** 分享给朋友就可以了！

## 第五步：更新代码（自动部署）

以后每次你修改代码：
1. 在 GitHub 上更新文件（或推送代码）
2. Vercel 会自动重新部署
3. 几秒钟后网站就更新了！

---

## 🎉 完成！

现在你的网站已经上线了！

### 访问地址：
- 主页：`https://你的项目名.vercel.app`
- 管理后台：`https://你的项目名.vercel.app/admin.html`

### 功能：
✅ 朋友可以访问你的网站
✅ 你可以用管理后台添加/编辑内容
✅ 代码更新自动部署

---

## ⚠️ 重要提示

### 数据存储限制
Vercel 的临时存储可能会丢失数据。如果需要持久化：
1. **方案一**：使用 MongoDB Atlas（免费版）
2. **方案二**：定期手动备份数据
3. **方案三**：升级到付费计划（有持久化存储）

### 如需帮助
- Vercel 文档：https://vercel.com/docs
- 有问题告诉我，我可以协助！

---

## 📝 下一步建议

1. **绑定自定义域名**（可选）
   - 在 Vercel 项目设置中
   - 添加你自己的域名

2. **添加数据库**（如果需要永久保存）
   - MongoDB Atlas 免费版：https://www.mongodb.com/cloud/atlas
   - 我可以帮你接入

3. **优化性能**
   - 图片使用 CDN
   - 压缩资源文件

祝你部署顺利！🎵

