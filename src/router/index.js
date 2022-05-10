import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/application',
    component: Layout,
    redirect: '/application/monitoring',
    name: 'application',
    meta: { title: '应用中心', icon: 'table' },
    children: [
      {
        path: 'monitoring',
        name: 'monitoring',
        component: () => import('@/views/application/template/index'),
        meta: { title: '实时监控', icon: 'dashboard' }
      },
      {
        path: 'electronicMap',
        name: 'electronicMap',
        component: () => import('@/views/application/template/index'),
        meta: { title: '电子地图', icon: 'dashboard' }
      },
      {
        path: 'videoBack',
        name: 'videoBack',
        component: () => import('@/views/application/video-back/index'),
        meta: { title: '录像回放', icon: 'dashboard' }
      },
      {
        path: 'alarm',
        name: 'alarm',
        component: () => import('@/views/application/template/index'),
        meta: { title: '告警管理', icon: 'dashboard' }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/application/template/index'),
        meta: { title: '工单管理', icon: 'dashboard' }
      },
      {
        path: 'cloudLibrary',
        name: 'cloudLibrary',
        component: () => import('@/views/application/template/index'),
        meta: { title: '云端库', icon: 'dashboard' }
      },
    ]
  },

  {
    path: '/configure',
    component: Layout,
    redirect: '/configure/region',
    name: 'configure',
    meta: { title: '配置中心', icon: 'table' },
    children: [
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/configure/template/index'),
        meta: { title: '区域管理', icon: 'table' }
      },
      {
        path: 'equipment',
        name: 'equipment',
        component: () => import('@/views/configure/template/index'),
        meta: { title: '设备管理', icon: 'tree' }
      },
      {
        path: 'mapping',
        name: 'mapping',
        component: () => import('@/views/configure/template/index'),
        meta: { title: '地图绘制', icon: 'tree' }
      },
      {
        path: 'label',
        name: 'label',
        component: () => import('@/views/configure/template/index'),
        meta: { title: '标签管理', icon: 'tree' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '电视墙配置', icon: 'tree' }
      // },
      {
        path: 'alarmConfiguration',
        name: 'alarmConfiguration',
        component: () => import('@/views/configure/template/index'),
        meta: { title: '告警配置', icon: 'tree' }
      },
      {
        path: 'cloudStorage',
        name: 'cloudStorage',
        component: () => import('@/views/configure/template/index'),
        meta: { title: '云存储配置', icon: 'tree' }
      },
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu',
    name: 'Nested',
    meta: { title: '运维中心', icon: 'nested'},
    children: [
      {
        path: 'menu',
        component: () => import('@/views/nested/template/index'), // Parent router-view
        name: 'Menu',
        meta: { title: 'Menu' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/template/index'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
        ]
      }
    ]
  },
  // 默认打开路由
  { path: '*', redirect: '/application/monitoring', hidden: true },
  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
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

export default router
