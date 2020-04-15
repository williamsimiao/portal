const request = require('superagent')

export const state = {
  username: null || sessionStorage.getItem('username'),
  password: null,
  isLogged: !!sessionStorage.getItem('authToken')
}

export const mutations = {
  SET_USERNAME (state, payload = null) {
    state.username = payload
  },
  SET_PASSWORD (state, payload = null) {
    state.password = payload
  },
  SET_IS_LOGGED (state, payload = false) {
    state.isLogged = payload
  },
  CLEAR_AFTER_LOGIN (state) {
    state.password = null
  },
  CLEAR_LOGGED_USER (state) {
    state.username = null
    state.email = null
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('authToken')
  },
}

export const actions = {
  async doLogin ({ commit }) {
    const body = {
      email: state.email,
      password: state.password
    }
    const url = process.env.VUE_APP_API_BASE + '/login'
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .send(body)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          commit('SET_IS_LOGGED', true)
          commit('SET_AVATAR_URL')
          commit('SET_LOGGED_USER', {
            email: state.email,
            authToken: res.body.token,
          })
          commit('CLEAR_AFTER_LOGIN')
          return resolve(res.body)
        })
    })
  },
  async doLogout ({ commit }) {
    const url = process.env.VUE_APP_API_BASE + '/logout'
    return new Promise((resolve, reject) => {
      let headers = { Authorization: `${sessionStorage.getItem('authToken')}` }
      request
        .post(url)
        .set(headers)
        .send({})
        .end((err) => {
          if (err) {
            return reject(err)
          }
          commit('SET_IS_LOGGED', false)
          commit('CLEAR_LOGGED_USER')
          return resolve()
        })
    })
  },
  async doSignUp ({ username, password }) {
    const url = process.env.VUE_APP_API_BASE + '/sign_up'
    const body = {
      username,
      password
    }
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .send(body)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }
          return resolve(res.body)
        })
    })
  },
}
