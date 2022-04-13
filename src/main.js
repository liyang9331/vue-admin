import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import performLoader from '@/utils/global_main_loader.js'

Vue.use(ElementUI, { locale })
performLoader(Vue) // 所有的第三方插件性质的东西都放到这里面了
Vue.config.productionTip = false

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

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
