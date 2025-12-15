<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useAdminStore } from '../../stores/admin'
import { useRouter } from 'vue-router'
import AdminStatCard from '../../components/admin/AdminStatCard.vue'
import AdminActionCard from '../../components/admin/AdminActionCard.vue'
import Header from '../../components/layout/Header.vue'
import DashboardGreeting from '../../components/admin/DashboardGreeting.vue'

const authStore = useAuthStore()
const adminStore = useAdminStore()
const router = useRouter()

onMounted(() => {
    adminStore.fetchDashboardStats()
})
</script>

<template>
    <div class="flex flex-col min-h-screen bg-background pb-8">
        <Header />
        
        <main class="w-full max-w-7xl mx-auto">
            <DashboardGreeting />

            <!-- Overview Stats -->
            <div class="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                <AdminStatCard label="Eventos Totais" :value="adminStore.stats.totalEvents" />
                <AdminStatCard label="Próximos" :value="adminStore.stats.upcomingEvents" />
                <AdminStatCard label="Usuários Totais" :value="adminStore.stats.totalUsers" :fullWidth="true" />
            </div>

            <!-- Main Actions -->
            <h3 class="text-text-main text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Ações Principais</h3>
            <div class="flex flex-col gap-4 px-4">
                <AdminActionCard 
                    title="Gerenciar Eventos" 
                    description="Crie, edite e visualize os detalhes de todos os eventos." 
                    icon="event" 
                    routeName="admin-events" 
                />
                
                <AdminActionCard 
                    title="Gerenciar Usuários" 
                    description="Visualize usuários, gerencie inscrições e veja permissões." 
                    icon="group"
                    routeName="admin-users" 
                />
            </div>

            <!-- Quick Actions -->
            <h3 class="text-text-main text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-8">Ações Rápidas</h3>
            <div class="flex flex-col gap-3 px-4 pb-4">
                <button @click="router.push({ name: 'admin-create-event' })" class="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-12 bg-primary/20 px-4 text-primary text-base font-bold leading-normal hover:bg-primary/30 transition-colors">
                    <span class="material-symbols-outlined">add_circle</span>
                    <span class="truncate">Criar Novo Evento</span>
                </button>
                <button class="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-12 bg-primary/20 px-4 text-primary text-base font-bold leading-normal hover:bg-primary/30 transition-colors">
                    <span class="material-symbols-outlined">send</span>
                    <span class="truncate">Enviar Notificação</span>
                </button>
            </div>
        </main>
    </div>
</template>
