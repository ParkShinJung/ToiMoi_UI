import request from '@/utils/request'

export function registerAccount(params) {
  console.log('register account')
  return request.post('/accounts', params)
}

export function modifyAccount(params) {
  return request.put('/accounts/' + params.accountId, params)
}

export function modifyAccountFirstPassword(params) {
  return request.put('/accounts/firstLogin/' + params.accountId, params)
}

export function getFarms(params) {
  const url = 'farmlog/farms'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}

export function getTests(params) {
  const url = 'account/member'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}
