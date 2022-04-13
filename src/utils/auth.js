// 使用 Local Storage 替换 cookie
import {Storages} from "@/utils/index"

const TokenKey = 'token'

export function getToken() {
  return Storages.get(TokenKey)
}

export function setToken(token) {
  return Storages.set(TokenKey, token)
}

export function removeToken() {
  return Storages.remove(TokenKey)
}

export function setUserName(username) {
  return Storages.set('userName', username)
}

export function getUserName() {
  return Storages.get('userName')
}

export function setUserAvatar(url) {
  return Storages.set('userAvatar', url)
}

export function getUserAvatar() {
  return Storages.get('userAvatar')
}

export function removeUserName() {
  return Storages.remove('userName')
}

export function setUserId(username) {
  return Storages.set('userId', username)
}

export function getUserId() {
  return Storages.get('userId')
}

export function removeUserId() {
  return Storages.remove('userId')
}
