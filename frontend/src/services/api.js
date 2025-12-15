import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptores para adicionar Token JWT automaticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Interceptores de Resposta (Auto-Logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token expirado ou inválido
            console.warn("Sessão expirada. Deslogando usuário...")
            localStorage.removeItem('token')
            localStorage.removeItem('userId')

            // Redireciona para o login (Força bruta para garantir limpeza)
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
