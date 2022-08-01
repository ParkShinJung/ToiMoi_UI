import authRequest from '../../http/module/authRequest'
import request from '@/http/module/request'
// import cookie from '@/utils/cookie'

export function login(username, password) {
  const url = '/oauth/token'
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
    }
  }
  const formData = new FormData()
  formData.append('grant_type', 'password')
  formData.append('username', username)
  formData.append('password', password)
  formData.append('scope', 'read')

  return authRequest.post(url, formData, config)
}

export function getUserInfo(token) {
  const url = '/oauth/check_token'

  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
    }
  }

  const formData = new FormData()
  formData.append('token', token)

  return authRequest.post(url, formData, config)
}

export function getUserInfoDetail(adminId) {
  // const url = '/account'

  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     'Authorization': 'Bearer ' + cookie.getCookie('Admin-Token')
  //   }
  // }

  return request({
    url: '/accounts/info/' + adminId,
    method: 'get'
  })
}
