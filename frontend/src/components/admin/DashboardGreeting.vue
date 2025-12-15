<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

// State for current date/time
const now = ref(new Date())

// Update time every minute to keep greeting accurate
onMounted(() => {
    const timer = setInterval(() => {
        now.value = new Date()
    }, 60000)
    
    return () => clearInterval(timer)
})

// Greeting Logic
const greeting = computed(() => {
    const hour = now.value.getHours()
    if (hour >= 5 && hour < 12) return 'Bom dia'
    if (hour >= 12 && hour < 18) return 'Boa tarde'
    return 'Boa noite'
})

// Date Formatting
const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(now.value)
})

// Get first name safely
const firstName = computed(() => {
    const name = authStore.user?.username || authStore.user?.name || 'Visitante'
    return name.split(' ')[0]
})
</script>

<template>
    <div class="flex flex-col gap-1 px-4 py-6">
        <div class="flex items-center gap-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <span class="material-symbols-outlined text-lg">calendar_today</span>
            <span class="capitalize">{{ formattedDate }}</span>
        </div>
        
        <div class="flex flex-col">
            <h1 class="text-3xl font-bold tracking-tight text-text-main">
                {{ greeting }}, <span class="text-primary">{{ firstName }}</span>!
            </h1>
            <p class="text-gray-500 text-base mt-1">
                Bem-vindo ao seu painel de controle.
            </p>
        </div>
    </div>
</template>
