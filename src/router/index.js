import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'
// import alarmLayout from '@/views/application/alarm/index.vue'

// 所有权限通用路由表
export const constantRouterMap = [
  /* 刷新 */
  {
    path: '/refresh',
    component: () => import('@/views/refresh/index'),
    hidden: true
  },
  /* 登录 */
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/resources',
    component: Layout,
    redirect: '/resources/algorithm',
    name: 'resources',
    meta: { title: '资源管理', icon: 'databoard' },
    children: [
      {
        path: 'algorithm',
        name: 'algorithm',
        component: () => import('@/views/resources/algorithm/index'),
        meta: { title: '算法模型管理', icon: 'dataOverview' }
      },
      {
        path: 'equipment',
        name: 'equipment',
        component: () => import('@/views/resources/equipment/index'),
        meta: {
          title: '设备信息管理',
          icon: 'equipmentSvg'
        }
      }
    ]
  },
  {
    path: '/dispatch',
    component: Layout,
    redirect: '/dispatch/taskScheduling',
    name: 'dispatch',
    meta: { title: '调度管理', icon: 'databoard' },
    children: [
      {
        path: 'taskScheduling',
        name: 'taskScheduling',
        component: () => import('@/views/dispatch/taskScheduling/index'),
        meta: {
          title: '任务调度管理',
          icon: 'equipmentSvg'
        }
      },
      {
        path: 'resultsEnforcement',
        name: 'resultsEnforcement',
        component: () => import('@/views/dispatch/resultsEnforcement/index'),
        meta: {
          title: '执行结果管理',
          icon: 'equipmentSvg'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/region',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/system/region/index'),
        meta: {
          title: '区域管理',
          icon: 'organization'
        }
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/system/organization/index'),
        meta: {
          title: '账号管理',
          icon: 'organization'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index'),
        meta: {
          title: '角色管理',
          icon: 'role'
        }
      },
      {
      /**
         * 可见模块配置是内部权限，客户没有权限，用来做为动态模块集成使用
         */
        path: 'visibleModule',
        name: 'visibleModule',
        component: () => import('@/views/system/visibleModule/index'),
        meta: {
          title: '可见模块配置',
          icon: 'cloud'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

// 创建基础路由表函数
const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  mode: 'hash',
  // base:"",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// 将创建基础路由表函数赋予 router
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
