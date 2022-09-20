import request from '@/utils/request'
// 收藏文章
export const articlesCollectionsAPI = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// 关注作者和取消关注作者
export const addUserAPI = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
export const removeUserAPI = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
// 收藏文章和取消收藏
export const collectAPI = (id) => {
  console.log(id)
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
export const removeCollectAPI = (target) => {
  console.log(target)
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
