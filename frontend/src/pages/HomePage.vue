<script setup>
import { onMounted } from 'vue'
import Header from '../components/layout/Header.vue'
import SearchBar from '../components/ui/SearchBar.vue'
import EventCard from '../components/EventCard.vue'
import Button from '../components/ui/Button.vue'
import { useEventStore } from '../stores/event'

const eventStore = useEventStore()

onMounted(() => {
    eventStore.fetchEvents()
})

const loadMore = () => {
    // Implement pagination logic in store if needed, or simply fetch more
    // For now, let's keep it simple or assume backend pagination
    console.log("Load more triggered - To be implemented with backend pagination")
}
</script>

<template>
    <div class="min-h-screen bg-background font-sans text-text-main pb-20">
        <Header />

        <main class="flex flex-col gap-8 px-4 py-6 max-w-7xl mx-auto w-full">
            <!-- Search Section -->
            <div class="w-full max-w-md mx-auto md:mx-0">
                <SearchBar placeholder="Search for events" />
            </div>

            <!-- Events Feed -->
            <div v-if="eventStore.isLoadingList" class="flex justify-center py-20">
                <p class="text-text-muted">Loading events...</p>
            </div>

            <div v-else-if="eventStore.events.length > 0" class="flex flex-col gap-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <EventCard 
                        v-for="event in eventStore.events"
                        :key="event._id" 
                        :id="event._id" 
                        :image="event.image" 
                        :title="event.title" 
                        :date="event.date"
                        :price="event.price"
                        :isJoined="event.isJoined"
                    />
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-20 text-center opacity-70">
                <div class="bg-gray-100 p-6 rounded-full mb-6">
                    <span class="material-symbols-outlined text-6xl text-text-muted">event_busy</span>
                </div>
                <h3 class="text-xl font-bold text-text-main mb-2">No events found</h3>
                <p class="text-text-muted max-w-xs mx-auto">It looks like there are no upcoming events at the moment. Check back later!</p>
            </div>
        </main>
    </div>
</template>
