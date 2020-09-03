<template>
  <v-app>
    <v-card>
      <v-card-title>PWEB Store</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="email"
            :rules="[ rules.required, rules.validMail ]"
            label="E-mail"
            hint="username@email.com"
            prepend-icon="mdi-account"
            clearable
          />
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[ rules.required ]"
            prepend-icon="mdi-lock"
            label="Senha"
            hint="******"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          large
          block
          color="primary"
          :disabled="invalidForm"
          :loading="loading"
          @click="subbmitLogin"
        >
          Log in<v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    rules: {
      required: value => !!value || 'Campo obrigatório',
      validMail: value => !!value
        .match(/^[\w\d]+@[\w\d]+(\.\w+)+$/) || 'O E-mail inserido é inválido'
    }
  }),
  computed: {
    ...mapGetters(['loading']),
    invalidForm () {
      return (
        !this.email ||
        !this.email.match(/^[\w\d]+@[\w\d]+(\.\w+)+$/) ||
        !this.password ||
        this.password.length < 7
      )
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    subbmitLogin () {
      this.login({
        input: {
          email: this.email,
          password: this.password
        }
      }).then((res) => {
        this.$router.push({ name: 'products' })
      }).catch((err) => {
        throw new Error(err)
      })
    }
  }
}
</script>
