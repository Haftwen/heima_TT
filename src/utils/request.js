// 下载axios 引入 配置 导出
import store from '@/store'
import axios from 'axios'
// 防止多个请求的基准地址不同可以克隆来配置axios
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器：请求的时候做一些事情 在发送请求之前做什么
// config是每次请求的配置对象
request.interceptors.request.use(
  function (config) {
    // 每一次发送请求都会执行
    // 在发送请求之前做什么
    // 登录了所有请求加上authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config // 必须返回
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
