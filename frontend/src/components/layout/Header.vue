<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
    authStore.logout()
}
</script>

<template>
    <header class="sticky top-0 z-10 flex h-auto w-full flex-col bg-background/95 backdrop-blur-sm border-b border-gray-100">
        <div class="relative flex items-center p-4 pb-2 justify-between max-w-7xl mx-auto w-full">
            <!-- Logo -->
            <img src="/vinde-jovem-logo.jpg" alt="Logo" class="h-10 absolute left-1/2 -translate-x-1/2 cursor-pointer" @click="router.push('/')">
            
            <div class="flex items-center justify-end gap-2 ml-auto">
                <!-- Notifications (Future) -->
                <!-- <button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent hover:bg-gray-100 text-text-main transition-colors">
                    <span class="material-symbols-outlined text-2xl">notifications</span>
                </button> -->
                
                <!-- Profile Link -->
                <RouterLink :to="{ name: 'profile' }" class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent hover:bg-gray-100 text-text-main transition-colors">
                    <span class="material-symbols-outlined text-2xl">person</span>
                </RouterLink>

                <!-- Logout Button -->
                 <button 
                    @click="handleLogout"
                    class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent hover:bg-red-50 text-red-500 transition-colors ml-1"
                    title="Logout"
                >
                    <span class="material-symbols-outlined text-2xl">logout</span>
                </button>
            </div>
        </div>
    </header>
</template>