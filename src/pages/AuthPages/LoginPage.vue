<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>{{ $tc('login') }}</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="username"
                :label="$tc('username')"
                prepend-icon="person"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              />

              <v-text-field
                v-model="password"
                :label="$tc('password')"
                prepend-icon="lock"
                :append-icon="showPwd ? 'visibility' : 'visibility_off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
              <v-row class="my-1 mx-1">
                <a @click="$router.push({ name: 'forgot_password' })" class="blue--text">{{ `${$tc('forgot_pwd')} ?` }}</a>
                <v-spacer/>
                <v-btn type="submit" color="primary">{{ $tc('login') }}</v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    showPwd: false
  }),
  computed: {
    username: {
      get () {
        return this.$store.state.auth.username
      },
      set (val) {
        return this.$store.commit('auth/SET_USERNAME', val)
      }
    },
    password: {
      get () {
        return this.$store.state.auth.password
      },
      set (val) {
        return this.$store.commit('auth/SET_PASSWORD', val)
      }
    },
    // ERRORS
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push(this.$t('$validation.required'))
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('$validation.required'))
      return errors
    }
  },
  validations () {
    const validations = {}
    
    // const validEmail = value => {
    //   if (!value) return true
    //   let expression = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/g
    //   return expression.test(value)
    // }
    validations.username = {
      required,
    },
    validations.password = {
      required
    }
    return validations
  },
  methods: {
    submit () {
      this.$store.commit('auth/SET_IS_LOGGED', true)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
