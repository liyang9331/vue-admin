import { deptList } from '@/api/baseData'

const getDefaultState = () => {
  return {
    departList: null,
    departMap: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_DEPART: (state, payload) => {
    state.departList = handleDepart(payload)
    state.departMap = listToMap(payload)
  }
}

const actions = {
  getDepart({ commit }) {
    deptList({}).then(res => {
      if (!res) return
      commit('SET_DEPART', res)
    })
  }
}

const getters = {
  departMap(state) {
    return state.departMap
  },
  departList(state) {
    return state.departList
  }
}

function handleDepart(list) {
  if (!list) return
  return list.map(item => {
    let data = {}
    data.label = item.dictValue
    data.name = item.dictValue
    data.id = item.id
    data.value = item.id
    data.data = item
    return data
  })
}

function listToMap(arr, mapKey = 'id') {
  let map = {}
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
