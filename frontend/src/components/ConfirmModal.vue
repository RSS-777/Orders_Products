<script setup lang="ts">
import basketImage from '../assets/basket.png';
import FormButtons from './СomponentsForm/FormButtons.vue';

const { show } = defineProps<{
  show: boolean;
  message?: string;
  name: string;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const handleCansel = () => {
  emit('cancel');
};

const handleConfirm = () => {
  emit('confirm');
};
</script>

<template>
  <div v-if="show" class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
    <div class="modal__content w-100 rounded shadow bg-white overflow-hidden relative mx-3">
      <p class="modal__title p-4 text-black fs-5">
        <strong>Вы уверены, что хотите удалить этот {{ name }}?</strong>
      </p>
      <slot></slot>
      <FormButtons
        :isLoading="isLoading"
        nameConfirm="Удалить"
        typeBtnConfirm="button"
        @cancel="handleCansel"
        @confirmClick="handleConfirm"
        :imageConfirm="basketImage"
      />
      <p v-if="message" class="modal__message text-center">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal__content {
  min-width: 300px;
  max-width: 600px;
}

.modal__title {
  letter-spacing: 1px;
}

.modal__message {
  color: #e33545;
  background-color: #ffcfd4;
}
</style>
