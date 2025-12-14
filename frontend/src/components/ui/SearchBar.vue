<script setup>
defineProps({
    placeholder: {
        type: String,
        default: 'Search'
    }
})
</script>

<template>
    <div class="w-full">
        <label class="flex flex-col h-12 w-full">
            <div class="flex w-full flex-1 items-stretch rounded-sm h-full shadow-sm">
                <div class="text-text-muted flex border-none bg-surface items-center justify-center pl-4 rounded-l-sm border-r-0">
                    <span class="material-symbols-outlined">search</span>
                </div>
                <input 
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-sm text-text-main focus:outline-0 focus:ring-0 border-none bg-surface h-full placeholder:text-text-muted px-4 pl-2 text-base font-normal leading-normal" 
                    :placeholder="placeholder" 
                />
            </div>
        </label>
    </div>
</template>
