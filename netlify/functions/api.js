// 简单的Netlify函数API
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// 创建Express应用
const app = express();

// 基本中间件
app.use(cors());
app.use(express.json());

// API路由
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API服务正常运行',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/v1/test', (req, res) => {
  res.json({
    message: '服务正常运行',
    timestamp: new Date().toISOString()
  });
});

// API密钥信息已硬编码
const API_KEYS = {
  ankr: 'ce9c9f46eac0e045692e0d041fb543747122fb07b9b50f705f70f1004d841840',
  reservoir: 'd1d6d023-5e2f-5561-8184-6417a48c2f01',
  oneinch: 'BFmmhv1wAlc12w1jd6xy8YMy5y0sxLPh',
  walletConnect: '64b6a6cc7a2296ccb0b97b887b6dee1a'
};

// API信息端点
app.get('/api/v1/info', (req, res) => {
  res.json({
    service: '加密货币数据中继服务',
    apis: {
      ankr: { status: 'configured' },
      reservoir: { status: 'configured' },
      oneinch: { status: 'configured' }
    },
    timestamp: new Date().toISOString()
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: '未找到请求的资源',
      path: req.path
    }
  });
});

// 导出serverless函数处理器
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  console.log('请求路径:', event.path);
  console.log('请求方法:', event.httpMethod);
  
  const result = await handler(event, context);
  
  // 添加缓存控制头
  if (result.statusCode >= 200 && result.statusCode < 400) {
    if (!result.headers['Cache-Control']) {
      result.headers['Cache-Control'] = 'public, max-age=60';
    }
  }
  
  return result;
}; 