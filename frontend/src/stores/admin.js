import { defineStore } from 'pinia'
import { ref } from 'vue'
import eventService from '../services/eventService'
import authService from '../services/authService'

export const useAdminStore = defineStore('admin', () => {
    // State
    const stats = ref({
        totalEvents: 0,
        upcomingEvents: 0,
        totalUsers: 0
    })
    const isLoading = ref(false)
    const error = ref(null)

    // Actions
    async function fetchDashboardStats() {
        isLoading.value = true
        error.value = null
        try {
            // Fetch Events
            const eventData = await eventService.getAll()
            const allEvents = eventData.events || eventData || []

            // Calculate Event Stats
            const now = new Date()
            stats.value.totalEvents = allEvents.length
            stats.value.upcomingEvents = allEvents.filter(e => new Date(e.date) >= now).length

            // Fetch Users
            const userData = await authService.getAllUsers()
            const allUsers = userData.user || userData || [] // Backend returns { user: [...] }

            // Calculate User Stats
            stats.value.totalUsers = allUsers.length

        } catch (err) {
            console.error("Admin Store: Failed to fetch stats", err)
            error.value = "Failed to load dashboard statistics"
        } finally {
            isLoading.value = false
        }
    }

    return {
        stats,
        isLoading,
        error,
        fetchDashboardStats
    }
})
