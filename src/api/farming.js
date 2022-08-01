import request from '@/utils/request'

export function getFertilizers(params) {
  const url = '/farmlog/farming/fertilizers'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}
// Post방식
export function registerFertilizers(params) {
  const url = '/farmlog/farming/fertilizers'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, params, config)
}

export function updateFertilizers(fertilizerId, params) {
  const url = '/farmlog/farming/fertilizers/' + fertilizerId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, params, config)
}

export function deleteFertilizers(fertilizerId) {
  const url = '/farmlog/farming/fertilizers/' + fertilizerId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}

export function getPesticides(params) {
  const url = '/farmlog/farming/pesticides'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  }
  return request.get(url, config)
}

export function registerPesticide(params) {
  const url = '/farmlog/farming/pesticides'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, params, config)
}

export function updatePesticide(pesticideId, params) {
  const url = '/farmlog/farming/pesticides/' + pesticideId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, params, config)
}

export function deletePesticide(pesticideId) {
  const url = '/farmlog/farming/pesticides/' + pesticideId
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}
