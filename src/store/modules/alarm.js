import { cableTimeList, deviceList } from '@/views/alarm/api.js'

const getDefaultState = () => {
  return {
    cableList: [],
    deviceList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_CABLE: (state, payload) => {
    state.cableList = handleCable(payload)
  },
  SET_DEVICE: (state, payload) => {
    state.deviceList = handleAlarm(payload)
  }
}

const actions = {
  getAlarmList({ commit }, resolve) {
    Promise.all([
      cableTimeList({ confirmStatus: 0 }),
      deviceList({ confirmStatus: 0 })
    ]).then(res => {
      commit('SET_CABLE', res[0].records.filter(item => { item.alarmLevel !== 1 }))
      commit('SET_DEVICE', res[1].records.filter(item => item.connectStatusName === '连接异常'))
      resolve && resolve()
    })
  },
  getCableTime({ commit }) {
    cableTimeList({ confirmStatus: 0 }).then(res => {
      commit('SET_CABLE', res.records.filter(item => item.alarmLevel !== 1))
    })
  },
  getDevice({ commit }) {
    return deviceList({ confirmStatus: 0 }).then(res => {
      commit('SET_DEVICE', res.records.filter(item => item.connectStatusName === '连接异常'))
    })
  }
}

const getters = {
  cableList(state) {
    return state.cableList
  },
  deviceList(state) {
    return state.deviceList
  }
}

function handleAlarm(list) {
  if (!list) return
  return list.map(item => {
    const data = {}
    data.id = item.id
    data.value = item.connectStatusName
    data.data = item
    return data
  })
}

function handleCable(list) {
  if (!list) return
  return list.map(item => {
    const data = {}
    data.id = item.id
    data.alarmLevel = item.alarmLevel
    data.value = item.alarmLevelName
    data.data = item
    return data
  })
}

function listToMap(arr, mapKey = 'id') {
  const map = {}
  arr.forEach(item => {
    map[item[mapKey]] = item
  })
  return map
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
