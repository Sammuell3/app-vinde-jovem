<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Toast from './components/ui/Toast.vue'
import { useAuthStore } from './stores/auth'
import BottomNav from './components/layout/BottomNav.vue'

const authStore = useAuthStore()

onMounted(() => {
  if (authStore.token) {
    authStore.checkAuth()
  }
})
</script>

<template>
  <Toast />
  <RouterView />
  <BottomNav v-if="!$route.meta.isPublic && authStore.isAuthenticated" />
</template>
