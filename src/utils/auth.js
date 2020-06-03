import Cookies from 'js-cookie'

const Token = '0' // 特别注意 这里的定义的token 不能是空 必须要有字段 可以是任意数字或者字母等

export function getToken() {
  return Cookies.get('Token')
}

export function setToken(token) {
  // console.log(token)
  return Cookies.set('Token', token)
}

export function removeToken() {
  // console.log('清除token 的方法')
  return Cookies.remove('Token')
}
