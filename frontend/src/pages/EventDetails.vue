<script setup>
import { useRoute, useRouter } from 'vue-router'
import InfoRow from '../components/ui/InfoRow.vue'
import Button from '../components/ui/Button.vue'

const route = useRoute()
const router = useRouter()

const goBack = () => {
    router.back()
}

// Mock Data for display (In real app, fetch based on route.params.id)
const event = {
    title: "Youth Worship Night",
    date: "Saturday, Oct 26 • 7:00 PM",
    location: "123 Main Street, Anytown",
    description: "Join us for an unforgettable night of worship, community, and fun! This event is designed for youth to come together, connect with each other, and deepen their faith in a vibrant and energetic atmosphere. Expect powerful music, an inspiring message, and plenty of time to hang out with friends. Everyone is welcome!",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjIV2ZeTr9QY_yyVLa8iCodPnYJxwbCzXwWSD8NpsGUnQ3XvGo8MBq6vdW82lGBQwWoKFOqOZA8GrTnT7E6ffC8WOp8JHCceJalSMbmeT6deW4A1dXYffEAysWUJkSdohzs1pzsSL7p5zwpn8OVqRYMiEtGNqU2BlvSDXlA1uD36mgc5ViPmXwtysaxEn0Bcdej5p7q191lqRSB5PZqtvkiBQ0yLpu9vLGb_YZRDDfEa_ki99tghDeGbGXC8qPKO4YdMVhgJ5zEcEu",
    mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlkU4xJP8nyjKQcGmpZyGzEQtcTw6BHLS4rHB2ZVgL5om4XUr-1CY4uHp9xzBb0sxRO-iByCRMokxUc4GtDaKzATaAEOeTLm1bXW7nJVX4iKZpTq3YyIpg8ixdJxR5yFt3Y2t3fcxPVEDOS8YSGRK1PsBrBq_M8idrf0aeR_dXE48SlOwLVJ_hfNVLGk3KxrZCulYsU8U7zfkiaA35epm0H0h4_Ox74uZy1U8NAsHY1LjSjQJVBJHkrkUgEnBkJgIzKWkWW1FOqEo0"
}
</script>

<template>
    <div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background font-sans text-text-main">
        
        <!-- Navbar -->
        <div class="sticky top-0 z-10 flex h-14 bg-white/80 backdrop-blur-sm w-full border-b border-gray-100/50">
            <div class="flex items-center justify-between px-4 max-w-7xl mx-auto w-full">
                <button @click="goBack" class="flex size-10 items-center justify-center rounded-full text-text-main hover:bg-black/5 transition-colors">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <button class="flex size-10 items-center justify-center rounded-full text-text-main hover:bg-black/5 transition-colors">
                    <span class="material-symbols-outlined">ios_share</span>
                </button>
            </div>
        </div>

        <main class="flex-grow pb-28 max-w-7xl mx-auto w-full px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:mt-8 items-start">
                <!-- Left Column: Image -->
                <div class="w-full">
                    <div 
                        class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl aspect-video md:aspect-[4/3] shadow-sm sticky top-24" 
                        :style="{ backgroundImage: `url('${event.image}')` }"
                    ></div>
                </div>

                <!-- Right Column: Content -->
                <div class="flex flex-col">
                    <h1 class="text-text-main tracking-tight text-[32px] md:text-5xl font-bold leading-tight text-left pb-3 pt-6 md:pt-0">
                        {{ event.title }}
                    </h1>

                    <div class="bg-surface rounded-lg p-2 space-y-1 shadow-sm border border-gray-100 mb-6">
                        <InfoRow icon="calendar_month" :text="event.date" />
                        <InfoRow icon="location_on" :text="event.location" />
                    </div>

                    <div class="mb-6">
                        <h2 class="text-xl font-bold text-text-main mb-2">About this event</h2>
                        <p class="text-text-muted text-base leading-relaxed">
                            {{ event.description }}
                        </p>
                    </div>

                    <div class="mb-8">
                        <h2 class="text-xl font-bold text-text-main mb-2">Location</h2>
                        <div class="w-full h-48 rounded-lg overflow-hidden cursor-pointer shadow-sm">
                            <img class="w-full h-full object-cover" :src="event.mapImage" alt="Event Map Location" />
                        </div>
                    </div>

                    <!-- Desktop Register Button -->
                    <div class="hidden md:flex">
                        <Button class="rounded-full h-14 w-full shadow-lg shadow-primary/30 transform hover:scale-[1.02]">
                            Register Now
                        </Button>
                    </div>
                </div>
            </div>
        </main>

        <!-- sticky Bottom Action (Mobile Only) -->
        <div class="md:hidden fixed bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-white via-white to-transparent pb-8">
            <div class="max-w-md mx-auto w-full">
                <Button class="rounded-full h-14 w-full shadow-lg shadow-primary/30">
                    Register Now
                </Button>
            </div>
        </div>
    </div>
</template>
