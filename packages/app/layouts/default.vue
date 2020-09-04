<template>
  <v-app>
    <v-app-bar
      :clipped-left="true"
      fixed
      app
    >
      <v-app-bar-nav-icon>
        <v-icon>mdi-basket</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="userLogged">
        <v-avatar
          color="primary"
          size="36"
        >
          <span>{{ avatarInitials() }}</span>
        </v-avatar>
        <span>{{ userLogged.name }}</span>
        <v-badge
          :value="cartCount > 0"
          :content="cartCount"
          right
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </div>
      <div v-else>
        <v-btn
          color="primary"
          outlined
          @click="toLogin"
        >
          <v-icon>mdi-login-variant</v-icon>
          Faça Login
        </v-btn>
      </div>
      <v-progress-linear
        v-show="loading"
        :loading="loading"
        absolute
        bottom
      />
    </v-app-bar>
    <v-main>
      <v-container fluid>
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
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: 'PWEB Store',
      drawer: true,
      items: [
        {
          icon: 'mdi-package',
          title: 'Products',
          to: '/index'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'alertVisible',
      'messageText',
      'messageType',
      'loading'
    ]),
    ...mapGetters('user', [
      'userLogged'
    ]),
    ...mapGetters('cart', [
      'cartCount'
    ])
  },
  methods: {
    avatarInitials () {
      const words = this.userLogged.name.split(' ')
      const firstLetter = words[0].charAt(0)
      const lastLetter = words[words.length - 1].charAt(0)
      return `${firstLetter}${lastLetter}`
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
