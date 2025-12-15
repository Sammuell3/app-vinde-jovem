<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEventStore } from '../../stores/event'
import { useToastStore } from '../../stores/toast'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'

const router = useRouter()
const eventStore = useEventStore()
const toastStore = useToastStore()

// Form Data State
const form = ref({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    isPaid: false,
    price: '',
    image: null
})

const handleImageUpload = () => {
    // Placeholder for image upload logic
    console.log("Image upload clicked")
    toastStore.info("Image upload coming soon!")
}

const route = useRoute()
const isEditing = ref(false)

onMounted(async () => {
    if (route.params.id) {
        isEditing.value = true
        try {
            // Fetch clean details
            await eventStore.fetchEventDetails(route.params.id)
            if (eventStore.currentEvent) {
                const e = eventStore.currentEvent
                form.value = {
                    title: e.title,
                    description: e.description,
                    date: e.date ? e.date.split('T')[0] : '', // Ensure YYYY-MM-DD for input
                    time: e.time,
                    location: e.location,
                    price: e.price,
                    isPaid: e.price > 0,
                    image: e.image
                }
            }
        } catch (e) {
            toastStore.error("Failed to load event for editing")
        }
    }
})

const handleSubmit = async () => {
    // Basic Validation
    if (!form.value.title || !form.value.date || !form.value.time || !form.value.location) {
        toastStore.warning("Please fill in: Title, Date, Time, and Location.")
        return
    }

    try {
        if (isEditing.value) {
             await eventStore.updateEvent(route.params.id, {
                title: form.value.title,
                description: form.value.description,
                date: form.value.date,
                time: form.value.time,
                location: form.value.location,
                price: form.value.isPaid ? parseFloat(form.value.price) : 0
            })
            toastStore.success("Event updated successfully!")
        } else {
             await eventStore.addEvent({
                title: form.value.title,
                description: form.value.description,
                date: form.value.date, 
                time: form.value.time,
                location: form.value.location,
                price: form.value.isPaid ? parseFloat(form.value.price) : 0
            })
            toastStore.success("Event created successfully!")
        }
        router.back()
    } catch (error) {
        console.error('Error saving event:', error)
        toastStore.error(error.message || "Failed to save event")
    }
}
</script>

<template>
    <div class="relative flex min-h-screen w-full flex-col bg-white font-sans">
        <!-- Top App Bar -->
        <div class="sticky top-0 z-10 bg-white border-b border-gray-100">
            <div class="flex items-center p-4 pb-3 justify-between max-w-7xl mx-auto">
                <button @click="router.back()" class="text-text-main flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-3xl">chevron_left</span>
                </button>
                <h1 class="text-text-main text-xl font-bold leading-tight flex-1 text-center pr-10">{{ isEditing ? 'Edit Event' : 'Create Event' }}</h1>
            </div>
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-4 space-y-6 pb-24 w-full max-w-7xl mx-auto">
            <!-- EmptyState for Image Upload -->
            <div class="flex flex-col">
                <div @click="handleImageUpload" class="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div class="text-primary flex size-12 shrink-0 items-center justify-center">
                        <span class="material-symbols-outlined text-4xl">add_photo_alternate</span>
                    </div>
                    <div class="flex max-w-[480px] flex-col items-center gap-1">
                        <p class="text-[#333333] text-base font-semibold leading-tight text-center">Upload Cover Image</p>
                        <p class="text-[#A0A0A0] text-sm font-normal leading-normal text-center">Tap here to select an image</p>
                    </div>
                </div>
            </div>

            <!-- Event Details Section -->
            <div class="space-y-4">
                <Input 
                    v-model="form.title"
                    label="Event Title"
                    placeholder="Enter the name of your event"
                />

                <div class="flex w-full flex-wrap items-end gap-4">
                    <div class="flex-1 min-w-[140px]">
                        <Input 
                            v-model="form.date"
                            label="Date"
                            type="date" 
                            placeholder="Select a date"
                        />
                    </div>
                    <div class="flex-1 min-w-[140px]">
                        <Input 
                            v-model="form.time"
                            label="Time"
                            type="time"
                            placeholder="Select a time"
                        />
                    </div>
                </div>

                <Input 
                    v-model="form.location"
                    label="Location"
                    placeholder="Enter the event address"
                    trailingIcon="location_on"
                />

                <label class="flex flex-col w-full text-left">
                    <p class="text-text-primary text-base font-medium leading-normal pb-2">Description</p>
                    <textarea v-model="form.description" class="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#333333] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white focus:border-primary h-32 placeholder:text-[#A0A0A0] p-4 text-base font-normal leading-normal" placeholder="Tell us more about the event..."></textarea>
                </label>

                <!-- Event Value Section -->
                <div class="space-y-4 pt-2">
                    <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4 border border-gray-100">
                        <div class="flex flex-col">
                            <p class="text-[#333333] text-base font-medium leading-normal">Paid Event</p>
                            <p class="text-text-muted text-sm font-normal">Enable if this event has an entry fee</p>
                        </div>
                        <label class="relative inline-flex cursor-pointer items-center">
                            <input v-model="form.isPaid" type="checkbox" class="peer sr-only" />
                            <div class="peer h-7 w-12 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full"></div>
                        </label>
                    </div>

                    <div v-if="form.isPaid" class="relative animate-in fade-in slide-in-from-top-2 duration-300">
                         <label class="text-text-primary text-base font-medium leading-normal pb-2 block text-left">Price (R$)</label>
                         <div class="relative">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg font-medium">R$</span>
                            <input 
                                v-model="form.price"
                                class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#333333] font-medium focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white focus:border-primary h-14 placeholder:text-[#A0A0A0] pl-12 pr-4 text-base leading-normal transition-shadow" 
                                type="number" 
                                step="0.01" 
                                placeholder="0.00"
                            />
                         </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Bottom Action Button -->
        <div class="sticky bottom-0 w-full bg-white border-t border-gray-100">
            <div class="p-4 pt-2 max-w-7xl mx-auto w-full">
                <Button 
                    @click="handleSubmit" 
                    variant="primary" 
                    size="lg" 
                    width="full"
                    :loading="eventStore.isLoadingAction"
                >
                    {{ isEditing ? 'Update Event' : 'Create Event' }}
                </Button>
            </div>
        </div>
    </div>
</template>
