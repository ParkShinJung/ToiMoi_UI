import { login, getUserInfo, getUserInfoDetail } from '@/http/api/login'
import cookie from '@/utils/cookie'
import { refreshToken } from '@/utils/token'
import i18n from '@/lang'
// import Cookies from 'js-cookie'

const user = {
  state: {
    token: cookie.getCookie('Admin-Token'),
    name: '',
    roles: []
  },

  // 브라우저에 Token, 이름, 권한 등을 설정하는 함수
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 로그인 API 발송하고 응답으로 받은 Token을 쿠키와 브라우저에 저장합니다.
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          const expiresDate = data.expires_in / 86400
          cookie.setCookie('Admin-Token', data.access_token, expiresDate)
          cookie.setCookie('refresh-token', data.refresh_token, expiresDate)
          commit('SET_TOKEN', data.access_token)
          console.log('login refresh token')
          refreshToken()
          resolve()
        }).catch(error => {
          // reject(error.response.data.message)
          reject(error)
        })
      })
    },
    // 로그아웃하며 쿠키에 저장된 Token과 브라우저에 저장된 Token, 이름, 권한을 제거합니다.(서버통신 X)
    // 이상적으로는 서버와 통신하여 서버에서도 Token을 강제 만료시켜야 합니다.
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ROLES', [])

        cookie.removeCookie('Admin-Token')
        cookie.removeCookie('expires-at')
        cookie.removeCookie('refresh-token')
        cookie.removeCookie('userName')
        cookie.removeCookie('userAuth')
        cookie.removeCookie('farms')
        cookie.removeCookie('userId')
        cookie.removeCookie('activeMenu')

        resolve()
      })
    },
    // Token 정보 조회를 하여 고객의 이름과 권한정보를 습득합니다.
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const token = cookie.getCookie('Admin-Token')
        getUserInfo(token).then(response => {
          const data = response
          // console.log(data)
          if (!data) {
            reject(new Error('error[getUserInfo] response Data'))
          }
          // Token 조회 결과로 권한은 반드시 있어야 합니다. (authorities 배열)
          if (data.authorities && data.authorities.length > 0) {
            const authorities = []
            for (var i = 0; i < data.authorities.length; i++) {
              authorities.push(data.authorities[i])
            }
            commit('SET_ROLES', authorities)

            data.roles = authorities
          } else {
            reject(i18n.t('error.empty_roles'))
          }

          commit('SET_NAME', data.user_name)

          // 사용자 상세 정보 가져오기
          getUserInfoDetail(data.user_name).then(response => {
            console.log(response)
            cookie.setCookie('userId', response.accountId)
            cookie.setCookie('userName', response.accountName)
            cookie.setCookie('userAuth', response.roles)
            cookie.setCookie('farms', JSON.stringify(response.farms))

            // 사이드 메뉴 세팅
            const roles = response.roles
            if (roles.length > 0) {
              // 메뉴 구성
              // const menuType = {
              //   AGENCY_ADMIN: 'AGENCY',
              //   SYSTEM_ADMIN: 'AGENCY',
              //   SUPPLIER_ADMIN: 'SUPPLIER'
              // }
              // const menu = Array.from(new Set(roles.filter(role => menuType[role] !== undefined).map(role => menuType[role]))).sort()
              // // console.log('menu 결과 : ', menu)
              // if (Cookies.get('activeMenu') === undefined || Cookies.get('activeMenu') === '') {
              //   const currentMenu = menu.sort()[0]
              //   // console.log('currentMenu 결과 : ', currentMenu)
              //
              //   Cookies.set('activeMenu', currentMenu)
              // }
              //
              // Cookies.set('menu', menu)
            } else {
              cookie.setCookie('menu', [])
              cookie.setCookie('activeMenu', '')
            }
            resolve(data)
          }).catch(error => {
            reject(error.response.data.message)
          })
        }).catch(error => {
          reject(error.response.data.message)
        })
      })
    }
  }
}

export default user
