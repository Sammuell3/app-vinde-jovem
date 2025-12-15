import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../services/authService'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    const userId = ref(localStorage.getItem('userId') || null)
    const isLoading = ref(false)
    const error = ref(null)

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 1)
    const userName = computed(() => user.value?.username || user.value?.name || 'User')
    const userAvatar = computed(() => user.value?.image || user.value?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y')

    // Actions
    async function login(credentials) {
        isLoading.value = true
        error.value = null
        try {
            const data = await authService.login(credentials)
            console.log("Login Response from Service:", data)
            // Backend returns: { message, user: { id... } } OR { message, id... } (Legacy)
            const responseData = data
            // Robust check: try nested 'user', or fallback to root data
            const userData = responseData.user || responseData

            console.log("Parsed User Data:", userData)

            if (!userData || !userData.id) {
                console.error("CRITICAL: User ID missing in login response!")
            }

            token.value = userData.token
            user.value = userData
            userId.value = userData.id

            // Persist token and ID
            localStorage.setItem('token', userData.token)
            localStorage.setItem('userId', userData.id)
            console.log("Saved to LocalStorage - Token:", userData.token ? "Yes" : "No", "UserID:", userData.id)

            // Redirect to dashboard/home
            router.push({ name: 'home' })
            return true
        } catch (err) {
            console.error(err)
            if (err.code === "ERR_NETWORK") {
                error.value = "Unable to connect to server. Please check your connection."
            } else {
                error.value = err.response?.data?.message || 'Login failed'
            }
            return false
        } finally {
            isLoading.value = false
        }
    }

    async function register(userData) {
        isLoading.value = true
        error.value = null
        try {
            const data = await authService.register(userData)
            // Backend logic: Register does NOT return token, only user data.
            // So we redirect to login instead of auto-login.
            router.push({ name: 'login' })
            return true
        } catch (err) {
            console.error(err)
            if (err.code === "ERR_NETWORK") {
                error.value = "Unable to connect to server. Please check your connection."
            } else {
                error.value = err.response?.data?.message || 'Registration failed'
            }
            return false
        } finally {
            isLoading.value = false
        }
    }

    function logout() {
        token.value = null
        user.value = null
        userId.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.push({ name: 'login' })
    }

    async function updateUserProfile(data) {
        isLoading.value = true
        error.value = null
        try {
            if (!userId.value) throw new Error("User ID not found")

            const response = await authService.updateProfile(userId.value, data)
            // Backend returns { message, user }
            const updatedUser = response.user || response

            user.value = { ...user.value, ...updatedUser }

            return true
        } catch (err) {
            console.error("Store: Update failed", err)
            error.value = err.response?.data?.message || 'Failed to update profile'
            return false
        } finally {
            isLoading.value = false
        }
    }

    async function checkAuth() {
        if (!token.value || !userId.value) return false
        try {
            const userData = await authService.getProfile(userId.value)
            // Backend returns { message, user }
            user.value = userData.user
            return true
        } catch (err) {
            // Se o token for inválido, logout
            logout()
            return false
        }
    }

    return {
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        isAdmin,
        userName,
        userAvatar,
        login,
        register,
        logout,
        checkAuth,
        updateUserProfile,
        userId // Exposing userId ref directly just in case
    }
})
