import request from '@/utils/request'

// 所有关于频道的接口
/**
 *获取用户自己的频道
 * @returns Promise
 */
export const getChannelApi = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有的频道
/**
 *获取所有的频道
 * @returns promise
 */
export const getAllChannelsApi = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *删除频道
 * @param {Number | String} id 频道id
 * @returns promise
 */
// 删除频道的
export const delChannelApi = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
    // token不需要了因为请求拦截器会帮我们加
  })
}
/**
 *新增频道-->我的
 * @param {String | Number} id 新增频道的id
 * @param {*} seq 新增频道的索引值
 * @returns promise
 */
// 新增频道的接口
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels/',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
