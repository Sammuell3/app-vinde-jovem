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
    },
    price: {
        type: Number,
        default: 0
    }
})
import Button from './ui/Button.vue'
import { formatDate } from '../utils/dateUtils'
import { formatPrice } from '../utils/currencyUtils'
</script>

<template>
    <RouterLink 
        :to="{ name: 'event-details', params: { id: id }}" 
        class="flex flex-col items-stretch justify-start rounded-lg bg-surface shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
        <!-- Image Section -->
        <div 
            class="w-full bg-center bg-no-repeat aspect-video bg-cover relative" 
            :style="{ backgroundImage: `url('${image}')` }"
        >
            <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <span class="text-xs font-bold text-text-main uppercase tracking-wide">{{ formatPrice(price) }}</span>
            </div>
        </div>
        
        <!-- Content Section -->
        <div class="flex w-full flex-col items-stretch justify-center gap-4 p-4">
            <p class="text-text-main text-xl font-bold leading-tight tracking-tight">{{ title }}</p>
            
            <div class="flex items-center text-text-muted gap-2">
                <span class="material-symbols-outlined text-lg">calendar_month</span>
                <p class="text-base font-normal leading-normal">{{ formatDate(date) }}</p>
            </div>
            
            <!-- Action Button - Prevent navigation when clicking button directly if strictly needed, but usually clicking card is fine -->
            <div class="w-full">
                <Button 
                    v-if="!isJoined"
                    variant="primary"
                    width="full"
                    size="md"
                    class="rounded-sm h-11"
                >
                    Join
                </Button>

                <!-- Joined State Button -->
                <Button 
                    v-else
                    variant="soft"
                    width="full"
                    size="md"
                    class="rounded-sm h-11"
                >
                    <span class="material-symbols-outlined text-lg mr-2">check_circle</span>
                    Joined
                </Button>
            </div>
        </div>
    </RouterLink>
</template>
