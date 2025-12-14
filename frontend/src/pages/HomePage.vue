<script setup>
import { ref, computed } from 'vue'
import Header from '../components/layout/Header.vue'
import SearchBar from '../components/ui/SearchBar.vue'
import EventCard from '../components/EventCard.vue'

// Mock Data (Duplicated to simulate many events)
const allEvents = [
    {
        id: 1,
        title: "Youth Worship Night",
        date: "Sat, Aug 24 - 7:00 PM",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB292HPmAsQoWGZUWOF9P4eY8-Zgmb6jG-M2pkuQa87ZJVu368Mpp6vcHXHyzOblXbAHxd--8dR48mdKmTXW7Y4k4TkIxoNjSlS5aTpKkCDzNKqqVNYcbz_YxpAtW7gG-e7Tu-riHzOAvpdqVuNbf76tEUWCu3_58vvjGYDjrr0zeP13XXi5FHNKmAKrFJknYehxbFohm9KAJIGyJ5F-syZdyl-kceEdy7prrYrEXlz1u6SQxLjaYJqxmFQA4Bzei080PgoLx4lAZS6",
        isJoined: false
    },
    {
        id: 2,
        title: "Summer Camp 2024",
        date: "Mon, Jul 15 - 9:00 AM",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXYO7BpYvFeHGhaDqErK_FIRiNLc849xaVbH_5Bqj1vtuGJPCHHuP-QopQr5rELZCNVzeX6IirjG19ZblG_Y62Yl6Z1Is1gSMzvutDzQN5bYpti0syB3IOUtT5Hy27mGFP_mMYtQ7Ayb4dJO5wbPWMieXMaCAjNfmrucQ8c3rxzEvTCN-zcR1CypjELvS8q-LMKaoqoMvOk5Y-mTzC0LPjtDf7BU2OF-oN76PVIvs_cl3IrQbpGaRn7P-votMKB-5xeOhPbTAim94J",
        isJoined: true
    },
    {
        id: 3,
        title: "Community BBQ",
        date: "Sun, Sep 1 - 1:00 PM",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRvjKGRoexSV9g39J-uY8pfEBm8z_ygqiWXAvWisJGtq3_8OnH99P9l5eJXpAzp5cA_eKgOszdKCaeKUd1G4LkdcGd655xD2NDnNY6dTdUl2_nEPQw-Wvy41XynFooTM8BAkx3SDrrDPsC5xIYspfDlL1wLrAuLedW5ZBJTRuvW2nTzoOHb8NdKIcX8XEWgvC0pDWvdwthex7ykpUUcvLT4EVmIomtvF1wSdHuTihog_SNXZKYRjij8Ts_Eh5HUvlzfh2Md7TUB__3",
        isJoined: false
    },
    { id: 4, title: "Bible Study", date: "Wed, Sep 5 - 8:00 PM", image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&auto=format&fit=crop&q=60", isJoined: false },
    { id: 5, title: "Charity Run", date: "Sat, Sep 10 - 6:00 AM", image: "https://images.unsplash.com/photo-1552674605-4696c0465d6d?w=800&auto=format&fit=crop&q=60", isJoined: false },
    { id: 6, title: "Music Workshop", date: "Fri, Sep 16 - 5:00 PM", image: "https://images.unsplash.com/photo-1514320291940-bf79717435f5?w=800&auto=format&fit=crop&q=60", isJoined: true },
]

const displayLimit = ref(3)

const displayedEvents = computed(() => {
    return allEvents.slice(0, displayLimit.value)
})

const hasMoreEvents = computed(() => {
    return displayLimit.value < allEvents.length
})

const loadMore = () => {
    // Load 3 more items
    displayLimit.value += 3
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
            <div v-if="displayedEvents.length > 0" class="flex flex-col gap-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <EventCard 
                        v-for="event in displayedEvents"
                        :key="event.id"
                        :id="event.id"
                        :title="event.title"
                        :date="event.date"
                        :image="event.image"
                        :isJoined="event.isJoined"
                    />
                </div>
                
                <!-- Load More Button -->
                <div v-if="hasMoreEvents" class="flex justify-center w-full">
                    <button 
                        @click="loadMore"
                        class="w-full md:w-auto px-6 py-3 md:py-2 rounded-lg md:rounded-full border border-gray-300 text-text-main font-medium hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Load More
                    </button>
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
