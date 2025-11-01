// Vercel Serverless Function - 新鲜速递API
const fs = require('fs');
const path = require('path');

// 数据文件路径（使用临时目录，因为Vercel是只读文件系统）
// 实际部署时需要改用数据库，这里先用临时方案
const DATA_DIR = '/tmp/data';
const FRESH_FILE = path.join(DATA_DIR, 'fresh.json');

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function readData() {
    ensureDataDir();
    try {
        if (fs.existsSync(FRESH_FILE)) {
            const data = fs.readFileSync(FRESH_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('读取失败:', error);
    }
    return [];
}

function writeData(data) {
    ensureDataDir();
    try {
        fs.writeFileSync(FRESH_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('写入失败:', error);
        return false;
    }
}

module.exports = async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const method = req.method;
    
    // 解析请求体（如果是POST/PUT）
    let body = {};
    if (method === 'POST' || method === 'PUT') {
        try {
            if (typeof req.body === 'string') {
                body = JSON.parse(req.body);
            } else {
                body = req.body || {};
            }
        } catch (e) {
            return res.status(400).json({ success: false, error: '无效的JSON数据' });
        }
    }

    try {
        if (method === 'GET') {
            // 获取所有
            const data = readData();
            return res.json(data);
        }

        if (method === 'POST') {
            // 创建新项
            const data = readData();
            const newItem = {
                id: Date.now(),
                ...body
            };
            data.push(newItem);
            if (writeData(data)) {
                return res.json({ success: true, data: newItem });
            }
            return res.status(500).json({ success: false, error: '保存失败' });
        }

        return res.status(405).json({ success: false, error: '不支持的方法' });
    } catch (error) {
        console.error('API错误:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

