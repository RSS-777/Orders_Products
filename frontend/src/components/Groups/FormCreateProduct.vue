<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import * as yup from 'yup';
import type { IPrice, IGuarantee } from '../../types/product';
import FormButtons from '../СomponentsForm/FormButtons.vue';
import BaseInput from '../СomponentsForm/BaseInput.vue';
import FetchMessage from '../СomponentsForm/FetchMessage.vue';
import ButtonFile from '../СomponentsForm/ButtonFile.vue';
import RadioGroup from '../СomponentsForm/RadioGroup.vue';
import { createProduct } from '../../api/productsApi';
import { fetchProducts } from '../../services/product';
import { fetchOrders } from '../../services/orders';
import Spinner from '../СomponentsForm/Spinner.vue';
import { formatDateForDB } from '../../utils/dateFormateForDB';
import { dataCompare } from '../../utils/dataCompare';

interface IFormData {
  serialNumber: string;
  date: string;
  owner: string;
  status: 'in_repair' | 'ready';
  title: string;
  type: string;
  specification: string;
  guarantee: IGuarantee;
  price: [IPrice, IPrice];
  isNew: 0 | 1;
  photoFile: File | null;
}

const emit = defineEmits(['close']);
const { idOrder } = defineProps<{ idOrder: number }>();

const store = useStore();
const token = store.getters['auth/token'];
const message = ref<string>('');
const isLoading = ref<boolean>(false);
const successFetch = ref<boolean>(false);
const fieldsOrder = ['serialNumber', 'date', 'title', 'type', 'specification', 'guarantee.start', 'guarantee.end', 'price'];

const dataForm = ref<IFormData>({
  serialNumber: '',
  date: formatDateForDB(new Date()),
  owner: '',
  status: 'in_repair',
  title: '',
  type: '',
  specification: '',
  guarantee: { start: '', end: '' },
  price: [
    { value: 0, symbol: 'USD', isDefault: 0 },
    { value: 0, symbol: 'UAH', isDefault: 1 },
  ],
  isNew: 1,
  photoFile: null,
});

const schema = yup.object({
  serialNumber: yup
    .string()
    .required('Серийный номер обязателен')
    .matches(/^[a-zA-Z0-9\-]+$/, 'Серийный номер может содержать только английские буквы, цифры и дефисы'),
  date: yup.date().required('Дата обязательна'),
  owner: yup.string().notRequired(),
  title: yup.string().required('Название обязательно'),
  type: yup.string().required('Тип обязателен'),
  specification: yup.string().required('Спецификация обязательна'),
  guarantee: yup.object({
    start: yup
      .date()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
      .required('Дата начала гарантии обязательна'),

    end: yup
      .date()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
      .required('Дата окончания гарантии обязательна')
      .test('is-after-start', 'Дата окончания должна быть позже начала', function (value) {
        const { start } = this.parent;
        if (!start || !value) return true;
        return dataCompare(start, value);
      }),
  }),
  price: yup
    .array()
    .of(
      yup.object({
        value: yup
          .number()
          .transform((value, originalValue) => (originalValue === '' ? 0 : value))
          .min(0, 'Цена должна быть положительной')
          .required('Цена обязательна'),
      }),
    )
    .required('Цены обязательны'),
  photoFile: yup
    .mixed()
    .nullable()
    .notRequired()
    .test('fileSize', 'Файл должен быть не больше 500 КБ', (file) => {
      if (!file) return true;
      return (file as File).size <= 500 * 1024;
    }),
});

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (isLoading.value) return;

  try {
    isLoading.value = true;

    for (const field of fieldsOrder) {
      await schema.validateAt(field, dataForm.value);
    }

    const productToSend = {
      ...dataForm.value,
      order_id: idOrder,
      owner: dataForm.value.owner || undefined,
      photoFile: dataForm.value.photoFile ?? undefined,
      guarantee: {
        start: formatDateForDB(new Date(dataForm.value.guarantee.start)),
        end: formatDateForDB(new Date(dataForm.value.guarantee.end)),
      },
    };

    const result = await createProduct(productToSend, token);

    if (result.success) {
      successFetch.value = true;
      message.value = 'Продукт успешно создан.';
      fetchProducts(true);
      fetchOrders(true);
      resetForm();

      setTimeout(() => {
        isLoading.value = false;
        message.value = '';
        successFetch.value = false;
        closeForm();
      }, 3000);
      return;
    }

    throw new Error(result.error ?? 'Неизвестная ошибка');
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

const resetForm = () => {
  dataForm.value = {
    serialNumber: '',
    date: formatDateForDB(new Date()),
    owner: '',
    status: 'in_repair',
    title: '',
    type: '',
    specification: '',
    guarantee: { start: '', end: '' },
    price: [
      { value: 0, symbol: 'USD', isDefault: 0 },
      { value: 0, symbol: 'UAH', isDefault: 1 },
    ],
    isNew: 1,
    photoFile: null,
  };
};

const closeForm = () => {
  emit('close');
};
</script>

<template>
  <div class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50 border py-4">
    <form class="form w-100 overflow-y-auto rounded shadow bg-white mx-3" @submit="handleSubmit">
      <div>
        <h2 class="form__title text-center py-3">Создать продукт</h2>
        <div class="px-3">
          <BaseInput v-model="dataForm.date" label="Дата" type="datetime-local" />
          <BaseInput v-model="dataForm.serialNumber" label="Серийный номер" />
          <BaseInput v-model="dataForm.owner" label="Владелец" />
          <div class="d-flex justify-content-between">
            <RadioGroup
              label="Состояние"
              :options="[
                { label: 'Новый', value: 1 },
                { label: 'Б/У', value: 0 },
              ]"
              v-model="dataForm.isNew"
            />
          </div>
          <BaseInput v-model="dataForm.title" label="Название продукта" placeholder="Введите название" id="form__title" />
          <BaseInput v-model="dataForm.type" label="Тип продукта" placeholder="Введите тип" id="form__type" />
          <BaseInput v-model="dataForm.specification" label="Спецификация" placeholder="Введите спецификацию" id="form__spec" />
          <BaseInput v-model="dataForm.guarantee.start" label="Гарантия с" type="date" />
          <BaseInput v-model="dataForm.guarantee.end" label="Гарантия до" type="date" />
          <BaseInput v-model="dataForm.price[0].value" label="Цена USD" type="number" />
          <BaseInput v-model="dataForm.price[1].value" label="Цена UAH" type="number" />
          <ButtonFile v-model="dataForm.photoFile" :message.sync="message" />
        </div>
      </div>
      <Spinner :isLoading="isLoading" />
      <FormButtons :isLoading="isLoading" nameConfirm="Создать" typeBtnConfirm="submit" @cancel="closeForm" />
      <FetchMessage :message="message" :type="successFetch ? 'success' : 'error'" />
    </form>
  </div>
</template>

<style scoped>
.form {
  min-width: 300px;
  max-width: 600px;
  max-height: 100%;
}

input[type='radio']:checked {
  accent-color: #5c961d;
}
</style>
