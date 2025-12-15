<script setup>
import { ref } from 'vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const handleSubmit = async () => {
    if (!name.value || !email.value || !password.value) {
        authStore.error = "All fields are required"
        return
    }

    if (name.value.length < 3) {
        authStore.error = "Name must be at least 3 characters"
        return
    }

    if (password.value.length < 6) {
        authStore.error = "Password must be at least 6 characters"
        return
    }

    await authStore.register({
        username: name.value,
        email: email.value,
        password: password.value
    })
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="w-full">
        <!-- Name Field -->
        <Input 
            v-model="name"
            label="Name"
            placeholder="Coloque seu nome"
            type="text"
        />
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

        <!-- Register Button -->
        <Button type="submit" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Criando Conta...' : 'Criar Conta' }}
        </Button>
    </form>
</template>
