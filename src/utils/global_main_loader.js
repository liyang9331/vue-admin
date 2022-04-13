import Pagination from '@/components/Pagination/index.vue'
import delids from '@/components/Del/index.vue'
import echarts from 'echarts'
import WS from '@/utils/websocket'

export default function performLoader(Vue) {
  // self component
  function plugins(Vue) {
    Vue.component('Pagination', Pagination)
    Vue.component('delids', delids)
  }
  Vue.use(plugins)
  Vue.prototype.$ws = WS
  Vue.prototype.$echarts = echarts

}
