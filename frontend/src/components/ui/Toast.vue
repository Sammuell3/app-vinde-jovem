<script setup>
import { useToastStore } from '../../stores/toast'
import { computed } from 'vue'

const store = useToastStore()

const getIcon = (type) => {
    switch (type) {
        case 'success': return 'check_circle'
        case 'error': return 'error'
        case 'warning': return 'warning'
        default: return 'info'
    }
}

const getClasses = (type) => {
    switch (type) {
        case 'success': return 'bg-white border-l-4 border-green-500 text-text-main'
        case 'error': return 'bg-white border-l-4 border-red-500 text-text-main'
        case 'warning': return 'bg-white border-l-4 border-yellow-500 text-text-main'
        default: return 'bg-white border-l-4 border-primary text-text-main'
    }
}
</script>

<template>
    <div class="fixed top-4 right-4 z-9999 flex flex-col gap-3 font-sans w-full max-w-sm px-4 md:px-0">
        <TransitionGroup 
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="translate-x-full opacity-0"
            enter-to-class="translate-x-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="translate-x-full opacity-0"
        >
            <div 
                v-for="toast in store.toasts" 
                :key="toast.id"
                :class="['relative flex items-center p-4 rounded-md shadow-lg min-h-[64px]', getClasses(toast.type)]"
            >
                <span :class="['material-symbols-outlined mr-3 text-2xl', 
                    toast.type === 'success' ? 'text-green-500' : 
                    toast.type === 'error' ? 'text-red-500' : 
                    toast.type === 'warning' ? 'text-yellow-500' : 'text-primary']">
                    {{ getIcon(toast.type) }}
                </span>
                
                <p class="text-sm font-medium flex-1 mr-2">{{ toast.message }}</p>
                
                <button @click="store.remove(toast.id)" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <span class="material-symbols-outlined text-lg">close</span>
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>
