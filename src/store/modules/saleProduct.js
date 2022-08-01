const saleProduct = {
  state: {
    selectedOptionIndex: -1
  },
  mutations: {
    SELECT_OPTION: (state, index) => {
      state.selectedOptionIndex = index
    }
  },
  actions: {
    selectOption({ commit }, index) {
      commit('SELECT_OPTION', index)
    }
  }
}

export default saleProduct
