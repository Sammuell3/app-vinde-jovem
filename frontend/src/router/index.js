import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/events/:id',
      name: 'event-details',
      component: () => import('../pages/EventDetails.vue')
    }
  ],
})

export default router
