import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta:{title:"登录"},
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    meta:{title:"404"},
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据看板', icon: 'homePage'}
    }]
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: '/onitoring',
    name: 'alarm',
    meta: { title: '智能分析', icon: 'alarm' },
    children: [
      {
        path: 'onitoring',
        name: 'onitoring',
        component: () => import('@/views/analysis/onitoring/index'),
        meta: { title: '实时监控' }
      },
      {
        path: 'waring',
        name: 'waring',
        component: () => import('@/views/analysis/waring/index'),
        meta: { title: '历史告警' }
      },
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/add',
    name: 'Setting',
    meta: { title: '设备管理', icon: 'setting' },
    children: [
      {
        path: 'add',
        name: 'settingAdd',
        component: () => import('@/views/setting/add/index'),
        meta: { title: '手动添加配置' }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/dashboard',
    name: 'monitor',
    meta: { title: '工单管理', icon: 'system' },
    children: [
      {
        path: 'leakageCable',
        name: '工单管理',
        component: () => import('@/views/monitor/leakageCable/index'),
        meta: { title: '工单管理' }
      },
    ]
  },
  {
    path: '/maintain',
    component: Layout,
    redirect: '/maintain/oneself',
    name: 'Maintain',
    meta: { title: '系统管理', icon: 'maintain' },
    children: [
      {
        path: 'parameter',
        name: 'MaintainParameter',
        component: () => import('@/views/maintain/parameter/index'),
        meta: { title: '设备告警参数设置' }
      }
    ]
  },
  {
    path: '/history',
    component: Layout,
    redirect: '/history/leakyCableStatus',
    name: 'History',
    meta: { title: '授权管理', icon: 'history' },
    children: [
      {
        path: 'leakyCableStatus',
        name: 'leakyCableStatus',
        component: () => import('@/views/history/leakyCableStatus/index.vue'),
        meta: { title: '授权管理' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeResolve((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
