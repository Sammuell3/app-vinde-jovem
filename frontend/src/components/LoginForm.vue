<script setup>
import { ref } from 'vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const handleSubmit = async () => {
    // Basic validation
    if (!email.value || !password.value) return

    await authStore.login({
        email: email.value,
        password: password.value
    })
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="w-full">
        <!-- Email Field -->
        <Input 
            v-model="email"
            label="Email"
            placeholder="Coloque seu email"
            type="text"
        />

        <!-- Password Field -->
        <Input 
            v-model="password"
            label="Senha"
            placeholder="Coloque sua senha"
            type="password"
        />

        <!-- Error Message -->
        <div v-if="authStore.error" class="text-red-500 text-sm text-center font-medium mb-2">
            {{ authStore.error }}
        </div>

        <!-- Login Button -->
        <div class="py-3">
            <Button type="submit" :disabled="authStore.isLoading">
                {{ authStore.isLoading ? 'Carregando...' : 'Entrar' }}
            </Button>
        </div>
    </form>
</template>
