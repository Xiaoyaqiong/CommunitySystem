import axios from "axios";
import router from "@/router";
// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:5000'
  // baseURL:'http://27.106.105.56:5000'
})
// 添加请求拦截器
service.interceptors.request.use(function (req) {
  // 在发送请求之前添加token
  const token = localStorage.getItem("Token");
  if (token) {
    // const Token = JSON.parse(token);
    req.headers['token'] = token;
  }
  return req;
});

// 添加响应拦截器
service.interceptors.response.use(function (res) {
  if (res.status !== 200) {
    // 程序错误
    console.log('!200',res.status);
    return Promise.reject(res);
  } else {
    console.log('200',res.status);
    if (res.data.code === 2024 && res.data.code===2023) {
      setTimeout(() => {
        router.push("/register");
      }, 1500);
      return Promise.reject(res);
    }
    // if (res.data.code !== 8000) {
    //   // 业务逻辑错误
    //   return Promise.reject(res);
    // }
    return res.data;
  }
});
export default service