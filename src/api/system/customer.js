import request from '@/utils/request'

// 查询客户列表
export function getUserList(query) {
  return request({
    url: '/zuser/list',
    method: 'get',
    params: query
  })
}
// 删除客户
export function deleteUser(query) {
  return request({
    url: '/zuser/delete',
    method: 'get',
    params: query
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