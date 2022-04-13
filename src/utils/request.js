import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import EventBus from '@/utils/bus'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // withCredentials: true 
  // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


let loading = {}
function startLoading(el) {
  if (!el) return
  let target = document.querySelector(el)
  if (!target || loading[el]) return
  loading[el] = Vue.prototype.$loading({
    lock: true,
    target
  })
}

function endLoading(el) {
  if (el && loading[el]) {
    loading[el].close()
    delete loading[el]
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    if(config.method === 'post' && config.data && !config.json) {
      config.data = qs.stringify(config.data)
    }
    if(config.method === 'get') {
      config.headers.get['Content-Type'] = 'application/json'
    }
    let token = store.getters.token
    if (token) {
      config.headers['Authorization'] = getToken()
    }
    startLoading(config.el)
    return config
  },
  error => {
    // do something with request error
    startLoading(error.request.config.el)
    return Promise.reject(error)
  }
)

// response interceptor
let errorShowing = false
service.interceptors.response.use(
  response => {
    const res = response.data.data ? response.data.data : response.data
    let config = response.config
    endLoading(config.el)
    let resFinal = res.rsp || res || {}
    let code = resFinal.errorCode || resFinal.code
    let message = resFinal.message || resFinal.errorMsg || resFinal.error || '接口错误'
    if (code) {
      if (code === 201) {
        location.href = location.href.replace(/#.+/, '') + '#/login'
        EventBus.$emit('cancelWS')
        return
      }
      if (code === 501) {
        // !config.silence && !errorShowing && Message.error(message)
        errorShowing = true
        setTimeout(() => { errorShowing = false }, 3000)
        store.dispatch('user/resetToken')
        EventBus.$emit('cancelWS')
        location.href = location.href.replace(/#.+/, '') + '#/login'
        return
      }
      if (code !== 200) {
        !config.silence && Message.error(message)
        return Promise.reject(new Error(message))
      }
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response) {
      endLoading(error.response.config.el)
      if (!error.response.config.silence) {
        Message.error(error.message)
      }
    }
    return Promise.reject(error)
  }
)

export default service
