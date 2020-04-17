<template>
  <v-app-bar
    color="primary"
    dark
    app
    :flat="$vuetify.breakpoint.xsOnly"
  >
    <v-app-bar-nav-icon @click.stop="toogleMainDrawer()"/>
    <router-link :to="{name: 'login'}" class="d-flex router-link-active">
      <img src="@/assets/logo.png" height="38px" width="38px">
    </router-link>
    <span class="title ml-3 mr-5">
      App
      <span class="font-weight-light">
        Unimed
      </span>
    </span>
    <v-spacer />
    <template v-if="!isLogged">
      <v-btn
        text
        @click="$router.push({ name: 'login'})"
      >{{ $tc('login') }}</v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        class="mr-2"
        outlined
        @click="$router.push({ name: 'join'})"
      >{{ $tc('crate_account') }}</v-btn>
    </template>
    <template v-else>
      <v-btn
        text
        @click="logout()"
      >{{ $tc('logout') }}</v-btn>
    </template>
    <language-select/>
  </v-app-bar>
</template>

<script>
import LanguageSelect from './LanguageSelect'

export default {
  components: {
    LanguageSelect
  },
  methods: {
    toogleMainDrawer () {
      this.$store.dispatch('drawer/toggle')
    },
    logout () {
      this.$store.dispatch('auth/doLogout').then(() => {
        this.$router.push({ name: 'login'})
      })
    }
  },
  computed: {
    isLogged () {
      return this.$store.state.auth.isLogged
    }
  }
}
</script>
