<template>
  <v-dialog
    v-model="dialog"
    width="50em"
    persistent
  >
    <v-card>
      <v-card-title>
        {{ product.title }}
        <v-spacer />
        <v-btn
          large
          icon
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="7">
            <v-img
              :aspect-ratio="16/9"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            />
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-col cols="12">
                {{ product.description }}
              </v-col>
              <v-col
                class="price"
                cols="12"
              >
                R$ {{ product.price }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="mb-4 mr-4"
          color="green"
          @click="cart"
        >
          <v-icon>mdi-cart-plus</v-icon> Adicionar no carrinho
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters('product', [
      'product'
    ])
  },
  methods: {
    close () {
      this.$emit('close')
    },
    cart () {
      this.$emit('cart', this.product.productId)
    }
  }
}
</script>
<style>
.price {
  font-size: 2rem;
}
</style>
