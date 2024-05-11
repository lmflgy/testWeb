import request from '@/utils/request'

// 查询用户阈值管理列表
export function listUser(query) {
  return request({
    url: '/limit/list',
    method: 'get',
    params: query
  })
}

// 查询用户阈值管理详细
export function getUser(id) {
  return request({
    url: '/limit/' + id,
    method: 'get'
  })
}

// 新增用户阈值管理
export function addUser(data) {
  return request({
    url: '/limit',
    method: 'post',
    data: data
  })
}

// 修改用户阈值管理
export function updateUser(data) {
  return request({
    url: '/limit',
    method: 'put',
    data: data
  })
}

// 删除用户阈值管理
export function delUser(id) {
  return request({
    url: '/limit/' + id,
    method: 'delete'
  })
}
