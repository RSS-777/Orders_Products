<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const { modelValue, label, id, placeholder, rows } = defineProps<{
    modelValue: string;
    label: string;
    id?: string;
    placeholder?: string;
    rows?: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div class="form-group mb-3 px-4">
        <label :for="id" class="form-group__label fw-bold">{{ label }}</label>
        <textarea :id="id" :rows="rows ?? 3" class="form-group__textarea w-100 rounded p-1 mt-1"
            :placeholder="placeholder" :value="modelValue" @input="handleInput"></textarea>
    </div>
</template>

<style scoped>
.form-group__label {
    display: block;
}

.form-group__textarea {
    resize: none;
    outline: none;
    border: 1px solid rgb(176, 176, 176);
}
</style>
