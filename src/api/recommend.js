import request from '@/utils/request'
// 获取全部评论
export const getDiscussAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: data
  })
}
// 对文章进行评论或者对评论进行评论
export const publishRecommentAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
