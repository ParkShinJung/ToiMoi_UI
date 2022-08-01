const modal = {
  state: {
    registSalesChannelProductModal: {
      show: false
    },
    modifySalesChannelProductModal: {
      show: false
    },
    productInfoModal: {
      show: false
    },
    productSelectModal: {
      show: false
    },
    salesChannelSelectModal: {
      show: false
    },
    addSalesChannelToPartner: {
      salesChannel: {}
    }
  },
  mutations: {
    SHOW_REGIST_SALES_CHANNEL_PRODUCT_MODAL: (state, show) => {
      state.registSalesChannelProductModal.show = show
    },
    SHOW_MODIFY_SALES_CHANNEL_PRODUCT_MODAL: (state, show) => {
      state.modifySalesChannelProductModal.show = show
    },
    SHOW_PRODUCT_INFO_MODAL: (state, show) => {
      state.productInfoModal.show = show
    },
    SHOW_PRODUCT_SELECT_MODAL: (state, show) => {
      state.productSelectModal.show = show
    },
    SHOW_SALES_CHANNEL_SELECT_MODAL: (state, show) => {
      state.salesChannelSelectModal.show = show
    },
    ADD_SALES_CHANNEL_TO_PARTNER: (state, salesChannel) => {
      state.addSalesChannelToPartner.salesChannel = salesChannel
    }
  },
  actions: {
    showRegistSalesChannelProductModal({ commit }, show) {
      commit('SHOW_REGIST_SALES_CHANNEL_PRODUCT_MODAL', show)
    },
    showModifySalesChannelProductModal({ commit }, show) {
      commit('SHOW_MODIFY_SALES_CHANNEL_PRODUCT_MODAL', show)
    },
    showProductInfoModal({ commit }, show) {
      commit('SHOW_PRODUCT_INFO_MODAL', show)
    },
    showProductSelectModal({ commit }, show) {
      commit('SHOW_PRODUCT_SELECT_MODAL', show)
    },
    showSalesChannelSelectModal({ commit }, show) {
      commit('SHOW_SALES_CHANNEL_SELECT_MODAL', show)
    },
    addSalesChannelToPartner({ commit }, salesChannel) {
      commit('ADD_SALES_CHANNEL_TO_PARTNER', salesChannel)
    }
  }
}

export default modal
