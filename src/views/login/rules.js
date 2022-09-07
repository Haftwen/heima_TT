// 校验规则的抽离
export const mobileRules = [
  { required: true, message: '请填写用户名' },
  {
    pattern:
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机号格式错误'
  }
]
export const codeRules = [
  ({ required: true, message: '请填写密码' },
  {
    pattern: /[0-9]{6}/,
    message: '验证码格式错误'
  })
]
