import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import { useAuthStore } from '../stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { isPublic: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/events/:id',
      name: 'event-details',
      component: () => import('../pages/EventDetails.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/UserProfile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      component: () => import('../pages/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }, // Add admin check logic later, for now just auth
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../pages/admin/AdminDashboard.vue')
        },
        {
          path: 'create-event',
          name: 'admin-create-event',
          component: () => import('../pages/admin/CreateEvent.vue'),
          meta: { hideAdminNav: true }
        },
        {
          path: 'edit-event/:id',
          name: 'admin-edit-event',
          component: () => import('../pages/admin/CreateEvent.vue'),
          meta: { hideAdminNav: true }
        },
        {
          path: 'events/:id/attendees',
          name: 'admin-event-attendees',
          component: () => import('../pages/admin/EventAttendees.vue'),
          meta: { hideAdminNav: true }
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../pages/admin/UserManagement.vue'),
          meta: { hideAdminNav: true }
        },
        {
          path: 'events',
          name: 'admin-events',
          component: () => import('../pages/admin/EventManagement.vue'),
          meta: { hideAdminNav: true }
        }
      ]
    }
  ],
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  // 1. If route requires auth and user is NOT logged in -> Redirect to Login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  // 1.5If route requires ADMIN and user is NOT admin -> Redirect to Home
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { name: 'home' }
  }

  // 2. If user IS logged in and tries to access Login/Register -> Redirect to Home
  if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
