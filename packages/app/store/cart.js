const cart = {
  namespaced: true,
  state: () => ({
    cart: []
  }),
  getters: {
    cart (state) { return state.cart },
    cartCount (state) { return state.cart.length }
  },
  mutations: {
    CART_CHANGED (state, cart) { state.cart = cart }
  },
  actions: {
    add ({ state, commit }, product) {
      commit('CART_CHANGED', [
        ...state.cart,
        product
      ])
    },
    remove ({ state, commit }, index) {
      commit('CART_CHANGED', state.cart
        .filter((_, position) => index !== position))
    },
    empty ({ commit }) {
      commit('CART_CHANGED', [])
    }
  }
}

export default cart
