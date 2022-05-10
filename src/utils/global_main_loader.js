import Pagination from '@/components/Pagination/index.vue'
import TableBase from '@/components/Table.vue'
import ElementUI from 'element-ui'

export default function performLoader(Vue) {
  ////////////////////////////////////////////////////////////////////////
  // thirdparty component
  Vue.use(ElementUI)

  ////////////////////////////////////////////////////////////////////////
  // self component
  function plugins(Vue) {
    Vue.component('Pagination', Pagination)
    Vue.component('TableBase', TableBase)
  }
  Vue.use(plugins)
}
