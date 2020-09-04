<template>
  <v-col cols="4">
    <v-card>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ product.title }}</v-card-title>
      </v-img>
      <v-card-text>
        <span
          class="d-inline-block text-truncate"
          style="max-width: 20em;"
        >
          {{ product.description }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    x-large
                    icon
                    color="primary"
                    v-on="on"
                    @click="toCart"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Adicionar no carrinho</span>
              </v-tooltip>
            </v-col>
            <v-col cols="3">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    x-large
                    icon
                    color="green"
                    v-on="on"
                    @click="moreInfo"
                  >
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                </template>
                <span>Mais informações</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    moreInfo () {
      this.$emit('info', this.product.productId)
    },
    toCart () {
      this.$emit('cart', this.product.productId)
    }
  }
}
</script>
