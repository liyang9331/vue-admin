import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCookies(from, time) {
  Cookies.set('userName', from.username, {
    expires: time
  })
  Cookies.set('userPwd', from.password, {
    expires: time
  })
}

export function removeCookies() {
  Cookies.remove('userName')
  Cookies.remove('userPwd')
}

export function setTheme(data) {
  if (data) {
    return Cookies.set('theme', data)
  } else {
    return Cookies.set('theme', 'black')
  }
}

export function getTheme() {
  return Cookies.get('theme')
}
