const http = require('http');
const fs = require('fs');
const path = require('path');

// 注意：移除了硬编码的 PORT 和 listen 部分

const PUBLIC_DIR = './'; // 相对于此文件，可能需要调整

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// 创建一个标准的请求处理器函数
function createServer(request, response) {
    console.log(`${request.method} ${request.url}`);

    let filePath = request.url === '/' 
        ? path.join(__dirname, '..', PUBLIC_DIR, 'index.html') 
        : path.join(__dirname, '..', PUBLIC_DIR, request.url); // 路径需跳出/api目录

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                response.writeHead(500);
                response.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

// 关键：导出 Vercel Serverless Function 标准格式的 handler
module.exports = (req, res) => {
    createServer(req, res);
};