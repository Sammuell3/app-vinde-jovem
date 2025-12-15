import api from './api'

export default {
    async getAll(params = {}) {
        const response = await api.get('/events/get-events', { params })
        return response.data
    },

    async create(eventData) {
        const response = await api.post('/events/create-event', eventData)
        return response.data
    },

    async getById(id) {
        const response = await api.get(`/events/get-event-by-id/${id}`)
        return response.data
    },

    async join(eventId, userId) {
        const response = await api.post('/join-events/', { event_id: eventId, user_id: userId })
        return response.data
    },

    async getMyEvents(userId) {
        const response = await api.get(`/join-events/my-events/${userId}`)
        return response.data
    },
    async leave(eventId) {
        const response = await api.delete(`/join-events/leave/${eventId}`)
        return response.data
    },
    // Admin Actions
    async delete(id) {
        const response = await api.delete(`/events/delete-event/${id}`)
        return response.data
    },
    async update(id, eventData) {
        const response = await api.put(`/events/update-event/${id}`, eventData)
        return response.data
    },
    async getAttendees(eventId) {
        const response = await api.get(`/join-events/event/${eventId}/users`)
        return response.data
    }
}
