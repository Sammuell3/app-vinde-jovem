<script setup>
import { ref } from 'vue'
import Input from './ui/Input.vue'
import Button from './ui/Button.vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
    console.log('Register attempt:', email.value, password.value)
    // Add logic later
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="w-full">
        <!-- Name Field -->
        <Input 
            v-model="name"
            label="Name"
            placeholder="Enter your name"
            type="text"
        />
        <!-- Email Field -->
        <Input 
            v-model="email"
            label="Email or Username"
            placeholder="Enter your email or username"
            type="text"
        />

        <!-- Password Field -->
        <Input 
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
        />
        <!-- Register Button -->
        <Button type="submit">Register</Button>
    </form>
</template>
