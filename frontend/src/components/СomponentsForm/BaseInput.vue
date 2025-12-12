<script setup lang="ts">
import { ref } from 'vue';
const { modelValue, label, placeholder, id, type } = defineProps<{
  modelValue: string | number;
  label: string;
  placeholder?: string;
  id?: string;
  type?: string;
  autocomplete?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const idGeneration = ref(id || `input-${Math.random().toString(36).slice(2)}-${label.replace(/\s+/g, '-')}`);

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

</script>

<template>
  <div class="form-group mb-3">
    <label :for="idGeneration" class="form-group__label fw-medium">{{ label }}</label>
    <input
      :id="idGeneration"
      :type="type || 'text'"
      class="form-group__input rounded py-1 px-2 mt-1 w-100"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="updateValue"
    />
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
