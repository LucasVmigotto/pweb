<template>
  <v-col
    class="mx-2"
    cols="4"
  >
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
      <v-card-action>
        <v-btn
          color="primary"
          @click="moreInfo"
        >
          <v-icon>mdi-plus</v-icon> Info
        </v-btn>
        <v-btn
          color="primary"
          @click="toCart"
        >
          <v-icon>mdi-plus</v-icon> Info
        </v-btn>
      </v-card-action>
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
    moreInfo () {},
    toCart () {

    }
  }
}
</script>
