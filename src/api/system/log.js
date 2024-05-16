import request from '@/utils/request'

// 查询 平台操作日志
export function getOperlogList(query) {
	return request({
		url: '/monitor/operlog/list',
		method: 'get',
		params: query
	})
}

// 日志数量统计
export function getEchartsCount(query) {
	return request({
		url: '/logData/count',
		method: 'get',
        params: query
	})
}

// 风险人员列表
export function getEchartsWarnList(query) {
	return request({
		url: '/logData/warnList',
		method: 'get',
        params: query
	})
}

// 风险预警列表
export function getLimitWarnList(query) {
	return request({
		url: '/limit/warnList',
		method: 'get',
        params: query
	})
}

// 风险预警列表详情
export function getWarnDetailList(query) {
	return request({
		url: '/limit/warnDetail',
		method: 'get',
        params: query
	})
}






















// 刷新密码
export function reshPwd(query) {
	return request({
		url: '/keys/upKey/' + query,
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


// 查询密钥日志列表
export function getKeysLogList(query) {
	return request({
		url: '/keys/log/list',
		method: 'get',
		params: query
	})
}
// 添加秘钥
export function keysAdd(data) {
	return request({
		
		url: '/keys/add',
		method: 'post',
		data: data
	})
}


// 查询敏感字段-不分页
export function getSensitiveList(query) {
	return request({
		url: '/comm/sensitive/list',
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