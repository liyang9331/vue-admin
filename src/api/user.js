import request from '@/utils/request';
// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url:'/sysUser/getUserInfo',
    method:'post',
    ...arguments
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
