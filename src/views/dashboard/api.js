import request from '@/utils/request'

const path = {
  treeBaseInfo: '/home/treeBaseInfo',
  railWayOpen: '/railWay/updateRailWay',
  siteOpen: '/site/updateSite',
  fsuOpen: '/fsu/updateFsu',
  monitorEquipOpen: '/monitorEquip/updateMonitorEquip',
  leakyCableOpen: '/leakyCable/updateLeakyCable',

}

export function treeBaseInfo() {
  return request.post(path.treeBaseInfo, ...arguments)
}
export function railWayOpen() {
  return request.post(path.railWayOpen, ...arguments)
} 
export function siteOpen() {
  return request.post(path.siteOpen, ...arguments)
} 
export function fsuOpen() {
  return request.post(path.fsuOpen, ...arguments)
} 
export function monitorEquipOpen() {
  return request.post(path.monitorEquipOpen, ...arguments)
}
 export function leakyCableOpen() {
  return request.post(path.leakyCableOpen, ...arguments)
}
