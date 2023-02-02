import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// 加载svg 图标
import '@/icons/index'
import dataV from '@jiaminghi/data-view'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'video.js/dist/video-js.css' // videojs样式
import 'element-ui/lib/theme-chalk/index.css'
import performLoader from '@/utils/global_main_loader.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { routerGuardInit } from '@/router/routeGuardInit'
// import VueAMap from 'vue-amap'

// 路由守卫初始化
routerGuardInit(router)
// 主题
require(`@/styles/index.scss`)
performLoader(Vue) // 所有的第三方插件性质的东西都放到这里面了
Vue.config.productionTip = false
Vue.use(dataV)
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: '454f8e18902e584f871769ac65d9f047',
//   plugin: [
//     'AMap.Autocomplete', 'AMap.PlaceSearch',
//     'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar',
//     'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4',
//   uiVersion: '1.0.11' // ui版本号，也是需要写
// })
Vue.directive('resize', { // 指令的名称
  bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
    let width = ''; let height = ''
    function isReize() {
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value(style.width, style.height) // 关键 绑定函数
      }
      width = style.width
      height = style.height
    }
    el.__vueSetInterval__ = setInterval(isReize, 300)
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__)
  }
})

function dispatchWithPromise(path) {
  return new Promise(resolve => {
    store.dispatch(path, resolve)
  })
}

// 刷新获取数据
const beforeEnterApp = () => {
  dispatchWithPromise('user/getInfo')
  // dispatchWithPromise('tree/getTreeData')
  // dispatchWithPromise('tree/getOrgTree')
  // dispatchWithPromise('waterMark/getWaterMark')
}
beforeEnterApp()

const app = new Vue({
  el: '#app',
  beforeCreate() { // 尽量早的执行挂载全局事件总线对象的操作
    Vue.prototype.$globalEventBus = this
    Vue.prototype.$log = (msg) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[system-log] ' + msg)
      }
    }
  },
  router,
  store,
  render: h => h(App)
})
