import axios from 'axios'
const qs = require('qs')

export const auth = {
  state: {
    authorization: false,
    token: document.cookie.match(new RegExp('(^| )' + 'token_' + '=([^;]+)')) ? document.cookie.match(new RegExp('(^| )' + 'token_' + '=([^;]+)'))[2] : ''
  },
  mutations: {
    SET_AUTH_TOKEN (state, payload) {
      state.token = payload.access_token
      const type = 'token_'
      const date = new Date()
      date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000))
      document.cookie = `${type} = ${payload.access_token}; expires = ${date.toUTCString()}; path=/`
      axios.defaults.headers.common = {
        Authorization: `Bearer ${payload.access_token}`
      }
    }
  },
  actions: {
    async loginUserAction (context, data) {
      try {
        const response = await axios.post('/token', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        if (response.data) {
          context.commit('SET_AUTH_TOKEN', response.data)
        }
        return response.data
      } catch (e) {
        return false
      }
    }
  },
  getters: {
    getAuthToken: state => state.token
  }
}
