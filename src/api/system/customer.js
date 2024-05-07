import request from '@/utils/request'

// 查询客户列表
export function getUserList(query) {
  return request({
    url: '/zuser/list',
    method: 'get',
    params: query
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

