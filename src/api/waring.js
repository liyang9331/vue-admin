import request from '@/utils/request';
// 实时告警-查询
export function getAlarmInformation(data) {
  return request({
    url: '/gmsActionAlarm/getRealTimeAlarmInformation',
    method: 'get',
    data: data
  })
}
// 实时告警-统计
export function getRealTimeAlarmStatistics(data) {
    return request({
      url: '/gmsActionAlarm/getRealTimeAlarmStatistics',
      method: 'get',
      data: data
    })
  }

// 历史告警-根据条件查询告警
export function getByCondition(params) {
  return request({
    url:'/gmsActionAlarm/getByCondition',
    method:'get',
    params:params
  })
}

// 历史告警-根据id查看历史告警详细信息
export function getById() {
  return request({
    url: '/gmsActionAlarm/getById',
    method: 'post'
  })
}

// 历史告警-选择条件栏
export function getCondition() {
  return request({
    url: '/gmsActionAlarm/getCondition',
    method: 'get'
  })
}
