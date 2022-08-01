import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // 서버 도메인 설정
  baseURL: process.env.BASE_API,
  // 요청 타임아웃 시간 설정
  timeout: 30000
})

// HTTP 요청 인터셉터
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// HTTP 응답 인터셉터
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
