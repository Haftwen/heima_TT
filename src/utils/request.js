// 下载axios 引入 配置 导出
import axios from 'axios'
// 防止多个请求的基准地址不同可以克隆来配置axios
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
