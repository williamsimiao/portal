<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            v-on="{ ...tooltip, ...menu }"
            icon
          >
            <v-icon>language</v-icon>
          </v-btn>
        </template>
        <span>{{ `${$tc('language')}: ${$tc(`i18n.${locale}`)}` }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <template v-for="loc in locales">
        <v-list-item :key="`locales-${loc}`" @click="setLocale(`${loc}`)" :disabled="loc === locale">
          <v-list-item-title>{{ $t(`i18n.${loc}`) }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    locale () {
      return this.$store.state.locale.locale
    },
    locales () {
      return this.$store.state.locale.locales
    }
  },
  methods: {
    setLocale (locale) {
      this.$store.commit('locale/SET_LOCALE', locale)
    }
  }
}
</script>
