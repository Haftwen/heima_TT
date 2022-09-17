// 非vue文件需要引入 Vue文件直接this.$store即可
import request from '@/utils/request'
// 用户登录请求 根据后端接口文档划分
/**
 *登录
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 发送验证码
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 封装获取用户信息的请求
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // 太长了用请求拦截器
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
/**
 *
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */
// 封装上传图片的接口 要求传表单必须传表单模拟一个表单
export const uploadPhotoAPI = (file) => {
  // 模拟表单
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
// 页面加载获取信息
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
/**
 *编辑用户的个人资料
 * @param {String | Number} userInfo 传输过来的用户信息对象
 * @returns promise
 */
export const UpdateUserInfoAPI = (userInfo) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: userInfo
  })
}
