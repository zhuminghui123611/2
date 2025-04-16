# 加密货币数据中继服务 - 简化版

这是一个简单的Netlify Functions项目，提供加密货币数据API的中继服务。

## 特点

- 纯JavaScript实现
- 使用Netlify Functions部署
- 支持CORS跨域请求
- 简单易用的API端点

## API端点

- `/health` - 健康检查
- `/api/v1/test` - 测试端点
- `/api/v1/info` - API信息

## 本地开发

```bash
# 安装依赖
npm install

# 使用Netlify CLI本地运行
npx netlify dev
```

## 部署

直接部署到Netlify:

1. 连接GitHub仓库
2. 使用默认设置部署
3. 不需要额外环境变量 