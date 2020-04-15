<template>
  <v-app>
    <app-top-bar/>
    <!-- <app-drawer name="mainMenu" :app="true" :temporary="true" /> -->
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
// import AppDrawer from '@/components/drawers/AppDrawer'
// import AppLoadingModal from '@/components/ui/AppLoadingModal'

export default {
  components: {
    AppFooter,
    AppTopBar,
    // AppDrawer,
    // AppLoadingModal
  },
  // computed: {
  //   locale () {
  //     return this.$store.state.locale.locale
  //   }
  // },
  // watch: {
  //   locale (val) {
  //     this.$i18n.locale = val
  //   }
  // }
};
</script>

<style lang="scss">
@import 'assets/styles/main';
</style>