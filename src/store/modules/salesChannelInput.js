const salesChannelInput = {
  state: {
    treeStore: []
  },
  mutations: {
    updateTreeStore(state, newTree) {
      state.treeStore = newTree
    }
  },
  actions: {
    updateTree(context, tree) {
      context.commit('updateTreeStore', tree)
    }
  }
}

export default salesChannelInput
