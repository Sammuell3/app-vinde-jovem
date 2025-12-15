<script setup>
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'outline', 'soft', 'destructive'].includes(value)
    },
    width: {
        type: String,
        default: 'full' // 'full' or 'auto'
    },
    size: {
        type: String,
        default: 'lg',
        validator: (value) => ['sm', 'md', 'lg'].includes(value) // sm: 40px, md: 48px, lg: 56px (h-14)
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const variantClasses = computed(() => {
    if (props.disabled || props.loading) {
        return 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
    }
    switch (props.variant) {
        case 'outline':
            return 'bg-transparent border border-gray-300 text-text-main hover:bg-gray-50'
        case 'soft':
            return 'bg-primary/10 text-primary hover:bg-primary/20 border-none'
        case 'destructive':
            return 'bg-red-500 text-white hover:bg-red-600 border-none'
        default: // primary
            return 'bg-primary text-white hover:bg-primary/90 border-none'
    }
})

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'h-10 px-4 text-sm rounded-full' // Compact
        case 'md':
            return 'h-12 px-6 text-base rounded-full' // Standard
        case 'lg':
        default:
            return 'h-14 px-5 text-base rounded-lg' // Large/CTA
    }
})

const widthClass = computed(() => {
    return props.width === 'full' ? 'w-full' : 'w-auto'
})
</script>

<template>
    <button 
        :disabled="disabled || loading"
        :class="[
            'flex items-center justify-center overflow-hidden font-bold leading-normal tracking-[0.015em] transition-colors',
            variantClasses,
            sizeClasses,
            widthClass
        ]"
    >
        <span v-if="loading" class="material-symbols-outlined animate-spin mr-2 text-xl">progress_activity</span>
        <span class="truncate">
            <slot></slot>
        </span>
    </button>
</template>
