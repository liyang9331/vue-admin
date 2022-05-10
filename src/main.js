import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css'
import performLoader from '@/utils/global_main_loader.js'


import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

performLoader(Vue) // 所有的第三方插件性质的东西都放到这里面了
Vue.config.productionTip = false

// 
function dispatchWithPromise(path) {
  return new Promise(resolve => {
    store.dispatch(path, resolve)
  })
}

// 刷新获取数据
const beforeEnterApp = () => {
  dispatchWithPromise('user/getInfo')
}

beforeEnterApp()

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// 主题
const theme = app.$store.state.settings.theme;
require (`@/styles/index_${theme}.scss`);

