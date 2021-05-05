import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '@/store/modules/auth'
import { data } from '@/store/modules/data'
import { postsTemplates } from '@/store/modules/posts_templates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    data,
    postsTemplates
  }
}
)
