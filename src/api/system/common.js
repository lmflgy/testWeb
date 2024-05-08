import request from '@/utils/request'

// 查询我的上级
export function getTopUserList(query) {
  return request({
    url: '/zuser/myLeader',
    method: 'get',
    params: query
  })
}