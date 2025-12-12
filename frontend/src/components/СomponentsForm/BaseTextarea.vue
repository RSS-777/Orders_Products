<script setup lang="ts">
import { ref } from 'vue';
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

const idGeneration = ref( id || `text-area-${Math.random().toString(36).slice(2)}-${label.replace(/\s+/g, '-')}`);

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="form-group mb-3">
    <label :for="idGeneration" class="form-group__label fw-medium">{{ label }}</label>
    <textarea
      :id="idGeneration"
      :rows="rows ?? 3"
      class="form-group__textarea w-100 rounded py-1 px-2 mt-1"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    ></textarea>
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
