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
// 新增 黑名单
export function addBlackUser(data) {
  return request({
    url: '/black/save',
    method: 'post',
    data: data
  })
}
// 查询 导入日志列表
export function getlogList(query) {
  return request({
    url: '/dis/log/list',
    method: 'get',
    params: query
  })
}

// 导入 导入
export function importData(data) {
  return request({
    url: '/dis/importData',
	headers: {
	                "Content-Type": "multipart/form-data", //设置请求头
	              },
    method: 'post',
    data: data
  })
}

//客户详情接口
export function getZUserInfo(query) {
  return request({
    url: '/zuser/'+query,
    method: 'get'
  })
}

//获取用户审核日志
export function getZUserAuditLogInfo(query) {
  return request({
    url: '/auLog/list',
    method: 'get',
    params: query
  })
}
