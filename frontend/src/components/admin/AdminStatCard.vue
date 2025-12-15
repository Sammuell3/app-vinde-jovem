<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: [String, Number],
        required: true
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div :class="[
        'flex flex-col gap-1 rounded-lg bg-surface p-4 shadow-soft',
        fullWidth ? 'col-span-2 sm:col-span-1' : ''
    ]">
        <p class="text-sm font-medium leading-normal text-text-muted">{{ label }}</p>
        <p class="tracking-light text-2xl font-bold leading-tight text-text-main">{{ value }}</p>
    </div>
</template>
