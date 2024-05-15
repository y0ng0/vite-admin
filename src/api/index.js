import axios from "axios";

const getBaseUrl = () => {
  // 根据环境变量返回不同的接口地址
  return import.meta.env.VITE_SERVER_API_BASE_URL;
};

const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 2000, // 请求超时时间
  headers: {
    "Content-Type": "application/json", // 默认请求头
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里进行请求前的处理，比如添加 token 到请求头
    // config.headers['Authorization'] = 'Bearer ' + getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在这里可以对响应数据进行处理
    return response.data;
  },
  (error) => {
    // 对响应错误进行处理
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = (url, params = {}) => {
  return instance.get(url, { params });
};

// 封装 POST 请求
export const post = (url, data = {}) => {
  return instance.post(url, data);
};

// 其他请求方式可以类似地封装
