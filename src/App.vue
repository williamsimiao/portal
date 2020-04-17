<template>
  <v-app>
    <app-top-bar/>
    <template>
      <app-main-menu-drawer/>
    </template>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '@/components/AppFooter/AppFooter'
import AppTopBar from '@/components/AppTopBar/AppTopBar'
import AppMainMenuDrawer from '@/components/Drawer/AppMainMenuDrawer'
// import AppLoadingModal from '@/components/ui/AppLoadingModal'

export default {
  components: {
    AppFooter,
    AppTopBar,
    AppMainMenuDrawer,
    // AppLoadingModal
  },
  computed: {
    locale () {
      return this.$store.state.locale.locale
    }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
};
</script>

<style lang="scss">
@import 'assets/styles/main';
</style>