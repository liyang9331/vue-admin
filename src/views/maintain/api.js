import request from '@/utils/request'

const path = {
  cableTypeEnum: 'equipParam/selectItem',
  saveParam: 'equipParam/saveParam',
  selectEquipByType: 'equipParam/selectEquipByType',
}

export function cableTypeEnum() {
  return request.post(path.cableTypeEnum, ...arguments)
}

export function saveParam() {
  return request.post(path.saveParam, ...arguments)
}

export function selectEquipByType() {
  return request.post(path.selectEquipByType, ...arguments)
}
