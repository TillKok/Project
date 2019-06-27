import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = getUser()
  if (to.path !== '/login') {
    if (!userInfo) {
      if (from.path === '/login') {
        nprogress.done()
      }
      next({ name: 'login' })
    } else {
      console.log(3)
      next()
    }
  } else {
    if (!userInfo) {
      console.log(2)
      next()
    } else {
      next({ name: 'home' })
      window.location.reload()
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

export default router
