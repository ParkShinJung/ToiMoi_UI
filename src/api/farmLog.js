import request from '@/utils/request'

export function getFarmLogByFarmLogId(farmLogId) {
  const url = `/farmlog/log/${farmLogId}`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function getFarmList(accountId) {
  const url = '/farms/' + accountId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function getFarmInfo(farmName) {
  const url = '/farms/' + farmName
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function getFarmLogCalData(farmId, month) {
  const url = 'farmlog/log/cal/' + farmId + '/' + month
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function getFarmLogDataByPeriods(farmId, params) {
  const url = 'farmlog/log/farm/' + farmId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}

export function getPlantationByFarmId(farmId) {
  const url = '/farmlog/plantation/selector/' + farmId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {}
  }
  return request.get(url, config)
}

export function getPlantationByPlantationId(plantationId) {
  const url = '/farmlog/plantation/' + plantationId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {}
  }
  return request.get(url, config)
}
