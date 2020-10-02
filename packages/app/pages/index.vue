<template>
  <v-layout column>
    <v-row row class="px-4">
      <v-col cols="11">
        <v-text-field
          v-model="productName"
          :disabled="loading"
          placeholder="Nome do produto"
          prepend-icon="mdi-magnify"
        />
      </v-col>
      <v-col cols="1">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              :disabled="searchDisabled"
              :loading="loading"
              outlined
              fab
              icon
              v-on="on"
              @click="searchProducts"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </template>
          <span>Pesquisar</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row v-if="hasProducts">
      <product
        v-for="(item, index) in products"
        :key="index"
        :product="item"
        @cart="toCart"
        @info="moreInfo"
      />
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row column>
              <v-col cols="12">
                <v-icon large>
                  mdi-help-circle
                </v-icon>
                <span>Sem produtos para exibir no momento</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
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
    viewerDialog: false,
    productName: ''
  }),
  computed: {
    ...mapGetters([
      'loading'
    ]),
    ...mapGetters('user', [
      'userLogged'
    ]),
    ...mapGetters('product', [
      'products'
    ]),
    hasProducts () {
      return this.products && this.products.length > 0
    },
    searchDisabled () {
      return this.loading ||
        !this.productName ||
        this.productName.trim().length < 1
    }
  },
  created () {
    this.list()
  },
  methods: {
    ...mapActions(['pushMessage']),
    ...mapActions('product', [
      'list',
      'listByName',
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
    },
    async searchProducts () {
      await this.listByName({ name: this.productName })
    }
  }
}
</script>
