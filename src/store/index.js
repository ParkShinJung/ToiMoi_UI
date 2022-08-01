import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import modal from './modules/modal'
import saleProduct from './modules/saleProduct'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tagsView,
    app,
    permission,
    user,
    modal,
    saleProduct
  },
  getters
})

export default store
