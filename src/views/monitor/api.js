import request from '@/utils/request'

const path = {
  CableStatusList: 'sysLeakyCableStatus/selectPage',

  DeviceStatusList: 'sysDeviceStatus/selectPage',
}

export function CableStatusList() {
  return request.post(path.CableStatusList, ...arguments)
}

export function DeviceStatusList() {
  return request.post(path.DeviceStatusList, ...arguments)
}
