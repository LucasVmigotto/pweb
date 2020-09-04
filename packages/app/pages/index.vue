<template>
  <v-layout>
    <v-row>
      <product
        v-for="(item, index) in products"
        :key="index"
        :product="item"
        @cart="toCart"
        @info="moreInfo"
      />
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Product from '../components/Product'

export default {
  components: { Product },
  computed: {
    ...mapGetters('user', [
      'userLogged'
    ]),
    ...mapGetters('product', [
      'products'
    ])
  },
  created () {
    this.list()
  },
  methods: {
    ...mapActions(['pushMessage']),
    ...mapActions('product', [
      'list'
    ]),
    ...mapActions('cart', [
      'add'
    ]),
    moreInfo (productId) {},
    toCart (productId) {
      if (this.userLogged) {
        this.add(this.products
          .filter(el => el.product === productId)[0])
      } else {
        this.pushMessage({
          text: 'Faça login para adicionar ao seu carrinho',
          type: 'warning'
        })
      }
    }
  }
}
</script>
