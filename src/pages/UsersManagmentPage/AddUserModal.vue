<template>
  <v-dialog v-model="dialog" @click:outside="closeModal" persistent scrollable max-width="600px">
    <v-card>
      <v-card-title>
        {{ $tc('add_user') }}
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="closeModal()" v-on="on">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>{{ $tc('close') }} </span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="username"
            :label="$tc('username')"
            :error-messages="usernameErrors"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          />

          <v-text-field
            v-model="password"
            :label="$tc('password')"
            :append-icon="showPwd ? 'visibility' : 'visibility_off'"
            :type="showPwd ? 'text' : 'password'"
            @click:append="showPwd = !showPwd"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          />

          <v-text-field
            v-model="repeatPassword"
            :label="$tc('repeat_password')"
            :append-icon="showRepeatPwd ? 'visibility' : 'visibility_off'"
            :type="showPwd ? 'text' : 'password'"
            @click:append="showRepeatPwd = !showRepeatPwd"
            :error-messages="repeatPasswordErrors"
            @input="$v.repeatPassword.$touch()"
            @blur="$v.repeatPassword.$touch()"
          />

          <v-row no-gutters justify="end">
            <v-btn
              dark
              type="submit"
              color="green darken-1"
            >
              {{ $tc('create') }}
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
    
<script>
import { required, sameAs } from 'vuelidate/lib/validators'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      dialog: this.open,
      username: null,
      password: null,
      repeatPassword: null,
      showPwd: false,
      showRepeatPwd: false
    }
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('$validation.required'))
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('$validation.required'))
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAs &&
        errors.push(this.$t('$validation.same_as'))
      !this.$v.repeatPassword.required &&
        errors.push(this.$t('$validation.required'))
      return errors
    }
  },
  methods: {
    clearFields () {
      this.username = null,
      this.password = null
    },
    closeModal () {
      this.$emit('close')
    },
    submit () {
      console.log('user created')
      this.$emit('success')
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    },
    repeatPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  watch: {
    open (val) {
      this.dialog = val
      if (!val) {
        this.clearFields()
      }
    }
  }
}
</script>