// api/data/index.js
export default function handler(req, res) {
  // 设置CORS头部，允许您的域名来访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 一个简易的内存“数据库”
  // 注意：Vercel Serverless 环境是无状态的，重启后数据会丢失。
  // 这仅用于演示和开发，生产环境应连接真实数据库。
  let websiteData = {
    basicInfo: { name: "张三", phone: "138-0000-0000", email: "zhangsan@example.com", avatar: "" },
    education: [],
    skills: [],
    work: [],
    projects: [],
    works: []
  };

  // GET 请求：获取所有数据
  if (req.method === 'GET') {
    return res.status(200).json(websiteData);
  }

  // POST 请求：更新数据
  if (req.method === 'POST') {
    try {
      const newData = req.body;
      // 简单验证：请求体必须是对象
      if (typeof newData === 'object' && newData !== null) {
        // 合并新数据到现有数据（这里做简单替换，可根据需求细化）
        websiteData = { ...websiteData, ...newData };
        console.log('数据已更新:', Object.keys(newData));
        return res.status(200).json({ success: true, message: '数据保存成功！' });
      } else {
        return res.status(400).json({ success: false, message: '无效的数据格式' });
      }
    } catch (error) {
      console.error('保存数据时出错:', error);
      return res.status(500).json({ success: false, message: '服务器内部错误' });
    }
  }

  // 不支持的请求方法
  return res.status(405).json({ success: false, message: '方法不允许' });
}