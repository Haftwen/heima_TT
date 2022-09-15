import request from '@/utils/request'

/**
 *根据关键词获取相应的搜索建议
 * @param {*} q
 * @returns promise
 */
export const getSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
/**
 *
 * @param {Number} page 分页页数，非必填，不填默认值1
 * @param {Number} per_page 每一页的数量
 * @param {String} q 搜索关键字
 * @returns
 */
export const getResultsAPI = (/*eslint-disable-line*/ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
