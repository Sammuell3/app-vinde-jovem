<script setup>
import { formatDate } from '../utils/dateUtils' // [NEW]

defineProps({
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
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    statusColor: {
        type: String,
        default: "bg-gray-100 text-gray-800"
    }
})
</script>

<template>
    <div class="flex flex-col items-stretch justify-start overflow-hidden rounded-lg bg-surface shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <!-- Event Image -->
        <div class="aspect-video w-full bg-cover bg-center bg-no-repeat" 
             :style="{ backgroundImage: `url('${image}')` }">
        </div>
        
        <!-- Event Details -->
        <div class="flex w-full flex-col items-stretch justify-center gap-3 p-4">
            <div :class="['inline-block self-start rounded-lg px-3 py-1 text-xs font-medium', statusColor]">
                {{ status }}
            </div>
            
            <p class="text-lg font-bold leading-tight text-text-main">{{ title }}</p>
            
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-text-muted text-[20px]">calendar_month</span>
                    <p class="text-sm font-medium text-text-muted">{{ formatDate(date) }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-text-muted text-[20px]">location_on</span>
                    <p class="text-sm font-medium text-text-muted">{{ location }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
