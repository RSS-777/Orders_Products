<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { createOrder } from '../../api/ordersApi';
import FormButtons from '../СomponentsForm/FormButtons.vue';
import BaseInput from '../СomponentsForm/BaseInput.vue';
import BaseTextarea from '../СomponentsForm/BaseTextarea.vue';
import FetchMessage from '../СomponentsForm/FetchMessage.vue';
import { formatDateForDB } from '../../utils/dateFormateForDB';
import { fetchOrders } from '../../services/orders';
import Spinner from '../СomponentsForm/Spinner.vue';

const emit = defineEmits(['close']);

const store = useStore();
const token = store.getters['auth/token'];
const role = store.getters['auth/role'];
const message = ref<string>('');
const isLoading = ref<boolean>(false);
const seccessFetch = ref<boolean>(false);

const dataForm = ref({
  title: '',
  description: '',
});

const schema = yup.object({
  title: yup.string().required('Название обязательно.'),
  description: yup.string().max(500, 'Описание слишком длинное.').required('Описание обязательно.'),
});

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (isLoading.value) return;

  if (!['admin', 'manager'].includes(role)) {
    message.value = 'У вас нет прав!!!';

    setTimeout(() => {message.value = ''}, 2000)
    return;
  }

  try {
    isLoading.value = true;
    await schema.validate(dataForm.value, { abortEarly: false });

    const payload = {
      title: dataForm.value.title,
      description: dataForm.value.description,
      date: formatDateForDB(new Date()),
    };

    const res = await createOrder(token, payload);

    if (res.success) {
      seccessFetch.value = true;
      message.value = 'Приход успешно создан.';
      fetchOrders(true);

      setTimeout(() => {
        seccessFetch.value = false;
        message.value = '';
        isLoading.value = false;
        closeForm();
      }, 3000);
      return;
    }

    throw new Error(res.error ?? 'Неизвестная ошибка');
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      message.value = err.errors[0];
    } else {
      message.value = err.message || 'Неизвестная ошибка';
    }

    setTimeout(() => {
      message.value = '';
      isLoading.value = false;
    }, 3000);
  }
};

const closeForm = () => {
  emit('close');
};
</script>

<template>
  <div class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
    <form class="form__content w-100 rounded shadow bg-white overflow-hidden relative mx-3" @submit="handleSubmit">
      <h2 class="form__title text-center py-3">Создать заказ</h2>
      <div class="px-4">
        <BaseInput v-model="dataForm.title" label="Название заказа" placeholder="Введите название" id="form__title" />
        <BaseTextarea v-model="dataForm.description" label="Описание" id="form__textarea" placeholder="Введите описание"
          :rows="4" />
      </div>
      <Spinner :isLoading="isLoading" />
      <FormButtons :isLoading="isLoading" nameConfirm="Создать" typeBtnConfirm="submit" @cancel="closeForm" />
      <FetchMessage :message="message" :type="seccessFetch ? 'success' : 'error'" />
    </form>
  </div>
</template>

<style scoped>
.form__content {
  min-width: 300px;
  max-width: 600px;
}
</style>
