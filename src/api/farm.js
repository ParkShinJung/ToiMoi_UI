import request from '@/utils/request'

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

export function getFarmsUser(params) {
  const url = 'farmlog/farms/user'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}

export function getFarmInfoById(farmId) {
  const url = '/farmlog/farms/' + farmId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function registrarFarmInfo(params) {
  const url = '/farm'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, params, config)
}
