import request from '@/utils/request'

const path = {
  deptList: '/dict/selectDeptItem',
  fsuList: '/dict/selectFsuItem',
  OperateEnum: '/dict/selectOperationItem',
  LeakyCablelEnum: '/dict/selectLeakyCablelItem',
  MonitorEnum: '/dict/selectMonitorItem',
  selectDictType: '/dict/selectDictType',
  getTree: '/home/getTree',
}

export function deptList() {
  return request.post(path.deptList, ...arguments)
}

export function fsuList() {
  return request.post(path.fsuList, ...arguments)
}

export function OperateEnum() {
  return request.post(path.OperateEnum, ...arguments)
}

export function LeakyCablelEnum() {
  return request.post(path.LeakyCablelEnum, ...arguments)
}

export function MonitorEnum() {
  return request.post(path.MonitorEnum, ...arguments)
}

export function selectDictType() {
  return request.post(path.selectDictType, ...arguments)
}

export function getTree() {
  return request.post(path.getTree, ...arguments)
}

