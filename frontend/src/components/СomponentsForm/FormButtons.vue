<script setup lang="ts">
import { useStore } from 'vuex';

const emit = defineEmits(['cancel', 'confirm']);
const store = useStore();
const role = store.getters['auth/role'];

const { isLoading, nameConfirm, typeBtnConfirm, imageConfirm } = defineProps<{
  isLoading?: boolean;
  nameConfirm: string;
  typeBtnConfirm: 'submit' | 'button';
  imageConfirm?: string;
}>();

const handleClick = () => {
  if (typeBtnConfirm === 'button') {
    emit('confirm');
  }
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <div class="form__buttons d-flex justify-content-end align-items-center gap-2 p-4">
    <button type="button" class="btn form__btn form__btn--cancel text-white rounded-5 px-4" @click="handleCancel" :disabled="isLoading">
      отменить
    </button>

    <button
      :type="typeBtnConfirm"
      class="btn form__btn form__btn--confirm bg-white text-danger rounded-5 px-4 shadow"
      :disabled="isLoading || !['admin', 'manager'].includes(role)"
      @click="handleClick"
    >
      <img :src="imageConfirm" v-if="imageConfirm" alt="Button icon" width="12" height="12" />
      <span class="ms-2">{{ nameConfirm }}</span>
    </button>
  </div>
</template>

<style scoped>
.form__buttons {
  background-color: #80b548;
  min-height: 80px;
}

.form__btn--cancel:hover {
  color: #e33545 !important;
}

.form__btn--confirm:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
</style>
