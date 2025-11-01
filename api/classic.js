// Vercel Serverless Function - 经典重温API
const fs = require('fs');
const path = require('path');

const DATA_DIR = '/tmp/data';
const CLASSIC_FILE = path.join(DATA_DIR, 'classic.json');

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function readData() {
    ensureDataDir();
    try {
        if (fs.existsSync(CLASSIC_FILE)) {
            const data = fs.readFileSync(CLASSIC_FILE, 'utf8');
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
        fs.writeFileSync(CLASSIC_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('写入失败:', error);
        return false;
    }
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const method = req.method;
    
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
            const data = readData();
            return res.json(data);
        }

        if (method === 'POST') {
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

