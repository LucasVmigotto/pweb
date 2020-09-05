import * as api from '../api/queries/user'

const user = {
  namespaced: true,
  state: () => ({
    userLogged: null,
    token: null
  }),
  getters: {
    userLogged (state) { return state.userLogged },
    token (state) { return state.token }
  },
  mutations: {
    USER_LOGGED_CHANGED (state, userLogged) { state.userLogged = userLogged },
    TOKEN_CHANGED (state, token) { state.token = token }
  },
  actions: {
    async login ({ commit, dispatch }, login) {
      commit('LOADING_CHANGED', true, { root: true })
      try {
        const { token, user } = await api.login(login)
        commit('USER_LOGGED_CHANGED', user)
        commit('TOKEN_CHANGED', token)
        return !!token
      } catch (err) {
        commit('ERROR_CHANGED', err, { root: true })
        dispatch('setError', err, { root: true })
      } finally {
        commit('LOADING_CHANGED', false, { root: true })
      }
    },
    logout ({ commit }) {
      commit('USER_LOGGED_CHANGED', null)
    },
    async create ({ commit, dispatch }, input) {
      commit('LOADING_CHANGED', true, { root: true })
      try {
        const data = await api.create({ input })
        dispatch('login', {
          input: {
            email: data.email,
            password: input.password
          }
        })
      } catch (err) {
        commit('ERROR_CHANGED', err, { root: true })
        dispatch('setError', err, { root: true })
      } finally {
        commit('LOADING_CHANGED', false, { root: true })
      }
    },
    async update ({ commit, dispatch }, { userId, input }) {
      commit('LOADING_CHANGED', true, { root: true })
      try {
        await api.update({
          userId, input
        })
        dispatch('logout')
      } catch (err) {
        commit('ERROR_CHANGED', err, { root: true })
        dispatch('setError', err, { root: true })
      } finally {
        commit('LOADING_CHANGED', false, { root: true })
      }
    }
  }
}

export default user
