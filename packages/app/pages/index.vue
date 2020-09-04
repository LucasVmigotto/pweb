<template>
  <v-layout>
    <v-row>
      <product
        v-for="(item, index) in products"
        :key="index"
        :product="item"
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
    ...mapGetters('product', [
      'products'
    ])
  },
  created () {
    this.list()
  },
  methods: {
    ...mapActions('product', [
      'list'
    ])
  }
}
</script>
