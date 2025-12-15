<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../../components/ui/Input.vue'

const router = useRouter()

const searchQuery = ref('')
const filter = ref('All Users')

// Mock Data
const users = ref([
    { id: 1, name: 'Isabella Costa', email: 'isabella.costa@email.com', events: 3, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Lucas Almeida', email: 'lucas.almeida@email.com', events: 1, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Sophia Oliveira', email: 'sophia.oliveira@email.com', events: 5, avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Gabriel Pereira', email: 'gabriel.p@email.com', events: 2, avatar: 'https://i.pravatar.cc/150?u=4' },
])

const filteredUsers = () => {
    // Basic filter logic
    return users.value.filter(u => 
        u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
}
</script>

<template>
    <div class="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden font-sans">
        <!-- Top App Bar -->
        <div class="sticky top-0 z-10 bg-white border-b border-gray-100">
            <div class="flex items-center p-4 pb-2 justify-between max-w-7xl mx-auto">
                <div @click="router.back()" class="text-[#1C1C1E] flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                    <span class="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
                </div>
                <h1 class="text-[#1C1C1E] text-xl font-semibold leading-tight tracking-[-0.015em] flex-1 text-center">User Management</h1>
                <div class="flex size-10 shrink-0 items-center justify-center"></div>
            </div>
        </div>

        <main class="w-full max-w-7xl mx-auto flex-1 flex flex-col">
            <!-- Search Bar -->
            <div class="px-4 py-3">
                 <!-- Using Input component for search if adaptable, usually Search component is better, but prompt asked for Input. 
                      Input.vue has a label loop. Search usually has icon prefix. 
                      The current Input.vue doesn't support prefix icon easily without slots or refactoring.
                      I will stick to raw input for search to match the EXACT design with the search icon inside, 
                      OR better yet, I will verify if I can easily use Input.vue? 
                      Input.vue has password toggle but no generic prefix slot.
                      Let's keep the custom search layout from the design to ensure visual fidelity as Input.vue might break the "search bar" look.
                      User said "use components... if necessary".
                       actually, the input component adds marginBottom `mb-4` which might affect spacing.
                      Let's CLEAN UP the code but keep the specific search input style if Input.vue is too rigid.
                      Actually, I can just use the provided styles.
                -->
                <label class="flex flex-col min-w-40 h-12 w-full">
                    <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                        <div class="text-text-secondary flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0">
                            <span class="material-symbols-outlined">search</span>
                        </div>
                        <input v-model="searchQuery" class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-main focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Search for users..." />
                    </div>
                </label>
            </div>

            <!-- Segmented Buttons -->
            <div class="flex px-4 py-3">
                <div class="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#f0f2f5] p-1">
                    <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200"
                        :class="filter === 'All Users' ? 'bg-primary shadow-md text-white' : 'text-text-secondary'">
                        <span class="truncate text-sm font-medium">All Users</span>
                        <input v-model="filter" class="hidden" type="radio" value="All Users" />
                    </label>
                    <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200"
                        :class="filter === 'Event Attendees' ? 'bg-primary shadow-md text-white' : 'text-text-secondary'">
                        <span class="truncate text-sm font-medium">Event Attendees</span>
                        <input v-model="filter" class="hidden" type="radio" value="Event Attendees" />
                    </label>
                </div>
            </div>

            <!-- User List -->
            <div class="flex-grow px-4 space-y-3 pb-24 pt-2">
                <div v-for="user in filteredUsers()" :key="user.id" class="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm justify-between transition-shadow hover:shadow-md cursor-pointer">
                    <div class="flex items-center gap-4 w-full">
                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 shrink-0 border border-gray-100" 
                             :style="{ backgroundImage: `url(${user.avatar})` }"></div>
                        <div class="flex flex-col justify-center flex-grow min-w-0">
                            <p class="text-text-main text-base font-semibold leading-normal truncate">{{ user.name }}</p>
                            <p class="text-text-secondary text-sm font-normal leading-normal truncate">{{ user.email }}</p>
                            <div class="mt-1">
                                <span class="text-xs font-medium text-white bg-primary/80 px-2 py-0.5 rounded-full">{{ user.events }} Events</span>
                            </div>
                        </div>
                    </div>
                    <div class="shrink-0">
                        <div class="text-text-secondary flex size-7 items-center justify-center">
                            <span class="material-symbols-outlined">chevron_right</span>
                        </div>
                    </div>
                </div>

                <!-- Empty State (Conditional) -->
                <div v-if="filteredUsers().length === 0" class="flex flex-col items-center justify-center text-center py-10 opacity-60">
                    <span class="material-symbols-outlined text-4xl mb-2">person_search</span>
                    <p>No users found</p>
                </div>
            </div>
        </main>
    </div>
</template>
