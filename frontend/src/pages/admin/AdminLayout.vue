<script setup>
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

// Helper to check active state
const isActive = (name) => route.name === name
</script>

<template>
    <div class="relative flex min-h-screen w-full flex-col bg-background font-sans text-text-main group/design-root overflow-x-hidden">
        <!-- Main Content Area -->
        <main class="flex-grow pb-24">
            <RouterView />
        </main>

    </div>
</template>

<style scoped>
.variation-fill {
  font-variation-settings: 'FILL' 1;
}
</style>
