import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, removeUserName, removeUserId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userBaseInfo: {},
    userId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_BASEINFO: (state, data) => {
    state.userBaseInfo = data
  },
  SET_USERID: (state, data) => {
    state.userId = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.userName)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    getInfo({ type: 0 }).then(res => {
      if (!res) return
      commit('SET_BASEINFO', res);
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserName() // must remove  token  first
      removeUserId() // must remove  token  first
      resetRouter()
      commit('SET_TOKEN', '')
      commit('SET_BASEINFO', {})
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUserName()
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

const getters = {
  token(state) {
    return state.token
  },
  userBaseInfo(state) {
    return state.userBaseInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

