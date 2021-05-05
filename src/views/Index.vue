<template>
  <div>
    <v-app-bar app color="primary" dark elevation="0">
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" color="primary" class="mr-2">{{ buttonText }}</v-btn>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Index',
  components: { Navbar },
  computed: {
    mini () {
      return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    },
    buttonText () {
      return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    }
  },
  data: () => ({
    items: [
      { title: 'Home', href: '/', icon: 'mdi-home-outline' }
      // { title: 'Detections', href: '/detections', icon: 'mdi-shield-account' },
      // { title: 'Components', href: '/comp', icon: 'mdi-palette-swatch' },
      // { title: 'Customers', href: '/customers', icon: 'mdi-account-search-outline' },
      // { title: 'Orders', href: '/orders', icon: 'mdi-bus-clock' },
      // { title: 'Settings', href: '/settings', icon: 'mdi-settings-outline' }
    ],
    sidebarMenu: true,
    toggleMini: false
  }),
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>

</style>
