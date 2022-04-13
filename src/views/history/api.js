import request from '@/utils/request'

const path = {
  MonitorStatusList: 'sysHistoryMonitorStatus/selectPage',
  MonitorStatusDelete: 'sysHistoryMonitorStatus/batchDeleteHistoryMonitorStatus',

  MonitorMaintainList: 'sysHistoryMonitorMaintain/selectPage',
  MonitorMaintainDelete: 'sysHistoryMonitorMaintain/batchDeleteHistoryMonitorMaintain',

  ConnectStatusList: 'sysHistoryConnectStatus/selectPage',
  ConnectStatusDelete: 'sysHistoryConnectStatus/batchDeleteHistoryConnectStatus',
  ConnectStatusDeleteAll: 'sysHistoryConnectStatus/deleteAll',

  ConnectMaintainList: 'sysHistoryConnectMaintain/selectPage',
  ConnectMaintainDelete: 'sysHistoryConnectMaintain/batchDeleteHistoryConnectMaintain',
  ConnectMaintainDeleteAll: 'sysHistoryConnectMaintain/deleteAll',

  commonQuery: 'sysHistoryCommon/getSiteAndAlarmAll',
}

export function MonitorStatusList() {
  return request.post(path.MonitorStatusList, ...arguments)
}
export function MonitorStatusDelete() {
  return request.post(path.MonitorStatusDelete, ...arguments)
}

export function MonitorMaintainList() {
  return request.post(path.MonitorMaintainList, ...arguments)
}
export function MonitorMaintainDelete() {
  return request.post(path.MonitorMaintainDelete, ...arguments)
}


export function ConnectStatusList() {
  return request.post(path.ConnectStatusList, ...arguments)
}
export function ConnectStatusDelete() {
  return request.post(path.ConnectStatusDelete, ...arguments)
}
export function ConnectStatusDeleteAll() {
  return request.post(path.ConnectStatusDeleteAll, ...arguments)
}

export function ConnectMaintainList() {
  return request.post(path.ConnectMaintainList, ...arguments)
}
export function ConnectMaintainDelete() {
  return request.post(path.ConnectMaintainDelete, ...arguments)
}
export function ConnectMaintainDeleteAll() {
  return request.post(path.ConnectMaintainDeleteAll, ...arguments)
}

export function commonQuery() {
  return request.post(path.commonQuery, ...arguments)
}

