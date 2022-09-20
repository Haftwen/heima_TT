// 请求新闻数据
import request from '@/utils/request'
/**
 *
 * @param {String | Number} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据传当前事件戳，请求历史数据传指定的时间戳
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
/**
 *
 * @param {} id 点击的文章的具体id
 * @returns
 */
// 获取新闻详情页
export const getArticlesDetials = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
