<script setup lang="ts">
import basket from '../assets/basket.png';
import FormButtons from './СomponentsForm/FormButtons.vue';
import FetchMessage from './СomponentsForm/FetchMessage.vue';

const { message, name, isLoading, success } = defineProps<{
  message?: string | null;
  name: string;
  isLoading?: boolean;
  success?: boolean;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const handleCancel = () => {
  emit('cancel');
};

const handleConfirm = () => {
  emit('confirm');
};
</script>

<template>
  <div class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
    <div class="modal__content w-100 rounded shadow bg-white overflow-hidden relative mx-3">
      <p class="modal__title p-4 text-black fs-5">
        <strong>Вы уверены, что хотите удалить этот {{ name }}?</strong>
      </p>
      <slot></slot>
      <FormButtons
        :isLoading="isLoading || success"
        nameConfirm="Удалить"
        typeBtnConfirm="button"
        @cancel="handleCancel"
        @confirm="handleConfirm"
        :imageConfirm="basket"
      />
      <FetchMessage :message="message" :type="success ? 'success' : 'error'" />
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
</style>
