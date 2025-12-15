<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    buttonLabel: {
        type: String,
        default: 'Acessar'
    },
    routeName: {
        type: String,
        required: true
    }
})

const router = useRouter()
</script>

<template>
    <div class="flex flex-col items-stretch justify-start rounded-lg bg-surface shadow-soft">
        <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 p-4">
            <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span class="material-symbols-outlined">{{ icon }}</span>
                </div>
                <p class="text-lg font-bold leading-tight tracking-[-0.015em] text-text-main">{{ title }}</p>
            </div>
            <div class="flex items-end justify-between gap-3">
                <p class="flex-1 text-base font-normal leading-normal text-text-muted">{{ description }}</p>
                <button @click="router.push({ name: routeName })" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-primary text-white text-sm font-bold leading-normal hover:bg-primary-hover transition-colors">
                    <span class="truncate">{{ buttonLabel }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
