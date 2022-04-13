import request from '@/utils/request'

const path = {
  railWaylist: 'railWay/selectPage',
  railWaydetail: 'railWay/detail',
  railWaysave: 'railWay/save',
  railWaybatchDelete: 'railWay/batchDelete',
  railWayselectList: 'railWay/selectList',

  sitelist: 'site/selectPage',
  sitedetail: 'site/detail',
  sitesave: 'site/save',
  sitebatchDelete: 'site/batchDelete',
  siteselectList: 'site/selectList',
  selectForSite:'site/selectForSite',//铁路查站点

  fsuList: 'fsu/selectPage',
  fsudetail: 'fsu/detail',
  fsusave: 'fsu/save',
  fsubatchDelete: 'fsu/batchDeleteFsu',
  fsuselectList: 'fsu/selectList',
  selectForFsu: 'fsu/selectForFsu',

  selectFsuItem:'dict/selectFsuItem',//fsu数据字典

  monitorEquipList: 'monitorEquip/selectPage',
  monitorEquipdetail: 'monitorEquip/detail',
  monitorEquipsave: 'monitorEquip/save',
  monitorEquipbatchDelete: 'monitorEquip/batchDeleteEquip',
  monitorEquipselectList: 'monitorEquip/selectList',
  selectForEquip: 'monitorEquip/selectForEquip',
  selectMonitorItem:'dict/selectMonitorItem',//监测设备字典

  leakyCableList: 'leakyCable/selectPage',
  leakyCabledetail: 'leakyCable/detail',
  leakyCablesave: 'leakyCable/save',
  leakyCablebatchDelete: 'leakyCable/batchDeleteEquip',
  leakyCableselectList: 'leakyCable/selectList',
  selectForCable: 'leakyCable/selectForCable',
}
// 铁路线
export function railWaylist() {
  return request.post(path.railWaylist, ...arguments)
}


export function railWaydetail() {
  return request.post(path.railWaydetail, ...arguments)
}
export function railWaysave() {
    return request.post(path.railWaysave, ...arguments)
  }
export function railWaybatchDelete() {
  return request.post(path.railWaybatchDelete, ...arguments)
}

export function railWayselectList() {
  return request.post(path.railWayselectList, ...arguments)
}

//站点


export function selectForSite() {
  return request.post(path.selectForSite, ...arguments)
}

  
  export function sitelist() {
    return request.post(path.sitelist, ...arguments)
  }
  export function sitedetail() {
    return request.post(path.sitedetail, ...arguments)
  }
  export function sitesave() {
      return request.post(path.sitesave, ...arguments)
    }
  export function sitebatchDelete() {
    return request.post(path.sitebatchDelete, ...arguments)
  }
  
  export function siteselectList() {
    return request.post(path.siteselectList, ...arguments)
  }
  //fsu
  
  export function selectForFsu() {
    return request.post(path.selectForFsu, ...arguments)
  }
  export function selectFsuItem() {//fsu字典
    return request.post(path.selectFsuItem, ...arguments)
  }
  export function fsulist() {
    return request.post(path.fsuList, ...arguments)
  }
  
  export function fsudetail() {
    return request.post(path.fsudetail, ...arguments)
  }
  export function fsusave() {
      return request.post(path.fsusave, ...arguments)
    }
  export function fsubatchDelete() {
    return request.post(path.fsubatchDelete, ...arguments)
  }
  
  export function fsuselectList() {
    return request.post(path.fsuselectList, ...arguments)
  }
//监测

export function selectMonitorItem() {
  return request.post(path.selectMonitorItem, ...arguments)
}
export function monitorEquiplist() {
  return request.post(path.monitorEquipList, ...arguments)
}

export function monitorEquipdetail() {
  return request.post(path.monitorEquipdetail, ...arguments)
}
export function monitorEquipsave() {
    return request.post(path.monitorEquipsave, ...arguments)
  }
export function monitorEquipbatchDelete() {
  return request.post(path.monitorEquipbatchDelete, ...arguments)
}

export function monitorEquipselectList() {
  return request.post(path.monitorEquipselectList, ...arguments)
}
export function selectForEquip() {
  return request.post(path.selectForEquip, ...arguments)
}
//漏缆
export function leakyCablelist() {
  return request.post(path.leakyCableList, ...arguments)
}

export function leakyCabledetail() {
  return request.post(path.leakyCabledetail, ...arguments)
}
export function leakyCablesave() {
    return request.post(path.leakyCablesave, ...arguments)
  }
export function leakyCablebatchDelete() {
  return request.post(path.leakyCablebatchDelete, ...arguments)
}

export function leakyCableselectList() {
  return request.post(path.leakyCableselectList, ...arguments)
}
export function selectForCable() {
  return request.post(path.selectForCable, ...arguments)
}

