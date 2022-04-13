import request from '@/utils/request'

const path = {
  // 告警管理
  exportLeakyCable: 'sysMonitorAlarm/export',
  exportConnet: 'sysConnectAlarm/export',

  // 配置管理
  exportRailWay: "railWay/export",
  exportSite: "site/export",
  exportFsu: "fsu/export",
  exportMonitorEquip: "monitorEquip/export",
  exportLeaky: "leakyCable/export",

  // 实时状态
  exportLeakyCableTime: 'sysLeakyCableStatus/export',
  exportConnetTime: 'sysDeviceStatus/export',

  // 历史数据
  exportLeakyStatusHistory: 'sysHistoryMonitorStatus/export',
  exportLeakyMaintainHistory: 'sysHistoryMonitorMaintain/export',
  exportConnectStatusHistory: 'sysHistoryConnectStatus/export',
  exportConnectMaintainHistory: 'sysHistoryConnectMaintain/export',

  // 用户管理
  exportLog: 'sysLog/exportLog',
}

const blobConf = { responseType: 'blob' }
function requestBlob(url, params, config = {}) {
  return request.post(url, params, {
    ...config,
    ...blobConf
  })
}

export function exportLeakyCable() {
  return requestBlob(path.exportLeakyCable, ...arguments)
}
export function exportConnet() {
  return requestBlob(path.exportConnet, ...arguments)
}

export function exportRailWay() {
  return requestBlob(path.exportRailWay, ...arguments)
}
export function exportSite() {
  return requestBlob(path.exportSite, ...arguments)
}
export function exportFsu() {
  return requestBlob(path.exportFsu, ...arguments)
}
export function exportMonitorEquip() {
  return requestBlob(path.exportMonitorEquip, ...arguments)
}
export function exportLeaky() {
  return requestBlob(path.exportLeaky, ...arguments)
}


export function exportLeakyCableTime() {
  return requestBlob(path.exportLeakyCableTime, ...arguments)
}
export function exportConnetTime() {
  return requestBlob(path.exportConnetTime, ...arguments)
}

export function exportLeakyStatusHistory() {
  return requestBlob(path.exportLeakyStatusHistory, ...arguments)
}
export function exportLeakyMaintainHistory() {
  return requestBlob(path.exportLeakyMaintainHistory, ...arguments)
}
export function exportConnectStatusHistory() {
  return requestBlob(path.exportConnectStatusHistory, ...arguments)
}
export function exportConnectMaintainHistory() {
  return requestBlob(path.exportConnectMaintainHistory, ...arguments)
}

export function exportLog() {
  return requestBlob(path.exportLog, ...arguments)
}