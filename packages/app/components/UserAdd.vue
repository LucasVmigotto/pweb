<template>
  <v-dialog
    v-model="dialog"
    width="500px"
    persistent
  >
    <v-card>
      <v-card-title>
        Adicionar Usuário
        <v-spacer />
        <v-icon @click="close">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <span class="subtitle">Informações Pessoais:</span>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.name"
                :rules="[ rules.required, rules.name ]"
                prepend-inner-icon="mdi-account"
                label="Nome"
                hint="John Doe"
              />
            </v-col>
          </v-row>
          <v-divider class="my-4" />
          <span class="subtitle">Informações de Login:</span>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="user.email"
                prepend-inner-icon="mdi-email"
                :rules="[ rules.required, rules.email ]"
                label="E-Mail"
                hint="username@email.com"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="confirmEmail"
                :rules="[ rules.required, rules.email, sameEmail ]"
                label="Confirme o E-Mail"
                hint="username@email.com"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="user.password"
                :rules="[ rules.required, rules.password ]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-form-textbox-password"
                label="Senha"
                hint="*********"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="confirmPassword"
                :rules="[ rules.required, rules.password, samePassword ]"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Confirme a senha"
                hint="*********"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row no-gutters>
          <v-spacer />
          <v-col cols="4">
            <v-btn
              :disabled="invalid"
              color="primary"
              block
              @click="save"
            >
              Salvar <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showPassword: false,
      user: {
        name: '',
        email: '',
        password: ''
      },
      confirmEmail: '',
      confirmPassword: ''
    }
  },
  computed: {
    rules: () => ({
      required: value => !!value || 'Campo obrigatório',
      email: value => !!value.match(/^[\w\d]+@[\w\d]+(\.\w+)+$/) || 'E-mail deve ser válido',
      password: value => value.length > 6 || 'Senha deve ter no mínimo 6 caracteres'
    }),
    invalid () {
      if (!this.user.name || this.user.name.length < 4) {
        return true
      }
      if (!this.user.email ||
        this.user.email.length < 7 ||
        !this.user.email.match(/^[\w\d]+@[\w\d]+(\.\w+)+$/)) {
        return true
      }
      if (!this.user.password || this.user.password.length < 7) {
        return true
      }
      return false
    }
  },
  methods: {
    sameEmail (val) {
      return val === this.user.email ||
      'Email deve ser igual ao informado'
    },
    samePassword (val) {
      return val === this.user.password ||
      'Senha deve ser igual a informada'
    },
    save () {
      this.$emit('save', this.user)
      this.user = {
        name: '',
        email: '',
        password: ''
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
