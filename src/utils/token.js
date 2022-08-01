import authRequest from '@/http/module/authRequest'
import cookie from '@/utils/cookie'
import store from '@/store'

let userActionTimeoutFunction

export function setLogoutSetTimeout(time) {
  userActionTimeoutFunction = setTimeout(() => {
    alert('고객님의 정보 보호를 위해 로그인 후 30분 동안 서비스이용이 없어 자동 로그아웃 되었습니다.')
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  }, time)
}

export function clearLogoutSetTimeout() {
  clearTimeout(userActionTimeoutFunction)
}

export function refreshToken() {
  // refresh token 이 없으면 refresh token을 요청하지 않는다.
  const refreshToken = cookie.getCookie('refresh-token')
  if (!refreshToken) {
    return false
  }
  const url = '/oauth/token'
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
    }
  }
  const formData = new FormData()
  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', refreshToken)
  formData.append('scope', 'read')

  authRequest.post(
    url,
    formData,
    config
  ).then(response => {
    // 토큰 만료 시간
    const now = new Date().getTime()
    const expiresDateVal = 60 * process.env.EXPIRE_MIN
    const expiresDate = expiresDateVal / 86400
    const expiresAt = now + (expiresDateVal * 1000)

    cookie.setCookie('Admin-Token', response.access_token, expiresDate)
    cookie.setCookie('refresh-token', response.refresh_token, expiresDate)
    cookie.setCookie('expires-at', expiresAt, expiresDate)
    // console.log('Token Refresh Success')
  }).catch(error => {
    console.log('Token Refresh Fail', error)
  })
}

export function refreshTokenTimer() {
  const now = new Date()
  const expirationDate = cookie.getCookie('expirationDate')
  let validity = expirationDate - now
  if (validity > (60 * 1000)) validity -= 5 * 60 * 1000
  // setTimeout(() => refreshToken(), validity)
}
