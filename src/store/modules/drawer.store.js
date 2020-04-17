const state = {
  drawerActive: false
}


const mutations = {
  SET_DRAWER_ACTIVE(state, payload = null) {
    state.drawerActive = payload
  }
}

const actions = {
  toggle ({ state, commit }) {
    commit('SET_DRAWER_ACTIVE', !state.drawerActive)
  }
}

export { state, mutations, actions }
