import request from '@/utils/request'

const path = {
  cableTimeList: 'sysMonitorAlarm/selectPage',
  cableConfirm: 'sysMonitorAlarm/confirm',
  cableCancel: 'sysMonitorAlarm/cancel',
  
  deviceList: 'sysConnectAlarm/selectPage',
  deviceConfirm: 'sysConnectAlarm/confirm',
  deviceCancel: 'sysConnectAlarm/cancel'
}

export function cableTimeList() {
  return request.post(path.cableTimeList, ...arguments)
}

export function cableCancel() {
  return request.post(path.cableCancel, ...arguments)
}
export function cableConfirm() {
  return request.post(path.cableConfirm, ...arguments)
}

export function deviceList() {
  return request.post(path.deviceList, ...arguments)
}
export function deviceConfirm() {
  return request.post(path.deviceConfirm, ...arguments)
}
export function deviceCancel() {
  return request.post(path.deviceCancel, ...arguments)
}
