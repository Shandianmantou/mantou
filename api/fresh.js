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
    try {
        // 设置CORS头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        const method = req.method;
        
        // 解析请求体 - Vercel会自动解析JSON
        let body = {};
        if ((method === 'POST' || method === 'PUT') && req.body) {
            try {
                body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            } catch (e) {
                res.status(400).json({ success: false, error: '无效的JSON数据' });
                return;
            }
        }

        if (method === 'GET') {
            const data = readData();
            res.status(200).json(data);
            return;
        }

        if (method === 'POST') {
            const data = readData();
            const newItem = {
                id: Date.now(),
                ...body
            };
            data.push(newItem);
            if (writeData(data)) {
                res.status(200).json({ success: true, data: newItem });
                return;
            }
            res.status(500).json({ success: false, error: '保存失败' });
            return;
        }

        res.status(405).json({ success: false, error: '不支持的方法' });
    } catch (error) {
        console.error('API错误:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || '服务器错误'
        });
    }
}

