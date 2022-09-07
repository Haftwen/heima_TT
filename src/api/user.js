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
