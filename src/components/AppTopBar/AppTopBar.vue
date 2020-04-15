<template>
  <v-app-bar
    color="primary"
    dark
    app
    :flat="$vuetify.breakpoint.xsOnly"
  >
    <v-app-bar-nav-icon v-if="isLogged" @click.stop="toogleMainDrawer()"/>
    <router-link :to="{name: 'welcome'}" class="d-flex router-link-active">
      <img src="@/assets/images/logo-dinamo-simbolo-dark.png" height="38px" width="38px">
    </router-link>
    <span class="title ml-3 mr-5">
      Dinamo
      <span class="font-weight-light">
        Services
      </span>
    </span>
    <v-spacer />
    <v-btn icon active-class="dinamo" @click="toogleDarkTheme()">
      <v-icon>settings_brightness</v-icon>
    </v-btn>
    <template v-if="!isLogged">
      <v-btn
        text
        @click="$router.push({ name: 'login'})"
      >{{ $tc('signin') }}</v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        class="mr-2"
        outlined
        @click="$router.push({ name: 'join'})"
      >{{ $tc('sign_up') }}</v-btn>
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
      this.$store.dispatch('drawers/toggle', { name: 'mainMenu' })
    },
    logout () {
      this.$store.dispatch('auth/doLogout').then(() => {
        this.$router.push({ name: 'login'})
      })
    },
    toogleDarkTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  computed: {
    isLogged () {
      return this.$store.state.auth.isLogged
    }
  }
}
</script>
