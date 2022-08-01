import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = [
  {
    path: '/',
    redirect: '/toimoi'
  },
  {
    path: '/toimoi',
    name: 'main',
    component: () => import('@/views/main')
  },
  {
    path: 'toimoi/information',
    name: 'information',
    component: () => import('@/views/information')
  },
  {
    path: '/toimoi/apple',
    name: 'apple',
    component: () => import('@/views/apple')
  }
]

export default router
