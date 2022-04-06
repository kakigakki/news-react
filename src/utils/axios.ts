import { message } from 'antd';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 10000; //10s

const showTip = (tip: string) => {
  message.error(tip);
};

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如把用户的登录信息放在请求头上
    // config.headers.common['cookie-id'] = cookieId
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    Promise.reject(err);
  },
);
/**
 * 响应拦截
 */
axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  // 对异常响应处理
  (err) => {
    if (!err) return Promise.reject(err);

    if (err.response) {
      err.message = '服务器出错啦!';
    }
    // 没有response(没有状态码)的情况
    // eg: 超时；断网；请求重复被取消；主动取消请求；
    else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(err)) {
        throw new axios.Cancel(err.message);
      } else if (err.stack && err.stack.includes('timeout')) {
        err.message = '请求超时!';
      } else {
        err.message = '连接服务器失败!';
      }
    }
    showTip(err.message);
    return Promise.reject(err);
  },
);

export default axios;
