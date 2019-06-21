import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/view/home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/view/login')
    }
  ]
})
