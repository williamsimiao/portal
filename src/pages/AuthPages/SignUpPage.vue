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
            <v-toolbar-title>{{ $tc('crate_account') }}</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                :v-model="username"
                :label="$tc('username')"
                prepend-icon="person"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              />

              <v-text-field
                :v-model="password"
                :label="$tc('password')"
                prepend-icon="lock"
                type="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">{{ $tc('create') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    username: null,
    password: null
  }),
  computed: {
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
    
  }
}
</script>
