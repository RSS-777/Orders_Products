<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: File | null;
  message: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null): void;
  (e: 'update:message', msg: string): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const idGeneration = ref(`input-file-${Math.random().toString(36).slice(2)}`);

const openDialog = () => {
  fileInput.value?.click();
};

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0] ?? null;
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      emit('update:message', 'Допустимые форматы: jpg, jpeg, png');
      setTimeout(() => emit('update:message', ''), 3000);
      return;
    }
  }
  emit('update:modelValue', file);
};
</script>

<template>
  <div class="mb-3">
    <label class="form-label fw-medium" :for="idGeneration">Фото продукта</label>
    <div class="d-flex align-items-center overflow-hidden">
      <input ref="fileInput" type="file" :id="idGeneration" class="d-none" accept=".jpg,.jpeg,.png" @change="handleChange" />
      <button type="button" class="btn--style bg-transparent rounded-4 p-1 px-3 shadow-sm" @click="openDialog">Выбрать файл</button>
      <span v-if="modelValue" class="ms-2">{{ modelValue.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.btn--style {
  border: 1px solid #80b548;
  color: #5c961d;
}

.btn--style:active {
  transform: scale(0.95);
}
</style>
