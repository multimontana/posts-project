<template>
  <v-navigation-drawer
    v-model="sidebarMenu"
    app
    floating
    :permanent="sidebarMenu"
    :mini-variant.sync="mini"
  >
    <v-list dense color="primary" dark>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-chevron-left</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <h3 class="font-weight-thin">Dashboard</h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list-item class="px-2" @click="toggleMini = !toggleMini">
      <v-btn icon small>
        <v-icon v-if="!toggleMini">mdi-chevron-left</v-icon>
        <v-icon v-else>mdi-chevron-right</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
      items: [
        { title: 'Templates', href: '/', icon: 'mdi-home-outline' }
      ],
      sidebarMenu: true,
      toggleMini: false
    }
  },
  computed: {
    mini () {
      return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    },
    buttonText () {
      return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    }
  }
}
</script>

<style scoped>

</style>
