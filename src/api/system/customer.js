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
// 查询 黑名单列表
export function moveBlackUser(query) {
  return request({
    url: '/black/delete',
    method: 'get',
    params: query
  })
}
// 修改 黑名单
export function updateBlackUser(data) {
  return request({
  
    url: '/black/update',
    method: 'post',
    data: data
  })
}