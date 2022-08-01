import request from '@/utils/request'

export function getEnvironmentLogCalData(farmId, month) {
  const url = 'farmlog/farm/log/environments/' + farmId + '/' + month
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
