<script setup>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import Button from './Button.vue' // Reusing our generic Button
import { useToastStore } from '../../stores/toast'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    event: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])
const toast = useToastStore()

const eventUrl = ref('')

onMounted(() => {
    // In a real app, this would be constructing the full URL
    // For now we use the current window location or a constructed on
    eventUrl.value = window.location.href
})

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(eventUrl.value)
        toast.success('Link copied to clipboard!')
    } catch (err) {
        toast.error('Failed to copy link.')
        console.error('Failed to copy: ', err)
    }
}
</script>

<template>
    <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-full md:translate-y-0 md:scale-95"
        enter-to-class="opacity-100 translate-y-0 md:scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 md:scale-100"
        leave-to-class="opacity-0 translate-y-full md:translate-y-0 md:scale-95"
    >
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none font-sans">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" @click="emit('close')"></div>

            <!-- Sheet Content -->
            <div class="bg-white dark:bg-[#0f1723] w-full md:max-w-sm md:rounded-[32px] rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] flex flex-col pointer-events-auto relative z-10 animate-in slide-in-from-bottom duration-500">
                
                <!-- Handle -->
                <div class="w-full flex justify-center pt-3 pb-2">
                    <div class="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>

                <!-- Header -->
                <div class="px-6 pb-2 text-center">
                    <h2 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Share Event</h2>
                </div>

                <!-- Body -->
                <div class="p-6 pt-2 flex flex-col items-center gap-6">
                    
                    <!-- QR Code Container -->
                    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <QrcodeVue 
                            :value="eventUrl" 
                            :size="200" 
                            level="H" 
                            render-as="svg"
                            background="#ffffff"
                            foreground="#000000"
                        />
                    </div>

                    <p class="text-slate-500 dark:text-slate-400 text-sm text-center">
                        Scan only the QR Code to view the event details on another device.
                    </p>

                    <!-- Link Copy Section -->
                    <div class="w-full flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div class="flex-1 px-3 py-1 overflow-hidden">
                            <p class="text-sm text-slate-500 dark:text-slate-400 truncate">{{ eventUrl }}</p>
                        </div>
                        <Button 
                            @click="copyLink" 
                            class="!h-10 !w-auto !min-w-[80px] !rounded-lg !text-sm"
                        >
                            Copy
                        </Button>
                    </div>

                    <!-- Cancel/Close -->
                    <button @click="emit('close')" class="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* No extra styles needed */
</style>
