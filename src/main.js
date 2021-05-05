import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import '@mdi/font/css/materialdesignicons.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueMask from 'v-mask'
Vue.use(VueMask)

Vue.use(Vuetify)
Vue.use(Vuelidate)

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

axios.defaults.headers.common = {
  Authorization: store.state.auth.token ? `Bearer ${store.state.auth.token}` : ''
}

Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
