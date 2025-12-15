<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import eventService from '../../services/eventService'
import { useToastStore } from '../../stores/toast'
import Button from '../../components/ui/Button.vue'

const route = useRoute()
const router = useRouter()
const toastStore = useToastStore()

const attendees = ref([])
const eventName = ref('Event Attendees')
const isLoading = ref(true)

const statusColors = {
    'confirmado': 'bg-green-100 text-green-800',
    'na lista de espera': 'bg-yellow-100 text-yellow-800',
    'cancelado': 'bg-red-100 text-red-800'
}

onMounted(async () => {
    try {
        const eventId = route.params.id
        // Ideally we would fetch event details too for the title, but for now we focus on attendees
        const data = await eventService.getAttendees(eventId)
        attendees.value = data.attendees || []
    } catch (error) {
        console.error("Failed to fetch attendees:", error)
        toastStore.error("Failed to load attendee list")
    } finally {
        isLoading.value = false
    }
})

function formatDate(dateStr) {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
    <div class="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-sans">
        <!-- Top App Bar -->
        <div class="sticky top-0 z-10 bg-white border-b border-gray-100">
             <div class="flex items-center p-4 pb-2 justify-between max-w-7xl mx-auto">
                <button @click="router.back()" class="text-text-main flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
                </button>
                <h1 class="text-text-main text-xl font-bold leading-tight flex-1 text-center pr-10">Attendees</h1>
                <div class="size-10"></div>
            </div>
        </div>

        <main class="w-full max-w-7xl mx-auto flex-1 flex flex-col p-4">
            
            <div v-if="isLoading" class="flex justify-center p-10">
                <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>

            <div v-else-if="attendees.length === 0" class="flex flex-col items-center justify-center py-20 opacity-60">
                <span class="material-symbols-outlined text-6xl mb-4 text-gray-300">group_off</span>
                <p class="text-lg text-text-muted">No attendees found for this event.</p>
            </div>

            <div v-else class="space-y-4">
                <div v-for="item in attendees" :key="item._id" class="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div class="flex items-center gap-4">
                        <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                            {{ item.user_id?.name ? item.user_id.name.charAt(0).toUpperCase() : 'U' }}
                        </div>
                        <div>
                            <p class="font-semibold text-text-main">{{ item.user_id?.name || 'Unknown User' }}</p>
                            <p class="text-sm text-text-secondary">{{ item.user_id?.email }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-1">
                        <span :class="['px-3 py-1 rounded-full text-xs font-medium uppercase', statusColors[item.status] || 'bg-gray-100 text-gray-600']">
                            {{ item.status }}
                        </span>
                        <span class="text-xs text-text-muted">Registered: {{ formatDate(item.createdAt) }}</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
