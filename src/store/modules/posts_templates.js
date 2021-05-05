import axios from 'axios'
// const qs = require('qs')

export const postsTemplates = {
  state: {
    templates: [],
    templatePosts: []
  },
  mutations: {
    SET_TEMPLATES (state, payload) {
      state.templates = payload.Data
    },
    SET_TEMPLATE_POSTS (state, payload) {
      state.templatePosts = payload.Data
    },
    REMOVE_TEMPLATE (state, payload) {
      const foundIndex = state.templates.findIndex(el => el.Id === payload.Id)
      state.templates.splice(foundIndex, 1)
    },
    REMOVE_POST (state, payload) {
      const foundIndex = state.templatePosts.findIndex(el => el.Id === payload.Id)
      state.templatePosts.splice(foundIndex, 1)
    }
  },
  actions: {
    async getAllTemplates ({ commit }) {
      try {
        const response = await axios.get('/api/Templates')
        if (response.data) {
          commit('SET_TEMPLATES', response.data)
        }
        return response.data
      } catch (e) {
        return false
      }
    },
    async getPostsByTemplateId ({ commit }, templateId) {
      try {
        const response = await axios.get(`/api/Templates/${templateId}/Posts`)
        if (response.data) {
          commit('SET_TEMPLATE_POSTS', response.data)
        }
        return response.data
      } catch (e) {
        return false
      }
    },
    async getPostsById ({ commit }, postId) {
      try {
        const response = await axios.get(`/api/TemplatePosts/${postId}`)
        return response.data
      } catch (e) {
        return false
      }
    },
    async getTemplateById ({ commit }, id) {
      try {
        const response = await axios.get(`/api/Templates/${id}`)
        return response.data
      } catch (e) {
        return false
      }
    },
    async saveTemplate ({ commit }, data) {
      try {
        const response = await axios.post('/api/Templates', data)
        return response.data
      } catch (e) {
        return false
      }
    },
    async getSignedPolicy ({ commit }) {
      try {
        const response = await axios.get('/api/amazonS3Tools/AmazonSignedPolicy')
        return response.data
      } catch (e) {
        return false
      }
    },
    async uploadImage ({ commit }, data) {
      try {
        const response = await axios.post('https://postmyparty-staging.s3-accelerate.amazonaws.com/', data)
        return response.data
      } catch (e) {
        return false
      }
    },
    async savePost ({ commit }, data) {
      try {
        const response = await axios.post(`/api/Templates/${data.template_id}/Posts`, data)
        return response.data
      } catch (e) {
        return false
      }
    },
    async updatePost ({ commit }, data) {
      try {
        const response = await axios.put(`/api/TemplatePosts/${data.Id}`, data)
        return response.data
      } catch (e) {
        return false
      }
    },
    async updateTemplate ({ commit }, data) {
      try {
        const response = await axios.put(`/api/Templates/${data.Id}`, data)
        return response.data
      } catch (e) {
        return false
      }
    },
    async removeTemplateById ({ commit }, id) {
      try {
        const response = await axios.delete(`/api/Templates/${id}`)
        commit('REMOVE_TEMPLATE', response.data)
        return response.data
      } catch (e) {
        return false
      }
    },
    async removePostById ({ commit }, id) {
      try {
        const response = await axios.delete(`/api/TemplatePosts/${id}`)
        commit('REMOVE_POST', response.data)
        return response.data
      } catch (e) {
        return false
      }
    }
  },
  getters: {
    getTemplatesList: state => state.templates,
    getTemplatePosts: state => state.templatePosts
  }
}
