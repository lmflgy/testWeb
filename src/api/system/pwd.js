import request from '@/utils/request'

// 查询密钥管理
export function getKeysList(query) {
  return request({
    url: '/keys/list',
    method: 'get',
    params: query
  })
}
// 刷新密码
export function reshPwd(query) {
  return request({
    url: '/keys/upKey/'+query,
    method: 'get'
  })
}
// 导出客户
export function exportUser(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data;'
  },
    url: '/zuser/export',
    method: 'post',
    data: data
  })
}
// 查询 残疾人信息管理
export function getDisUserList(query) {
  return request({
    url: '/dis/list',
    method: 'get',
    params: query
  })
}

// 查询 黑名单列表
export function getBlackUserList(query) {
  return request({
    url: '/black/list',
    method: 'get',
    params: query
  })
}