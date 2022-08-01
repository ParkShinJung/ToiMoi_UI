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

export function getAccountInfo(accountId) {
  return request({
    url: '/accounts/' + accountId,
    method: 'get'
  })
}

export function getCheckAccountInfo(accountId, params) {
  return request.post('/accounts/checkAccount/' + accountId, params)
}

export function deleteFarmOfUser(accountId, farmId) {
  const url = `/accounts/${accountId}/farm/${farmId}`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}
