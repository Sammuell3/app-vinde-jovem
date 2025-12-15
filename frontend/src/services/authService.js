import api from './api'

export default {
    async login(credentials) {
        // Ex: credentials = { email, password }
        const response = await api.post('/users/user-login', credentials)
        return response.data
    },

    async register(userData) {
        const response = await api.post('/users/user-register', userData)
        return response.data
    },

    async getAllUsers() {
        const response = await api.get('/users/users-get')
        return response.data
    },

    async getProfile(userId) {
        const response = await api.get(`/users/user-get-by-id/${userId}`)
        return response.data
    },

    async updateProfile(userId, data) {
        const response = await api.put(`/users/user-update/${userId}`, data)
        return response.data
    }
}
