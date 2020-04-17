<template>
  <v-navigation-drawer
    v-model="active"
    absolute
    temporary
  >
    <v-list nav dense>
      <v-list-item-group
        active-class="secondary--text"
      >
        <v-list-item
          dark
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
      active () {
        return this.$store.state.drawer.drawer
      },
      isManager () {
        return this.$store.state.auth.isManager
      },
      menuItens () {
        const items = [
          { title: this.$tc('home'), icon: 'home', url: { name: 'home' } },
        ]
        if (this.isManager) {
          items.push({ title: this.$tc('user_managment'), icon: 'account_box', url: { name: 'user_managment' } })
        }
        return items
      }
    }
  }
</script>
