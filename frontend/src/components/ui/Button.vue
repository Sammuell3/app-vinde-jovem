<script setup>
// No props needed for this basic version yet, just slot
</script>

<template>
    <button class="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
        <span class="truncate">
            <slot></slot>
        </span>
    </button>
</template>
