// Node.js 后端服务器 - 超简单版本
// 不需要数据库，数据存在JSON文件里

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 允许跨域请求（前端和后端在不同端口时需要）
app.use(cors());
// 解析JSON格式的请求体
app.use(express.json());

// 数据文件路径
const DATA_DIR = path.join(__dirname, 'data');
const FRESH_FILE = path.join(DATA_DIR, 'fresh.json');
const CLASSIC_FILE = path.join(DATA_DIR, 'classic.json');
const TOPICS_FILE = path.join(DATA_DIR, 'topics.json');

// 确保data文件夹存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// 初始化数据文件（如果不存在）
function initDataFile(filePath, defaultData) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
    }
}

// 初始化所有数据文件
initDataFile(FRESH_FILE, []);
initDataFile(CLASSIC_FILE, []);
initDataFile(TOPICS_FILE, []);

// 读取JSON文件的辅助函数
function readData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取文件失败:', error);
        return [];
    }
}

// 写入JSON文件的辅助函数
function writeData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('写入文件失败:', error);
        return false;
    }
}

// ========== 新鲜速递 API ==========

// 获取所有新鲜速递
app.get('/api/fresh', (req, res) => {
    const data = readData(FRESH_FILE);
    res.json(data);
});

// 添加新鲜速递
app.post('/api/fresh', (req, res) => {
    const data = readData(FRESH_FILE);
    const newItem = {
        id: Date.now(), // 简单的时间戳作为ID
        ...req.body
    };
    data.push(newItem);
    if (writeData(FRESH_FILE, data)) {
        res.json({ success: true, data: newItem });
    } else {
        res.status(500).json({ success: false, error: '保存失败' });
    }
});

// 更新新鲜速递
app.put('/api/fresh/:id', (req, res) => {
    const data = readData(FRESH_FILE);
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, error: '未找到数据' });
    }
    
    data[index] = { ...data[index], ...req.body };
    if (writeData(FRESH_FILE, data)) {
        res.json({ success: true, data: data[index] });
    } else {
        res.status(500).json({ success: false, error: '更新失败' });
    }
});

// 删除新鲜速递
app.delete('/api/fresh/:id', (req, res) => {
    const data = readData(FRESH_FILE);
    const id = parseInt(req.params.id);
    const filteredData = data.filter(item => item.id !== id);
    
    if (data.length === filteredData.length) {
        return res.status(404).json({ success: false, error: '未找到数据' });
    }
    
    if (writeData(FRESH_FILE, filteredData)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: '删除失败' });
    }
});

// ========== 经典重温 API ==========

app.get('/api/classic', (req, res) => {
    const data = readData(CLASSIC_FILE);
    res.json(data);
});

app.post('/api/classic', (req, res) => {
    const data = readData(CLASSIC_FILE);
    const newItem = {
        id: Date.now(),
        ...req.body
    };
    data.push(newItem);
    if (writeData(CLASSIC_FILE, data)) {
        res.json({ success: true, data: newItem });
    } else {
        res.status(500).json({ success: false, error: '保存失败' });
    }
});

app.put('/api/classic/:id', (req, res) => {
    const data = readData(CLASSIC_FILE);
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, error: '未找到数据' });
    }
    
    data[index] = { ...data[index], ...req.body };
    if (writeData(CLASSIC_FILE, data)) {
        res.json({ success: true, data: data[index] });
    } else {
        res.status(500).json({ success: false, error: '更新失败' });
    }
});

app.delete('/api/classic/:id', (req, res) => {
    const data = readData(CLASSIC_FILE);
    const id = parseInt(req.params.id);
    const filteredData = data.filter(item => item.id !== id);
    
    if (data.length === filteredData.length) {
        return res.status(404).json({ success: false, error: '未找到数据' });
    }
    
    if (writeData(CLASSIC_FILE, filteredData)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: '删除失败' });
    }
});

// ========== 榜上有名 API ==========

app.get('/api/topics', (req, res) => {
    const data = readData(TOPICS_FILE);
    res.json(data);
});

app.post('/api/topics', (req, res) => {
    const data = readData(TOPICS_FILE);
    const newItem = {
        id: Date.now(),
        ...req.body
    };
    data.push(newItem);
    if (writeData(TOPICS_FILE, data)) {
        res.json({ success: true, data: newItem });
    } else {
        res.status(500).json({ success: false, error: '保存失败' });
    }
});

app.put('/api/topics/:id', (req, res) => {
    const data = readData(TOPICS_FILE);
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ success: false, error: '未找到数据' });
    }
    
    data[index] = { ...data[index], ...req.body };
    if (writeData(TOPICS_FILE, data)) {
        res.json({ success: true, data: data[index] });
    } else {
        res.status(500).json({ success: false, error: '更新失败' });
    }
});

app.delete('/api/topics/:id', (req, res) => {
    const data = readData(TOPICS_FILE);
    const id = parseInt(req.params.id);
    const filteredData = data.filter(item => item.id !== id);
    
    if (data.length === filteredData.length) {
        return res.status(404).json({ success: false, error: '未找到数据' });
    }
    
    if (writeData(TOPICS_FILE, filteredData)) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, error: '删除失败' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🎵 服务器运行在 http://localhost:${PORT}`);
    console.log(`📁 数据存储在 ${DATA_DIR} 文件夹`);
    console.log(`✨ 可以在浏览器访问 http://localhost:${PORT}/api/fresh 测试API`);
});

