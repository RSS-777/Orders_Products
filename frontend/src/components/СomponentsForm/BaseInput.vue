<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const { modelValue, label, placeholder, id, type } = defineProps<{
    modelValue: string
    label: string
    placeholder?: string
    id?: string
    type?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const updateValue = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

</script>

<template>
    <div class="form-group mb-3 px-4 ">
        <label :for="id" class="form-group__label fw-bold">{{ label }}</label>
        <input :id="id" :type="type || 'text'" class="form-group__input rounded p-1 mt-1 w-100"
            :placeholder="placeholder" :value="modelValue" @input="updateValue" />
    </div>
</template>

<style scoped>
.form-group__label {
    display: block;
}

.form-group__input {
    outline: none;
    border: 1px solid rgb(176, 176, 176);
}
</style>