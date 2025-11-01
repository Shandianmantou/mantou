// Vercel Serverless Function - 新鲜速递API
// 注意：使用内存存储，数据在函数重启后会丢失
// 建议后续接入数据库（如MongoDB Atlas免费版）

// 内存存储（临时方案，重启后数据会丢失）
let memoryStore = null;

function readData() {
    try {
        // 尝试从环境变量或内存读取
        if (memoryStore === null) {
            // 第一次读取，返回空数组
            memoryStore = [];
        }
        return memoryStore;
    } catch (error) {
        console.error('读取失败:', error);
        return [];
    }
}

function writeData(data) {
    try {
        memoryStore = data;
        return true;
    } catch (error) {
        console.error('写入失败:', error);
        return false;
    }
}

module.exports = async (req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const method = req.method;
    
    // 解析请求体
    let body = {};
    if ((method === 'POST' || method === 'PUT') && req.body) {
        try {
            if (typeof req.body === 'string') {
                body = JSON.parse(req.body);
            } else {
                body = req.body;
            }
        } catch (e) {
            return res.status(400).json({ success: false, error: '无效的JSON数据' });
        }
    }

    try {
        if (method === 'GET') {
            const data = readData();
            return res.status(200).json(data);
        }

        if (method === 'POST') {
            const data = readData();
            const newItem = {
                id: Date.now(),
                ...body
            };
            data.push(newItem);
            if (writeData(data)) {
                return res.status(200).json({ success: true, data: newItem });
            }
            return res.status(500).json({ success: false, error: '保存失败' });
        }

        return res.status(405).json({ success: false, error: '不支持的方法' });
    } catch (error) {
        console.error('API错误:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || '服务器错误',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

