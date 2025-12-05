<script setup lang="ts">
import basketImage from '../assets/basket.png'

const {show} = defineProps<{
  show: boolean;
  message?: string;
  name: string;
}>()

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <div v-if="show" class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
    <div class="modal__content w-100 rounded shadow bg-white overflow-hidden relative mx-3">
      <p class="modal__title p-4 text-black fs-5"><strong>Вы уверены, что хотите удалить этот {{ name }}?</strong></p>
      <slot></slot>
      <div class="modal__buttons d-flex justify-content-end align-items-center gap-2 p-4">
        <button class="btn modal__btn modal__btn--cancel text-white " @click="$emit('cancel')">отменить</button>
        <button class="btn modal__btn modal__btn-confirm bg-white text-danger rounded-5 px-4 shadow" @click="$emit('confirm')">
          <img :src="basketImage" alt="Delete icon" width="12" height="12">
          <span class="ms-2">удалить</span>
        </button>
      </div>
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

.modal__buttons {
  background-color: #80B548;
  min-height: 80px;
}

.modal__btn--cancel:hover {
  color: #E33545 !important;
}

.modal__btn-confirm:hover {
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}

.modal__message {
  color: #E33545;
  background-color: #ffcfd4;
}
</style>
