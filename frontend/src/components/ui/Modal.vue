<script setup>
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Confirmation'
    },
    message: {
        type: String,
        default: 'Are you sure?'
    },
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    type: { // 'info', 'success', 'danger', 'warning'
        type: String,
        default: 'info'
    },
    showCancel: {
        type: Boolean,
        default: true
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'confirm'])

const iconClass = computed(() => {
    switch (props.type) {
        case 'success': return 'text-green-500'
        case 'danger': return 'text-red-500'
        case 'warning': return 'text-yellow-500'
        default: return 'text-primary'
    }
})

const iconName = computed(() => {
    switch (props.type) {
        case 'success': return 'check_circle'
        case 'danger': return 'error'
        case 'warning': return 'warning'
        default: return 'info'
    }
})
</script>

<template>
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="!isLoading && emit('close')"></div>
            
            <!-- Modal Content -->
            <div class="relative w-full max-w-sm overflow-hidden rounded-xl bg-white p-6 shadow-2xl">
                <div class="flex flex-col items-center text-center">
                    <span :class="['material-symbols-outlined text-4xl mb-4', iconClass]">
                        {{ iconName }}
                    </span>
                    
                    <h3 class="mb-2 text-xl font-bold text-text-main">{{ title }}</h3>
                    <p class="mb-6 text-text-muted text-sm leading-relaxed">{{ message }}</p>
                    
                    <div class="flex w-full gap-3">
                        <Button 
                            v-if="showCancel" 
                            variant="outline" 
                            @click="emit('close')"
                            :disabled="isLoading"
                        >
                            {{ cancelText }}
                        </Button>
                        <Button 
                            :variant="type === 'danger' ? 'destructive' : 'primary'" 
                            @click="emit('confirm')"
                            :disabled="isLoading"
                        >
                            {{ isLoading ? 'Processing...' : confirmText }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
