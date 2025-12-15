import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([])
    let idCounter = 0

    const add = (message, type = 'info', duration = 3000) => {
        const id = idCounter++
        const toast = { id, message, type }
        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => {
                remove(id)
            }, duration)
        }
    }

    const remove = (id) => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    // Convenience methods
    const success = (msg, duration) => add(msg, 'success', duration)
    const error = (msg, duration) => add(msg, 'error', duration)
    const info = (msg, duration) => add(msg, 'info', duration)
    const warning = (msg, duration) => add(msg, 'warning', duration)

    return {
        toasts,
        add,
        remove,
        success,
        error,
        info,
        warning
    }
})
