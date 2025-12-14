<script setup>
</script>

<template>
    <header class="sticky top-0 z-10 flex h-auto w-full flex-col bg-background/95 backdrop-blur-sm border-b border-gray-100">
        <div class="relative flex items-center p-4 pb-2 justify-between max-w-7xl mx-auto w-full">
            <!-- Logo -->
            <img src="/vinde-jovem-logo.jpg" alt="Logo" class="h-10 md:absolute md:left-1/2 md:-translate-x-1/2">
            
            <div class="flex items-center justify-end gap-2 ml-auto">
                <button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent hover:bg-gray-100 text-text-main transition-colors">
                    <span class="material-symbols-outlined text-2xl">notifications</span>
                </button>
                <button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent hover:bg-gray-100 text-text-main transition-colors">
                    <span class="material-symbols-outlined text-2xl">person</span>
                </button>
            </div>
        </div>
    </header>
</template>