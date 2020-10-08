<template>
  <v-layout>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Carrinho de compras
            <v-spacer />
            <v-tooltip
              v-if="cartCount > 0"
              top
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  x-large
                  v-on="on"
                  @click="empty"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Esvaziar carrinho</span>
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <v-list v-if="cartCount > 0">
              <v-list-item
                v-for="(item, index) in cart"
                :key="index"
              >
                <v-list-item-action>
                  <v-img
                    max-height="100"
                    max-width="50"
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  />
                </v-list-item-action>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <span
                    class="d-inline-block text-truncate"
                    style="max-width: 20em;"
                  >
                    {{ item.description }}
                  </span>
                </v-list-item-subtitle>
                <v-list-item-text>
                  <span>R$ {{ item.price }}</span>
                </v-list-item-text>
                <v-list-item-action>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        v-on="on"
                        @click="removeFromCart(index)"
                      >
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </template>
                    <span>Remover produto</span>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-row
              v-else
              justify="space-around"
            >
              <span class="emptyCart">
                Seus items aparecerão aqui
              </span>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', [
      'cart',
      'cartCount'
    ])
  },
  methods: {
    ...mapActions('cart', [
      'remove',
      'empty'
    ]),
    removeFromCart (id) {
      this.remove(id)
    }
  }
}
</script>
<style scoped>
.emptyCart {
  font-size: 2rem;
  font-weight: 700;
  border-bottom: .1em solid black;
  padding: .2em 0;
}
</style>
