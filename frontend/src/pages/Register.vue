<script setup>
import RegisterForm from '../components/RegisterForm.vue'
</script>

<template>
    <div class="relative flex h-auto min-h-screen w-full flex-col bg-background-light group/design-root overflow-x-hidden font-display">
        
        <!-- Container centralizado com limite de largura -->
        <div class="w-full max-w-md mx-auto flex flex-col grow">
            
            <div class="flex flex-col items-center justify-center p-6 pt-16">
                <!-- Header Graphic: Tau Cross -->
                <svg class="h-20 w-20 text-primary" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 19V5M5 5h14"></path>
                </svg>
            </div>

            <div class="px-6 py-4 w-full">
                <!-- Welcome Header -->
                <h1 class="text-text-primary tracking-tight text-[32px] font-bold leading-tight text-center pb-8">Crie sua conta</h1>
                
                <!-- Login Form Molecule -->
                <RegisterForm />
            </div>

            <div class="flex grow"></div>

            <div class="px-6 py-8 text-center">
                <!-- Inspirational Quote -->
                <p class="text-text-secondary text-sm font-normal leading-relaxed italic mb-6">"É Jesus que você busca quando sonha felicidade; Ele te espera quando nada mais que você encontre satisfação."</p>
                
                <!-- Login Link -->
                <p class="text-text-secondary text-sm font-normal leading-normal">
                    Já tem uma conta? <a class="text-primary font-bold" href="/login">Entrar</a>
                </p>
            </div>
        </div>
    </div>
</template>