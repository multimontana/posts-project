import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Templates
 */

import store from '@/store/index'
import Templates from '@/views/template/Templates'
import Index from '@/views/Index'
import TemplateForm from '@/components/templates/TemplateForm'
import TemplateView from '@/views/template/TemplateView'
import PostSingle from '@/views/template/posts/PostSingle'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Index,
    children: [
      {
        name: 'templates',
        path: '/',
        component: Templates
      },
      {
        name: 'template-form',
        path: '/template/edit/:id',
        component: TemplateForm
      },
      {
        name: 'template-form-add',
        path: '/template/add',
        component: TemplateForm
      },
      {
        name: 'template-show',
        path: '/template/show/:id',
        component: TemplateView
      },
      {
        name: 'post-form',
        path: '/post/edit/:id',
        component: PostSingle
      },
      {
        name: 'post-form-add',
        path: '/post/:template/add',
        component: PostSingle
      },
      {
        name: 'post-form-edit',
        path: '/post/:template/add/:post',
        component: PostSingle
      }
    ],
    meta: {
      requiresAuthUser: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuthUser = to.matched.some(record => record.meta.requiresAuthUser)
  if (requiresAuthUser && !store.state.auth.token) {
    next('/login')
  } else if (store.state.auth.token && to.name.includes('login')) {
    next('/')
  } else {
    next()
  }
})
export default router
