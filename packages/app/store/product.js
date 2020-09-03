import * as api from '../api/queries/product'

const product = {
  namespaced: true,
  state: () => ({
    products: [],
    product: null,
    limit: 5,
    offset: 0,
    count: 0,
    page: 0,
    pageLength: 0
  }),
  getters: {
    products (state) { return state.products },
    product (state) { return state.product },
    limit (state) { return state.limit },
    offset (state) { return state.offset },
    count (state) { return state.count },
    page (state) { return state.page + 1 },
    pageLength (state) { return Math.ceil(state.count / state.limit) }
  },
  mutations: {
    PRODUCTS_CHANGED (state, products) { state.products = products },
    PRODUCT_CHANGED (state, product) { state.product = product },
    LIMIT_CHANGED (state, limit) { state.limit = limit },
    OFFSET_CHANGED (state, offset) { state.offset = offset },
    COUNT_CHANGED (state, count) { state.count = count },
    PAGE_CHANGED (state, page) { state.page = page }
  },
  actions: {
    async list ({ state, commit, dispatch },
      { limit = state.limit, offset = state.offset } = {}) {
      commit('LOADING_CHANGED', true, { root: true })
      try {
        const { count, items } = await api.list({
          limit, offset
        })
        commit('PRODUCTS_CHANGED', items)
        commit('COUNT_CHANGED', count)
      } catch (err) {
        commit('ERROR_CHANGED', err, { root: true })
        dispatch('setError', err, { root: true })
      } finally {
        commit('LOADING_CHANGED', false, { root: true })
      }
    },
    async get ({ commit, dispatch }, productId) {
      commit('LOADING_CHANGED', true, { root: true })
      try {
        const product = await api.get({ productId })
        commit('PRODUCT_CHANGED', product)
      } catch (err) {
        commit('ERROR_CHANGED', err, { root: true })
        dispatch('setError', err, { root: true })
      } finally {
        commit('LOADING_CHANGED', false, { root: true })
      }
    },
    async create ({ state, commit, dispatch }, input) {
      commit('LOADING_CHANGED', true, { root: true })
      try {
        await api.create({ input })
        dispatch('list', {
          limit: state.limit,
          offset: state.offset
        })
      } catch (err) {
        commit('ERROR_CHANGED', err, { root: true })
        dispatch('setError', err, { root: true })
      } finally {
        commit('LOADING_CHANGED', false, { root: true })
      }
    },
    jumpPage ({ state, commit, dispatch }, page) {
      const offset = page !== 1
        ? (page * state.limit) - state.limit
        : 0
      dispatch('listLawyers', {
        limit: state.limit,
        offset
      })
      commit('OFFSET_CHANGED', offset)
    },
    changePage ({ state, commit, dispatch }, next) {
      const offset = next
        ? state.offset + state.limit
        : state.offset - state.limit
      dispatch('listLawyers', {
        limit: state.limit,
        offset
      })
      commit('OFFSET_CHANGED', offset)
    }
  }
}

export default product
