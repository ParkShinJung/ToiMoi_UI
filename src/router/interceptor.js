import router from '@/router'
import store from '@/store'
import i18n from '@/lang'
import { Message } from 'element-ui'
import cookie from '@/utils/cookie'

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// whiteList에 등록되어있는 페이지는 로그인 페이지로 리다이렉션 하지 않습니다.
const whiteList = ['/login', '/test', '/data/greenhouseEnvironment', '/data/cropPhysiology', '/data/nutrientManagement', '/data/measuredValue', '/data/report', '/farmLog/admin']

router.beforeEach((to, from, next) => {
  // TODO: route 무한 루프 해결을 위해 주석처리함, 차후 재확인 및 보완 필요
  // const roles = ['admin']
  // const roles = [cookie.getCookie('userAuth')]
  // store.dispatch('GenerateRoutes', { roles }).then(() => {
  //   router.addRoutes(store.getters.addRouters)
  //   next()
  // })
  if (cookie.getCookie('Admin-Token')) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 계정 권한정보가 없다면 정보조회 API를 호출하여 권한설정 및 메뉴설정까지 수행합니다.
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch((error) => {
          // Token 만료 및 변조로 인해 정보조회 중 오류가 발생할 경우, 로그아웃을 시키며 로그인 페이지로 이동합니다.
          store.dispatch('LogOut').then(() => {
            Message.error(error || i18n.t('error.invalid_token'))
            next({ path: '/' })
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({path: '/', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // whiteList에 없는 페이지는 모두 로그인 페이지로 리다이렉션
      // next(`/login?redirect=${to.path}`)
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  // router에서 페이지 이동할 때 마다 호출됨
})
