<template>
  <v-navigation-drawer
    v-model="drawerActive"
    absolute
    temporary
  >
    <template>
      <v-list-item
        active-class="secondary--text"
        :to="homeMenuItem.url"
        link
      >
        <v-list-item-icon active-class="secondary">
          <v-icon>{{ homeMenuItem.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ homeMenuItem.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group
        active-class="secondary--text"
      >
        <v-list-item
          v-for="item in menuItens"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon active-class="secondary">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title exact exact-active-class="secondary--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    computed: {
      drawerActive: {
        get () {
          return this.$store.state.drawer.drawerActive
        },
        set (val) {
          if(!val) {
            this.$store.commit('drawer/SET_DRAWER_ACTIVE', false)
          }
        }
      },
      isManager () {
        return true
        // return this.$store.state.auth.isManager
      },
      homeMenuItem () {
        return { title: this.$tc('home'), icon: 'home', url: { name: 'home' } }
      },
      menuItens () {
        const items = []
        if (this.isManager) {
          items.push({ title: this.$tc('users_managment'), icon: 'account_box', url: { name: 'user_managment' } })
        }
        return items
      }
    }
  }
</script>
