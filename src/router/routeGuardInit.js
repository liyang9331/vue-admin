/**
 * 初始化路由守卫
 * @param {Object} router
 */
// import { Storages } from '@/utils/storage'
import store from '@/store'
export function routerGuardInit(router) {
  // 全局前置守卫
  router.beforeEach((to, from, next) => {
    /* 必须调用 `next` */
    if (store.getters.token) { // 判断是否有token
      if (to.path === '/') {
        next({ path: '/resources' })
      } else if (to.path === '/login') {
        next({ path: '/' })
      } else if (store.getters.addRouters.length === 0) {
        // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        // 拉取用户路由表
        store.dispatch('permission/GetUserMenu').then(res => {
          const roles = res.data
          // 生成可访问的路由表
          store.dispatch('permission/GenerateRoutes', { roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // hack方法 确保addRoutes已完成
            next({ ...to, replace: true })
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        next()
      }
    } else {
      // 重定向到登录页
      to.path === '/login' ? next() : next('/login')
    }
  })
  // 全局解析守卫
  router.beforeResolve((to, from, next) => {
    /* 必须调用 `next` */
    // console.log(to, 'beforeResolve')
    next()
  })
  // 全局后置钩子
  router.afterEach((to, from) => {
    // 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
  })
}

/**
 *
 * @param {Object} route
 * @param {Object} self 上下文
 * @param {Function} callback
 */
export function topbarFilter(params, callback) {
  const { route, self } = params
  if (route.path.includes('configure') === true) {
    if (store.getters.userInfo.status === 1) {
      console.log('topbarFilter 已经授权')
      // 已经授权
      callback()
    } else {
      console.log('topbarFilter 未授权')
      // 未授权
      self.$refs.topMenu.activeIndex = '/' + self.$route.path.split('/')[1]
    }
  } else {
    callback()
  }
}
