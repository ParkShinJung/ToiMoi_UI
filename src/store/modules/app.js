import Cookies from 'js-cookie'
// import de from 'element-ui/src/locale/lang/de'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'ko',
    size: Cookies.get('size') || 'medium',
    reload: new Date(),
    menu: Cookies.get('menu'),
    activeMenu: 'AGENCY',
    linkedProduct: {},
    formEventName: '',
    farm: Cookies.get('farm'),
    farmSelector: {
      show: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      if (device === 'mobile') {
        // state.opened = false
        state.sidebar.opened = false
        Cookies.set('sidebarStatus', false)
      } else {
        state.sidebar.opened = true
        Cookies.set('sidebarStatus', true)
      }
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    RELOAD_INIT: (state, reload) => {
      state.reload = reload
    },
    SET_MENU: (state, menu) => {
      state.reload = menu
    },
    SET_ACTIVE_MENU: (state, activeMenu) => {
      state.reload = activeMenu
    },
    SET_LINKED_PRODUCT: (state, linkedProduct) => {
      state.linkedProduct = linkedProduct
    },
    SET_FORM_EVENT_NAME: (state, formEventName) => {
      state.formEventName = formEventName
    },
    SET_FARM: (state, farm) => {
      state.farm = farm
    },
    SET_FARM_SELECTOR: (state, show) => {
      state.farmSelector.show = show
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      console.log('CloseSideBar')
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    reloadInit({ commit }, reload) {
      commit('RELOAD_INIT', reload)
    },
    setMenu({ commit }, menu) {
      console.log('setMenu')
      Cookies.set('menu', menu)
      commit('SET_MENU', menu)
    },
    setActiveMenu({ commit }, activeMenu) {
      Cookies.set('activeMenu', activeMenu)
      commit('SET_ACTIVE_MENU', activeMenu)
    },
    setSideMenu({ commit }) {
      console.log('-- side menu --')
      let roles = Cookies.get('partnerRole')
      if (roles) {
        roles = JSON.parse(roles)
        // 활성화 메뉴 세팅
        let currentMenu = ''
        if (roles.indexOf('') > -1 || roles.indexOf('')) {
          currentMenu = 'AGENCY'
        } else if (roles.indexOf('') > -1) {
          currentMenu = 'SUPPLIER'
        }
        Cookies.set('activeMenu', currentMenu)
        commit('SET_ACTIVE_MENU', currentMenu)
        // 메뉴 구성
        const menu = roles.sort().filter(role => role === 'AGENCY' || role === 'SUPPLIER')
        Cookies.set('menu', menu)
        commit('SET_MENU', menu)
      } else {
        roles = []
      }
    },
    setLinkedProduct({ commit }, linkedProduct) {
      commit('SET_LINKED_PRODUCT', linkedProduct)
    },
    setFormEventName({ commit }, formEventName) {
      commit('SET_FORM_EVENT_NAME', formEventName)
    },
    setFarm({ commit }, farm) {
      commit('SET_FARM', farm)
    },
    setFarmSelector({ commit }, show) {
      commit('SET_FARM_SELECTOR', show)
    }
  }
}

export default app
