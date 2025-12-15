<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    trailingIcon: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const inputType = computed(() => {
    if (props.type === 'password' && showPassword.value) {
        return 'text'
    }
    return props.type
})

const togglePassword = () => {
    showPassword.value = !showPassword.value
}
</script>

<template>
    <div class="flex flex-col min-w-40 flex-1 mb-4">
        <p v-if="label" class="text-text-primary text-base font-medium leading-normal pb-2">{{ label }}</p>
        <div class="relative flex w-full flex-1 items-stretch">
            <input 
                :type="inputType"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                :placeholder="placeholder"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] bg-white h-14 placeholder:text-text-secondary p-[15px] text-base font-normal leading-normal"
                :class="{ 'pr-12': type === 'password' || trailingIcon }"
            />
            
            <div 
                v-if="type === 'password'"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary cursor-pointer"
            >
                <span class="material-symbols-outlined" style="font-size: 24px;">
                    {{ showPassword ? 'visibility' : 'visibility_off' }}
                </span>
            </div>

            <div 
                v-else-if="trailingIcon"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary pointer-events-none"
            >
                <span class="material-symbols-outlined" style="font-size: 24px;">
                    {{ trailingIcon }}
                </span>
            </div>
        </div>
    </div>
</template>
