<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue' // [NEW]
import RegisteredEventCard from '../components/RegisteredEventCard.vue'
import { useAuthStore } from '../stores/auth'
import { useEventStore } from '../stores/event'

const router = useRouter()
const authStore = useAuthStore()
const eventStore = useEventStore()

const isEditing = ref(false)
const editForm = reactive({
    username: '',
    image: ''
})

onMounted(() => {
    eventStore.fetchMyEvents()
})

const user = computed(() => ({
    name: authStore.userName,
    avatar: authStore.userAvatar
}))

// Simple pagination or use all events from store
const registeredEvents = computed(() => eventStore.myEvents)

const goBack = () => {
    router.back()
}

const startEdit = () => {
    editForm.username = user.value.name
    editForm.image = user.value.avatar
    isEditing.value = true
}

const cancelEdit = () => {
    isEditing.value = false
}

const saveProfile = async () => {
    // Send username instead of name to match backend model
    const success = await authStore.updateUserProfile({
        username: editForm.username,
        image: editForm.image
    })
    
    if (success) {
        // Optional: Force fetch to ensure consistency if backend logic does extra stuff
        await authStore.checkAuth()
        isEditing.value = false
    }
}
</script>

<template>
    <div class="relative flex h-auto min-h-screen w-full flex-col bg-background group/design-root overflow-x-hidden font-sans">
        
        <!-- Header -->
        <div class="sticky top-0 z-10 flex h-16 items-center bg-background/80 p-4 backdrop-blur-sm">
            <div>
                <button @click="goBack" class="flex size-10 items-center justify-center rounded-full text-text-main hover:bg-black/5 transition-colors">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </div>
            <div class="flex-1"></div>
            <h1 class="flex-1 text-center text-lg font-semibold text-text-main">Profile</h1>
            <div class="flex flex-1 items-center justify-end">
                <button class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-text-main hover:bg-black/5 transition-colors">
                    <span class="material-symbols-outlined text-text-main">settings</span>
                </button>
            </div>
        </div>

            

        <!-- User Info -->
        <div class="flex flex-col items-center gap-4 p-4 pt-6 text-center w-full max-w-md mx-auto">
            <!-- Edit Mode -->
            <div v-if="isEditing" class="w-full flex flex-col gap-4 bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-lg font-bold text-text-main mb-2">Edit Profile</h2>
                
                <Input 
                    v-model="editForm.username"
                    label="Username"
                    placeholder="Enter your username"
                />
                
                <Input 
                    v-model="editForm.image"
                    label="Profile Image URL"
                    placeholder="https://..."
                />

                <div v-if="authStore.error" class="text-red-500 text-sm">
                    {{ authStore.error }}
                </div>

                <div class="flex gap-3 justify-center mt-2">
                    <Button variant="outline" size="sm" @click="cancelEdit" :disabled="authStore.isLoading">
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" @click="saveProfile" :disabled="authStore.isLoading">
                        {{ authStore.isLoading ? 'Saving...' : 'Save Changes' }}
                    </Button>
                </div>
            </div>

            <!-- View Mode -->
            <div v-else class="flex flex-col items-center gap-4">
                <div class="h-28 w-28 rounded-full bg-cover bg-center bg-no-repeat shadow-sm ring-4 ring-white" 
                     :style="{ backgroundImage: `url('${user.avatar}')` }"
                     aria-label="User's profile picture">
                </div>
                <div class="flex flex-col items-center gap-2">
                    <p class="text-2xl font-bold text-text-main">{{ user.name }}</p>
                    <div class="w-auto">
                        <Button variant="soft" size="sm" width="auto" @click="startEdit">
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section Title -->
        <div class="px-4 pb-3 pt-8 max-w-md mx-auto w-full md:max-w-2xl">
            <h2 class="text-xl font-bold text-text-main">My Registered Events</h2>
        </div>

        <!-- Events List -->
        <div class="flex flex-col gap-4 p-4 pt-0 max-w-md mx-auto w-full md:max-w-2xl mb-8">
            
            <router-link 
                v-for="event in registeredEvents"
                :key="event.id"
                :to="{ name: 'event-details', params: { id: event.id } }"
                class="block hover:opacity-95 transition-opacity"
            >
                <RegisteredEventCard 
                    :title="event.title"
                    :date="event.date"
                    :location="event.location"
                    :image="event.image"
                    :status="event.status"
                    :statusColor="event.statusColor"
                />
            </router-link>

            <!-- Load More Button (To be implemented with pagination) -->
            <!-- <div v-if="hasMoreEvents" class="flex justify-center w-full mt-2">
                <Button ...>Load More</Button>
            </div> -->

        </div>
    </div>
</template>
