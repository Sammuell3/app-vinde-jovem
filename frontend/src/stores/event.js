import { defineStore } from 'pinia'
import { ref } from 'vue'
import eventService from '../services/eventService'

import { useAuthStore } from './auth'

export const useEventStore = defineStore('event', () => {
    // State
    const events = ref([])
    const authStore = useAuthStore()
    const currentEvent = ref(null)
    const myEvents = ref([])

    // Granular Loading States
    const isLoadingList = ref(false)
    const isLoadingDetails = ref(false)
    const isLoadingAction = ref(false)

    // Computed for backward compatibility if needed, or migration
    const isLoading = ref(false) // Keeping this as a generic fallback or we remove it

    const error = ref(null)

    // Actions
    async function fetchEvents(params = {}) {
        isLoadingList.value = true
        error.value = null
        try {
            const data = await eventService.getAll(params)
            const rawEvents = data.events || data || [] // Safety fallback

            if (!Array.isArray(rawEvents)) {
                console.error("Expected array of events, got:", rawEvents)
                events.value = []
                return
            }

            // Map _id to id and init isJoined
            let mappedEvents = rawEvents.map(e => ({
                ...e,
                id: e._id || e.id,
                isJoined: false
            }))

            // Calculate isJoined if authenticated
            if (authStore.isAuthenticated) {
                // Try to fetch my events if empty, but don't block hard if fails
                if (myEvents.value.length === 0) {
                    try { await fetchMyEvents() } catch (e) { console.warn("Could not fetch my events", e) }
                }
                const myEventIds = new Set(myEvents.value.map(e => e.id))
                mappedEvents = mappedEvents.map(e => ({
                    ...e,
                    isJoined: myEventIds.has(e.id)
                }))
            }

            events.value = mappedEvents
        } catch (err) {
            console.error(err)
            error.value = 'Failed to load events'
        } finally {
            isLoadingList.value = false
        }
    }

    async function fetchEventDetails(id) {
        console.log("Store: fetchEventDetails called with ID:", id)
        isLoadingDetails.value = true
        error.value = null
        currentEvent.value = null // Reset current event
        try {
            const data = await eventService.getById(id)
            console.log("Store: fetchEventDetails response:", data)

            // Handle { message, event } structure
            const eventData = data.event || data

            if (!eventData) {
                console.error("Store: No event data found in response")
                error.value = "Event not found"
                return
            }

            currentEvent.value = {
                ...eventData,
                id: eventData._id || eventData.id,
                isJoined: false // Default
            }

            // check if joined
            if (authStore.isAuthenticated) {
                if (myEvents.value.length === 0) {
                    try { await fetchMyEvents() } catch (e) { }
                }
                const myEventIds = new Set(myEvents.value.map(e => e.id))
                if (myEventIds.has(currentEvent.value.id)) {
                    currentEvent.value.isJoined = true
                }
            }
        } catch (err) {
            console.error("Store: fetchEventDetails failed:", err)
            error.value = 'Failed to load event details'
        } finally {
            isLoadingDetails.value = false
        }
    }

    async function leaveEvent(id) {
        isLoadingAction.value = true
        try {
            await eventService.leave(id)
            // Fix local state immediately
            if (currentEvent.value && currentEvent.value.id === id) {
                currentEvent.value.isJoined = false
            }
            // Sync Source of Truth First
            await fetchMyEvents()
            // Then refresh details to ensure consistency
            await fetchEventDetails(id)
            return true
        } catch (err) {
            console.error("Leave Event Error:", err)
            error.value = err.response?.data?.message || 'Failed to leave event'
            return false
        } finally {
            isLoadingAction.value = false
        }
    }

    async function joinEvent(id) {
        isLoadingAction.value = true
        // Optimistic update could go here
        try {
            // Need user ID for join
            console.log("Attempting to join event...")
            const uid = authStore.userId || localStorage.getItem('userId')
            console.log("Auth Check - Store UserID:", authStore.userId, "LocalStorage UserID:", localStorage.getItem('userId'), "Resolved UID:", uid)

            if (!uid) throw new Error("User not authenticated")
            await eventService.join(id, uid)

            // Update local state IMMEDIATELY (Optimistic UI)
            if (currentEvent.value && currentEvent.value.id === id) {
                currentEvent.value.isJoined = true
            }

            // CRITICAL: Fetch "My Events" FIRST to update the source of truth
            await fetchMyEvents()

            // THEN fetch details (which checks "My Events" to set isJoined)
            // If we did this in reverse, fetchEventDetails might see stale data in myEvents
            await fetchEventDetails(id)

            return true
        } catch (err) {
            console.error("Join Event Error:", err)
            error.value = err.response?.data?.message || err.message || 'Failed to join event'
            // If we have a specific message, log it for the user to see in console too
            if (err.response?.data) console.log("Backend Error Details:", err.response.data)
            return false
        } finally {
            isLoadingAction.value = false
        }
    }

    async function addEvent(eventData) {
        isLoadingAction.value = true
        error.value = null
        try {
            const uid = authStore.user?.id || localStorage.getItem('userId')
            if (!uid) throw new Error("User not authenticated")

            // Date Normalization
            let finalDate = eventData.date

            // If explicit originalDate exists, prefer it if it looks like YYYY-MM-DD
            if (eventData.originalDate && /^\d{4}-\d{2}-\d{2}$/.test(eventData.originalDate)) {
                finalDate = eventData.originalDate
            } else if (eventData.date.includes('T')) {
                finalDate = eventData.date.split('T')[0]
            } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(eventData.date)) {
                // Handle DD/MM/YYYY manually
                const [day, month, year] = eventData.date.split('/')
                finalDate = `${year}-${month}-${day}`
            }

            // Backend expects: title, description, date (YYYY-MM-DD), time, location, image, price, category, userAdmin
            const payload = {
                title: eventData.title,
                description: eventData.description,
                date: finalDate,
                time: eventData.time || '19:00',
                location: eventData.location,
                image: eventData.image || 'https://images.unsplash.com/photo-1514320291940-bf79717435f5',
                price: eventData.price || 0,
                category: eventData.category || 'General',
                userAdmin: uid
            }

            // If explicit time passed
            if (eventData.originalTime) payload.time = eventData.originalTime

            await eventService.create(payload)
            // Refresh list to show new event
            await fetchEvents()
            return true
        } catch (err) {
            console.error("Create Event Error:", err)
            error.value = err.response?.data?.message || 'Failed to create event'
            throw err
        } finally {
            isLoadingAction.value = false
        }
    }

    async function updateEvent(id, eventData) {
        isLoadingAction.value = true
        error.value = null
        try {
            const payload = {
                title: eventData.title,
                description: eventData.description,
                date: eventData.originalDate || (eventData.date.includes('T') ? eventData.date.split('T')[0] : eventData.date),
                time: eventData.time || '19:00',
                location: eventData.location,
                image: eventData.image,
                price: eventData.price === undefined ? 0 : eventData.price,
                category: eventData.category || 'General',
            }

            if (eventData.originalDate && /^\d{4}-\d{2}-\d{2}$/.test(eventData.originalDate)) {
                payload.date = eventData.originalDate
            }

            if (eventData.originalTime) payload.time = eventData.originalTime

            await eventService.update(id, payload)
            await fetchEvents()
            return true
        } catch (err) {
            console.error("Update Event Error:", err)
            error.value = err.response?.data?.message || 'Failed to update event'
            throw err
        } finally {
            isLoadingAction.value = false
        }
    }

    async function deleteEvent(id) {
        isLoadingAction.value = true
        error.value = null
        try {
            await eventService.delete(id)
            events.value = events.value.filter(e => e.id !== id)
            return true
        } catch (err) {
            console.error("Delete Event Error:", err)
            error.value = err.response?.data?.message || 'Failed to delete event'
            throw err
        } finally {
            isLoadingAction.value = false
        }
    }

    async function fetchMyEvents() {
        // isLoading.value = true // We don't want to block UI for this background sync mainly
        error.value = null
        try {
            if (!authStore.user?.id && !localStorage.getItem('userId')) return
            const uid = authStore.user?.id || localStorage.getItem('userId')

            const data = await eventService.getMyEvents(uid)
            // Backend returns { events: [{ _id, user_id, event_id: { ... } }] }
            const joins = data.events || []

            // Flatten structure: Map join object to event object + participation info
            myEvents.value = joins.map(j => {
                if (!j.event_id) return null // Safety check

                // Status Mapping
                const statusMap = {
                    'confirmado': { label: 'Confirmed', color: 'bg-green-100 text-green-800' },
                    'na lista de espera': { label: 'Waitlist', color: 'bg-yellow-100 text-yellow-800' },
                    'cancelado': { label: 'Cancelled', color: 'bg-red-100 text-red-800' }
                }
                const rawStatus = j.status || 'na lista de espera'
                const statusInfo = statusMap[rawStatus] || { label: rawStatus, color: 'bg-gray-100 text-gray-800' }

                return {
                    ...j.event_id,
                    id: j.event_id._id,
                    participationId: j._id,
                    joinedAt: j.createdAt,
                    status: statusInfo.label,
                    statusColor: statusInfo.color,
                    image: j.event_id.image || 'https://images.unsplash.com/photo-1514320291940-bf79717435f5?w=800&auto=format&fit=crop&q=60'
                }
            }).filter(e => e !== null)

        } catch (err) {
            console.error(err)
            // Don't show global error for partial failure on background fetch
            // error.value = 'Failed to load my events'
        } finally {
            // isLoading.value = false
        }
    }

    return {
        events,
        currentEvent,
        myEvents,
        isLoadingList,
        isLoadingDetails,
        isLoadingAction,
        error,
        fetchEvents,
        fetchEventDetails,
        joinEvent,
        leaveEvent,
        fetchMyEvents,
        addEvent,
        updateEvent,
        deleteEvent
    }
})
