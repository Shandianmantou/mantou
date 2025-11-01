// Vercel动态路由 - 经典重温
let memoryStore = null;

function readData() {
    try {
        if (memoryStore === null) {
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const method = req.method;
    const id = parseInt(req.query.id) || (req.url ? parseInt(req.url.split('/').pop()) : null);
    
    let body = {};
    if (method === 'PUT' && req.body) {
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

    if (!id || isNaN(id)) {
        return res.status(400).json({ success: false, error: '需要有效的ID' });
    }

    try {
        if (method === 'GET') {
            const data = readData();
            const item = data.find(d => d.id === id);
            if (!item) {
                return res.status(404).json({ success: false, error: '未找到' });
            }
            return res.status(200).json(item);
        }

        if (method === 'PUT') {
            const data = readData();
            const index = data.findIndex(item => item.id === id);
            if (index === -1) {
                return res.status(404).json({ success: false, error: '未找到' });
            }
            data[index] = { ...data[index], ...body };
            if (writeData(data)) {
                return res.status(200).json({ success: true, data: data[index] });
            }
            return res.status(500).json({ success: false, error: '更新失败' });
        }

        if (method === 'DELETE') {
            const data = readData();
            const filteredData = data.filter(item => item.id !== id);
            if (data.length === filteredData.length) {
                return res.status(404).json({ success: false, error: '未找到' });
            }
            if (writeData(filteredData)) {
                return res.status(200).json({ success: true });
            }
            return res.status(500).json({ success: false, error: '删除失败' });
        }

        return res.status(405).json({ success: false, error: '不支持的方法' });
    } catch (error) {
        console.error('API错误:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || '服务器错误'
        });
    }
}

