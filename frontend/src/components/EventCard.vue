<script setup>
defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isJoined: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <RouterLink 
        :to="{ name: 'event-details', params: { id: id }}" 
        class="flex flex-col items-stretch justify-start rounded-lg bg-surface shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
        <!-- Image Section -->
        <div 
            class="w-full bg-center bg-no-repeat aspect-video bg-cover" 
            :style="{ backgroundImage: `url('${image}')` }"
        ></div>
        
        <!-- Content Section -->
        <div class="flex w-full flex-col items-stretch justify-center gap-4 p-4">
            <p class="text-text-main text-xl font-bold leading-tight tracking-tight">{{ title }}</p>
            
            <div class="flex items-center text-text-muted gap-2">
                <span class="material-symbols-outlined text-lg">calendar_month</span>
                <p class="text-base font-normal leading-normal">{{ date }}</p>
            </div>
            
            <!-- Action Button - Prevent navigation when clicking button directly if strictly needed, but usually clicking card is fine -->
            <div class="w-full">
                <button 
                    v-if="!isJoined"
                    class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm h-11 px-4 bg-primary text-white text-base font-bold leading-normal hover:bg-primary-hover transition-colors"
                >
                    <span class="truncate">Join</span>
                </button>

                <!-- Joined State Button -->
                <button 
                    v-else
                    class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm h-11 px-4 bg-primary/20 text-primary text-base font-bold leading-normal"
                >
                    <span class="material-symbols-outlined text-lg mr-2">check_circle</span>
                    <span class="truncate">Joined</span>
                </button>
            </div>
        </div>
    </RouterLink>
</template>
