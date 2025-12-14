<script setup>
defineProps({
    icon: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="flex items-center gap-4 p-2 min-h-14">
        <div class="text-primary flex items-center justify-center rounded-md bg-primary/10 shrink-0 size-10">
            <span class="material-symbols-outlined">{{ icon }}</span>
        </div>
        <p class="text-text-main text-base font-medium leading-normal flex-1">{{ text }}</p>
    </div>
</template>
