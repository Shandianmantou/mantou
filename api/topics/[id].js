// Vercel动态路由 - 榜上有名
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
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        const method = req.method;
        const id = parseInt(req.query.id);
        
        if (!id || isNaN(id)) {
            res.status(400).json({ success: false, error: '需要有效的ID' });
            return;
        }

        let body = {};
        if (method === 'PUT' && req.body) {
            try {
                body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            } catch (e) {
                res.status(400).json({ success: false, error: '无效的JSON数据' });
                return;
            }
        }

        if (method === 'GET') {
            const data = readData();
            const item = data.find(d => d.id === id);
            if (!item) {
                res.status(404).json({ success: false, error: '未找到' });
                return;
            }
            res.status(200).json(item);
            return;
        }

        if (method === 'PUT') {
            const data = readData();
            const index = data.findIndex(item => item.id === id);
            if (index === -1) {
                res.status(404).json({ success: false, error: '未找到' });
                return;
            }
            data[index] = { ...data[index], ...body };
            if (writeData(data)) {
                res.status(200).json({ success: true, data: data[index] });
                return;
            }
            res.status(500).json({ success: false, error: '更新失败' });
            return;
        }

        if (method === 'DELETE') {
            const data = readData();
            const filteredData = data.filter(item => item.id !== id);
            if (data.length === filteredData.length) {
                res.status(404).json({ success: false, error: '未找到' });
                return;
            }
            if (writeData(filteredData)) {
                res.status(200).json({ success: true });
                return;
            }
            res.status(500).json({ success: false, error: '删除失败' });
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

