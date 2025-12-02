import { createProxyMiddleware } from "http-proxy-middleware";

const proxyMiddleware = createProxyMiddleware({
  target: "http://localhost:9999", // 目标服务器地址
  changeOrigin: true, // 修改请求的来源
  secure: false, // 如果目标是 HTTPS，忽略证书错误
});

export default proxyMiddleware;
