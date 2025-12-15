<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '../../stores/event'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'

const router = useRouter()
const eventStore = useEventStore()

const searchQuery = ref('')
const filter = ref('All Events')

onMounted(() => {
    // Only fetch if empty or we want fresh list on admin page load
    eventStore.fetchEvents()
})

const filteredEvents = computed(() => {
    // Safety check for empty array
    if (!eventStore.events) return []

    return eventStore.events.filter(e => {
        // Search Filter
        const matchesSearch = e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                              (e.location && e.location.toLowerCase().includes(searchQuery.value.toLowerCase()))
        
        // Tab Filter (Mock logic for now, or real date logic)
        let matchesFilter = true
        if (filter.value === 'Upcoming') {
            matchesFilter = new Date(e.date) > new Date()
        }

        return matchesSearch && matchesFilter
    })
})

function formatDate(dateStr) {
    if (!dateStr) return 'TBD'
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

import { useToastStore } from '../../stores/toast'
import Modal from '../../components/ui/Modal.vue'

const toastStore = useToastStore()

const isDeleteModalOpen = ref(false)
const eventToDelete = ref(null)

function handleDelete(id) {
    eventToDelete.value = id
    isDeleteModalOpen.value = true
}

async function confirmDelete() {
    if (!eventToDelete.value) return

    try {
        await eventStore.deleteEvent(eventToDelete.value)
        toastStore.success("Event deleted successfully")
        isDeleteModalOpen.value = false
        eventToDelete.value = null
    } catch (e) {
        toastStore.error("Failed to delete event")
    }
}
</script>

<template>
    <div class="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-sans">
        <!-- Delete Confirmation Modal -->
        <Modal
            :isOpen="isDeleteModalOpen"
            title="Delete Event"
            message="Are you sure you want to delete this event? This action will also remove all user registrations and cannot be undone."
            type="danger"
            confirmText="Delete"
            cancelText="Cancel"
            :isLoading="eventStore.isLoadingAction"
            @close="isDeleteModalOpen = false"
            @confirm="confirmDelete"
        />

        <!-- Top App Bar -->
        <div class="sticky top-0 z-10 bg-white border-b border-gray-100">
             <div class="flex items-center p-4 pb-2 justify-between max-w-7xl mx-auto">
                <div @click="router.back()" class="text-[#1C1C1E] flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
                </div>
                <h1 class="text-[#1C1C1E] text-xl font-semibold leading-tight tracking-[-0.015em] flex-1 text-center">Manage Events</h1>
                <div class="flex size-10 shrink-0 items-center justify-center"></div>
            </div>
        </div>

        <main class="w-full max-w-7xl mx-auto flex-1 flex flex-col">
            <!-- Search Bar -->
            <div class="px-4 py-3">
                <label class="flex flex-col min-w-40 h-12 w-full">
                    <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                        <div class="text-text-secondary flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0">
                            <span class="material-symbols-outlined">search</span>
                        </div>
                        <input v-model="searchQuery" class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search events..." />
                    </div>
                </label>
            </div>

             <!-- Segmented Buttons -->
            <div class="flex px-4 py-3">
                <div class="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#f0f2f5] p-1">
                    <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200"
                        :class="filter === 'All Events' ? 'bg-primary shadow-md text-white' : 'text-text-secondary'">
                        <span class="truncate text-sm font-medium">All Events</span>
                        <input v-model="filter" class="hidden" type="radio" value="All Events" />
                    </label>
                    <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200"
                        :class="filter === 'Upcoming' ? 'bg-primary shadow-md text-white' : 'text-text-secondary'">
                        <span class="truncate text-sm font-medium">Upcoming</span>
                        <input v-model="filter" class="hidden" type="radio" value="Upcoming" />
                    </label>
                </div>
            </div>

            <!-- Event List -->
            <div class="flex-grow px-4 space-y-3 pb-28 pt-2">
                <div v-for="event in filteredEvents" :key="event.id" 
                 @click="router.push({ name: 'admin-event-attendees', params: { id: event.id || event._id } })"
                 class="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm justify-between transition-shadow hover:shadow-md cursor-pointer">
                    <div class="flex items-center gap-4 w-full">
                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-xl h-14 w-14 shrink-0 border border-gray-100" 
                             :style="{ backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1514320291940-bf79717435f5?w=200&auto=format&fit=crop&q=60'})` }"></div>
                        <div class="flex flex-col justify-center grow min-w-0">
                            <p class="text-text-main text-base font-semibold leading-normal truncate">{{ event.title }}</p>
                            <p class="text-text-secondary text-sm font-normal leading-normal truncate">{{ event.location || 'Location TBD' }}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="text-xs font-medium text-white bg-primary/80 px-2 py-0.5 rounded-full">{{ formatDate(event.date) }}</span>
                                <span class="text-xs font-medium text-text-muted bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[10px]">group</span> {{ event.attendees_count || 0 }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="shrink-0 flex items-center gap-2">
                         <Button 
                            @click.stop="router.push({ name: 'admin-edit-event', params: { id: event.id || event._id } })"
                            variant="secondary" 
                            size="sm"
                         >
                            <span class="material-symbols-outlined text-sm">edit</span>
                         </Button>
                         <Button 
                            @click.stop="handleDelete(event.id || event._id)"
                            variant="danger" 
                            size="sm"
                         >
                            <span class="material-symbols-outlined text-sm">delete</span>
                         </Button>
                    </div>
                </div>

                 <!-- Empty State -->
                <div v-if="filteredEvents.length === 0" class="flex flex-col items-center justify-center text-center py-10 opacity-60">
                    <span class="material-symbols-outlined text-4xl mb-2">event_busy</span>
                    <p>No events found</p>
                </div>
            </div>
        </main>

        <!-- Floating Action Button (Create) -->
        <div class="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200/70">
            <div class="p-5 pt-3 w-full max-w-7xl mx-auto">
                <Button @click="router.push({ name: 'admin-create-event' })" variant="primary" size="lg" width="full">
                    <span class="flex items-center gap-2 justify-center">
                        <span class="material-symbols-outlined">add</span> Create New Event
                    </span>
                </Button>
            </div>
        </div>
    </div>
</template>
