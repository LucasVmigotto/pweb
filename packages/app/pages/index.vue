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
    <product-viewer
      :dialog="viewerDialog"
      @close="viewerDialog = false"
      @cart="toCart"
    />
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Product from '../components/Product'
import ProductViewer from '../components/ProductViewer'

export default {
  components: {
    Product,
    ProductViewer
  },
  data: () => ({
    viewerDialog: false
  }),
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
      'list',
      'get'
    ]),
    ...mapActions('cart', [
      'add'
    ]),
    moreInfo (productId) {
      this.get(productId)
        .then((res) => {
          if (res && res.productId) {
            this.viewerDialog = true
          }
        })
    },
    toCart (productId) {
      this.viewerDialog = false
      if (this.userLogged) {
        this.add(this.products
          .filter(el => el.productId === productId)[0])
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
