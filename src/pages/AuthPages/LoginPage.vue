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
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                :label="$tc('username')"
                name="login"
                prepend-icon="person"
                type="text"
              />

              <v-text-field
                :label="$tc('password')"
                name="password"
                prepend-icon="lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">Login</v-btn>
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

  }),
  computed: {

  },
  validations () {
    const validations = {}
    
    const validEmail = value => {
      if (!value) return true
      let expression = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/g
      return expression.test(value)
    }
    validations.email = {
      required,
      validEmail
    },
    validations.password = {
      required
    }
    return validations
  },
}
</script>
