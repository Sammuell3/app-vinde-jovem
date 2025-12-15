<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InfoRow from '../components/ui/InfoRow.vue'
import Button from '../components/ui/Button.vue'
import Modal from '../components/ui/Modal.vue'
import ShareSheet from '../components/ui/ShareSheet.vue'
import { useEventStore } from '../stores/event'
import { useToastStore } from '../stores/toast'
import { ref } from 'vue'
import { formatDate } from '../utils/dateUtils'
import { formatPrice } from '../utils/currencyUtils'

const route = useRoute()
const router = useRouter()
const eventStore = useEventStore()
const toast = useToastStore()

const event = computed(() => eventStore.currentEvent)

onMounted(() => {
    console.log("EventDetails mounted. ID:", route.params.id)
    if (route.params.id) {
        eventStore.fetchEventDetails(route.params.id)
    } else {
        console.error("No ID parameter found in route")
    }
})

// Modal State
const showModal = ref(false)
const showShareSheet = ref(false)
const modalConfig = ref({
    title: '',
    message: '',
    type: 'info',
    showCancel: false,
    confirmText: 'OK',
    onConfirm: () => showModal.value = false
})

const openModal = (config) => {
    modalConfig.value = {
        showCancel: false,
        confirmText: 'OK',
        onConfirm: () => showModal.value = false,
        ...config
    }
    showModal.value = true
}

const goBack = () => {
    router.back()
}

const handleJoin = async () => {
    if (event.value.isJoined) {
        // Confirm cancellation
        openModal({
            title: 'Cancel Registration?',
            message: 'Are you sure you want to cancel your registration for this event?',
            type: 'danger',
            showCancel: true,
            confirmText: 'Yes, Cancel',
            onConfirm: async () => {
                const success = await eventStore.leaveEvent(route.params.id)
                if (success) {
                    showModal.value = false
                    event.value.isJoined = false // Instant visual update
                    toast.success('Registration cancelled successfully.')
                } else {
                    showModal.value = false
                    toast.error(eventStore.error || "Failed to cancel. Please try again.")
                }
            }
        })
    } else {
        const success = await eventStore.joinEvent(route.params.id)
        if (success) {
            event.value.isJoined = true // Instant visual update
            toast.success('Registration successful! You can see this event in your Profile.')
        } else {
            toast.error(eventStore.error || "Failed to register. Please try again.")
        }
    }
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
                <button @click="showShareSheet = true" class="flex size-10 items-center justify-center rounded-full text-text-main hover:bg-black/5 transition-colors">
                    <span class="material-symbols-outlined">ios_share</span>
                </button>
            </div>
        </div>

        <main class="grow pb-28 max-w-7xl mx-auto w-full px-4">
            <!-- Loading State -->
            <div v-if="eventStore.isLoadingDetails" class="flex items-center justify-center h-64">
                <p class="text-text-muted text-lg">Loading event details...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="eventStore.error" class="flex flex-col items-center justify-center h-64 gap-4">
                <p class="text-red-500">{{ eventStore.error }}</p>
                <Button @click="goBack" variant="outline">Go Back</Button>
            </div>

            <!-- Event Not Found State (Fallback) -->
            <div v-else-if="!event" class="flex flex-col items-center justify-center h-64 gap-4">
                <p class="text-text-muted text-lg">Event not found</p>
                <div class="text-sm text-gray-400">ID: {{ route.params.id }}</div>
                <Button @click="goBack" variant="outline">Go Back</Button>
            </div>

            <!-- Content -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:mt-8 items-start">
                <!-- Left Column: Image -->
                <div class="w-full">
                    <div 
                        class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl aspect-video md:aspect-[4/3] shadow-sm sticky top-24" 
                        :style="{ backgroundImage: `url('${event.image || ''}')` }"
                    ></div>
                </div>

                <!-- Right Column: Content -->
                <div class="flex flex-col">
                    <h1 class="text-text-main tracking-tight text-[32px] md:text-5xl font-bold leading-tight text-left pb-3 pt-6 md:pt-0">
                        {{ event.title }}
                    </h1>

                    <div class="bg-surface rounded-lg p-2 space-y-1 shadow-sm border border-gray-100 mb-6">
                        <InfoRow icon="calendar_month" :text="formatDate(event.date)" />
                        <InfoRow icon="location_on" :text="event.location" />
                        <InfoRow icon="payments" :text="formatPrice(event.price)" />
                    </div>

                    <div class="mb-6">
                        <h2 class="text-xl font-bold text-text-main mb-2">About this event</h2>
                        <p class="text-text-muted text-base leading-relaxed">
                            {{ event.description }}
                        </p>
                    </div>

                    <div v-if="event.mapImage" class="mb-8">
                        <h2 class="text-xl font-bold text-text-main mb-2">Location</h2>
                        <div class="w-full h-48 rounded-lg overflow-hidden cursor-pointer shadow-sm">
                            <img class="w-full h-full object-cover" :src="event.mapImage" alt="Event Map Location" />
                        </div>
                    </div>

                    <!-- Desktop Register Button -->
                    <div class="hidden md:flex">
                        <Button 
                            v-if="event.isJoined"
                            class="rounded-full h-14 w-full shadow-lg shadow-red-500/30 transform hover:scale-[1.02]"
                            variant="destructive"
                            @click="handleJoin"
                            :disabled="eventStore.isLoadingAction"
                        >
                            {{ eventStore.isLoadingAction ? 'Processing...' : 'Cancel Registration' }}
                        </Button>
                        <Button 
                            v-else
                            class="rounded-full h-14 w-full shadow-lg shadow-primary/30 transform hover:scale-[1.02]"
                            @click="handleJoin"
                            :disabled="eventStore.isLoadingAction"
                        >
                            {{ eventStore.isLoadingAction ? 'Processing...' : 'Register Now' }}
                        </Button>
                    </div>
                </div>
            </div>
        </main>

        <!-- sticky Bottom Action (Mobile Only) -->
        <div v-if="event" class="md:hidden fixed bottom-0 left-0 right-0 z-10 p-4 bg-linear-to-t from-white via-white to-transparent pb-8">
            <div class="max-w-md mx-auto w-full">
                <Button 
                    v-if="event.isJoined"
                    class="rounded-full h-14 w-full shadow-lg shadow-red-500/30"
                    variant="destructive"
                    @click="handleJoin"
                    :disabled="eventStore.isLoadingAction"
                >
                    {{ eventStore.isLoadingAction ? 'Processing...' : 'Cancel Registration' }}
                </Button>
                <Button 
                    v-else
                    class="rounded-full h-14 w-full shadow-lg shadow-primary/30"
                    @click="handleJoin"
                    :disabled="eventStore.isLoadingAction"
                >
                    {{ eventStore.isLoadingAction ? 'Processing...' : 'Register Now' }}
                </Button>
            </div>
        </div>

        <Modal
            :isOpen="showModal"
            :title="modalConfig.title"
            :message="modalConfig.message"
            :type="modalConfig.type"
            :showCancel="modalConfig.showCancel"
            :confirmText="modalConfig.confirmText"
            :isLoading="eventStore.isLoadingAction"
            @close="showModal = false"
            @confirm="modalConfig.onConfirm"
        />

        <ShareSheet 
            :isOpen="showShareSheet" 
            :event="event"
            @close="showShareSheet = false"
        />
    </div>
</template>
