<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import * as yup from 'yup';
import FormButtons from '../СomponentsForm/FormButtons.vue';
import BaseInput from '../СomponentsForm/BaseInput.vue';
import FetchMessage from '../СomponentsForm/FetchMessage.vue';
import type { IPrice } from '../../types/product';

const emit = defineEmits(['close']);
const { idOrder } = defineProps<{ idOrder: number }>();

const store = useStore();
const token = store.getters['auth/token'];
const message = ref<string>('');
const isLoading = ref<boolean>(false);

const dataForm = ref({
  title: '',
  type: '',
  specification: '',
  guaranteeStart: '',
  guaranteeEnd: '',
  priceUSD: 0,
  priceUAH: 0,
  isNew: 1 as 0 | 1,
  photoFile: null as File | null,
});

const schema = yup.object({
  title: yup.string().required('Название обязательно'),
  type: yup.string().required('Тип обязателен'),
  specification: yup.string().required('Спецификация обязательна'),
  guaranteeStart: yup.date().required('Дата начала гарантии обязательна'),
  guaranteeEnd: yup
    .date()
    .min(yup.ref('guaranteeStart'), 'Дата окончания должна быть позже начала')
    .required('Дата окончания гарантии обязательна'),
  priceUSD: yup.number().min(0, 'Цена должна быть положительной').required('Цена в USD обязательна'),
  priceUAH: yup.number().min(0, 'Цена должна быть положительной').required('Цена в UAH обязательна'),
});

const handlePhotoChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      message.value = 'Допустимі формати: jpg, jpeg, png';
      setTimeout(() => (message.value = ''), 3000);
      return;
    }
    dataForm.value.photoFile = file;
  }
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  try {
    await schema.validate(dataForm.value);

    if (!dataForm.value.photoFile) {
      message.value = 'Будь ласка, виберіть фото';
      setTimeout(() => (message.value = ''), 3000);
      return;
    }

    isLoading.value = true;

    const formData = new FormData();
    formData.append('name', dataForm.value.title);
    formData.append('type', dataForm.value.type);
    formData.append('specification', dataForm.value.specification);
    formData.append('order_id', String(idOrder));
    formData.append('guarantee', JSON.stringify({
      start: dataForm.value.guaranteeStart,
      end: dataForm.value.guaranteeEnd,
    }));
    formData.append('price', JSON.stringify([
      { value: dataForm.value.priceUSD, symbol: 'USD', isDefault: 1 } as IPrice,
      { value: dataForm.value.priceUAH, symbol: 'UAH', isDefault: 0 } as IPrice,
    ]));
    formData.append('isNew', String(dataForm.value.isNew));
    formData.append('photo', dataForm.value.photoFile);

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      message.value = result.error ?? 'Помилка при створенні продукту';
      setTimeout(() => (message.value = ''), 2000);
      return;
    }

    closeForm();
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      message.value = err.errors[0];
    } else {
      message.value = err.message || 'Unknown error';
    }
    setTimeout(() => (message.value = ''), 3000);
  } finally {
    isLoading.value = false;
  }
};

const closeForm = () => {
  emit('close');
};
</script>

<template>
  <div class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
    <form class="form__content w-100 rounded shadow bg-white overflow-hidden relative mx-3" @submit="handleSubmit">
      <h2 class="form__title text-center py-3">Создать продукт</h2>
      <div class="px-4">
        <BaseInput v-model="dataForm.title" label="Название продукта" placeholder="Введите название" id="form__title" />
        <BaseInput v-model="dataForm.type" label="Тип продукта" placeholder="Введите тип" id="form__type" />
        <BaseInput v-model="dataForm.specification" label="Спецификация" placeholder="Введите спецификацию" id="form__spec" />
        <BaseInput v-model="dataForm.guaranteeStart" label="Гарантия с" type="date" id="form__guaranteeStart" />
        <BaseInput v-model="dataForm.guaranteeEnd" label="Гарантия до" type="date" id="form__guaranteeEnd" />
        <BaseInput v-model="dataForm.priceUSD" label="Цена USD" type="number" placeholder="Введите цену в USD" id="form__priceUSD" />
        <BaseInput v-model="dataForm.priceUAH" label="Цена UAH" type="number" placeholder="Введите цену в UAH" id="form__priceUAH" />
        <div class="mb-3">
          <label class="form-label fw-medium">Фото продукта</label>
          <input type="file" class="form-control" @change="handlePhotoChange" accept=".jpg,.jpeg,.png" />
        </div>
      </div>
      <FormButtons :isLoading="isLoading" nameConfirm="Создать" typeBtnConfirm="submit" @cancel="closeForm" />
      <FetchMessage :message="message" type="error" />
    </form>
  </div>
</template>

<style scoped>
.form__content {
  min-width: 300px;
  max-width: 600px;
}
</style>
