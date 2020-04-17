const state = {
  drawer: false
}


const mutations = {
  SET_DRAWER_ACTIVE(state, payload = null) {
    state.drawer = payload
  }
}

const actions = {
  toggle ({ state, commit }) {
    commit('SET_DRAWER_ACTIVE', !state.drawer)
  }
}

export { state, mutations, actions }
