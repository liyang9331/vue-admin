import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'

const qs = (data) => {
  let ret = ''
  for (const it in data) {
    ret +=
      encodeURIComponent(it) +
      '=' +
      encodeURIComponent(data[it]) +
      '&'
  }
  ret = ret.slice(0, -1) // 去掉最后的空行
  return ret
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

const loading = {}

function startLoading(el) {
  if (!el) return
  const target = document.querySelector(el)
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

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // startLoading(config.el)
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    if (config.method == 'post' && !config.isForm) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = qs(config.data)
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    // startLoading(error.request.config.el)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // endLoading(response.config.el)
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.status > 10000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 2 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else if (response.headers['content-type'] == 'application/octet-stream;charset=utf-8' ||
      response.headers['content-type'] == 'application/vnd.ms-excel;charset=utf-8') {
      return Promise.resolve(response)
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      Message({
        message: '请求超时，请稍后再试',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export default service
