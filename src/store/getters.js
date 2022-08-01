const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  reload: state => state.app.reload,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  langLoad: state => state.app.language,
  menu: state => state.app.menu,
  activeMenu: state => state.app.activeMenu,
  linkedProduct: state => state.app.linkedProduct,
  formEventName: state => state.app.formEventName.name,
  farm: state => state.app.farm
}
export default getters
