import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

// 创建 Axios 实例
const $axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.TIME_EDITOR_APP_PROXY as string,
  timeout: 30000,
});

// 请求拦截器
$axios.interceptors.request.use(
  (config) => {
    // 可在此添加 token 或其他请求头
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
$axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 正常返回
    return response.data;
  },
  (error) => {
    // 错误处理
    const errorMsg = error?.response?.data?.errorMsg || error.message || "请求错误";
    // 简单提示
    alert(errorMsg);
    return Promise.reject(error);
  }
);

export default $axios;
