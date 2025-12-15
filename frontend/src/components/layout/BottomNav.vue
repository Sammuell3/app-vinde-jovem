<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

// Helper to check active state
const isActive = (name) => route.name === name || (name === 'home' && route.name === 'event-details');
</script>

<template>
    <div class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-surface/80 backdrop-blur-sm z-50">
        <div class="flex h-20 items-center justify-around px-2 max-w-7xl mx-auto">
            <!-- Home Link -->
            <RouterLink :to="{ name: 'home' }" class="flex flex-col items-center justify-center gap-1 group">
                <span :class="['material-symbols-outlined transition-colors', isActive('home') ? 'text-primary variation-fill' : 'text-text-muted']">home</span>
                <p :class="['text-xs', isActive('home') ? 'font-bold text-primary' : 'font-medium text-text-muted']">Início</p>
            </RouterLink>



            <!-- Admin Dashboard Link -->
            <RouterLink v-if="authStore.isAdmin" :to="{ name: 'admin-dashboard' }" class="flex flex-col items-center justify-center gap-1 group">
                <span :class="['material-symbols-outlined transition-colors', isActive('admin-dashboard') ? 'text-primary variation-fill' : 'text-text-muted']">admin_panel_settings</span>
                <p :class="['text-xs', isActive('admin-dashboard') ? 'font-bold text-primary' : 'font-medium text-text-muted']">Admin</p>
            </RouterLink>

            <!-- Profile Link -->
            <RouterLink :to="{ name: 'profile' }" class="flex flex-col items-center justify-center gap-1 group">
                <span :class="['material-symbols-outlined transition-colors', isActive('profile') ? 'text-primary variation-fill' : 'text-text-muted']">person</span>
                <p :class="['text-xs', isActive('profile') ? 'font-bold text-primary' : 'font-medium text-text-muted']">Perfil</p>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.variation-fill {
  font-variation-settings: 'FILL' 1;
}
</style>
