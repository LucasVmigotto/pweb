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
    <v-btn
      class="mt-9"
      color="primary"
      @click="addDialog = true"
    >
      Não tem cadastro? Registre-se!
    </v-btn>
    <user-add
      :dialog="addDialog"
      @save="addUser"
      @close="addDialog = false"
    />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserAdd from '../components/UserAdd'

export default {
  components: { UserAdd },
  layout: 'login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    addDialog: false,
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
    ...mapActions([
      'pushMessage'
    ]),
    ...mapActions('user', [
      'login',
      'create'
    ]),
    subbmitLogin () {
      this.login({
        input: {
          email: this.email,
          password: this.password
        }
      }).then((res) => {
        this.$router.push({ name: 'index' })
      }).catch((err) => {
        throw new Error(err)
      })
    },
    addUser (user) {
      this.addDialog = false
      this.create(user)
        .then((res) => {
          this.pushMessage({
            type: 'success',
            text: 'Seu cadastro foi realizado com sucesso!'
          })
          this.$router.push({ name: 'index' })
        })
    }
  }
}
</script>
