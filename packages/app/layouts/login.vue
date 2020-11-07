<template>
  <v-app>
    <v-container mt-9>
      <v-alert
        v-model="alertVisible"
        :type="messageType"
        transition="slide-x-transition"
        elevation="9"
        border="right"
        class="front"
        colored-border
        absolute
      >
        {{ messageText }}
      </v-alert>
      <v-row
        justify="center"
        align="center"
      >
        <v-col cols="5">
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'alertVisible',
      'messageText',
      'messageType'
    ])
  }
}
</script>
