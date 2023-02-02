import Pagination from '@/components/Pagination/index.vue'
import TableBase from '@/components/Table.vue'
import Treeselect from '@riophae/vue-treeselect'
import ElementUI from 'element-ui'

import zhLang from 'element-ui/lib/locale/lang/zh-CN'; // 引入官方的中文国际化
import locale from '@/assets/locale/cn'; // 引入自己的

export default function performLoader(Vue) {
  ////////////////////////////////////////////////////////////////////////
  // thirdparty component
  Vue.use(ElementUI, {
    locale: { ...zhLang, ...locale }, // 使用本地的 locale 去覆盖官方的 zhLang
  })

  ////////////////////////////////////////////////////////////////////////
  // self component
  function plugins(Vue) {
    Vue.component('Pagination', Pagination)
    Vue.component('TableBase', TableBase)
    Vue.component('Treeselect', Treeselect)

  }
  Vue.use(plugins)
}

