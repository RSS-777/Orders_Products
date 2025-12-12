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
import { formatDateForDB } from '../../utils/dateFormateForDB';
import { dataCompare } from '../../utils/dataCompare';

interface IFormData {
  serialNumber: number;
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
const defaultCurrency = ref<'USD' | 'UAH'>('UAH');
const seccessFetch = ref<boolean>(false)
let isSubmitting = false;

const fieldsOrder = [
  'serialNumber',
  'date',
  'status',
  'title',
  'type',
  'specification',
  'guarantee.start',
  'guarantee.end',
  'price'
];

const dataForm = ref<IFormData>({
  serialNumber: 0,
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
  serialNumber: yup.number().required('Серийный номер обязателен').moreThan(0, 'Серийный номер должен быть больше 0'),
  date: yup.date().required('Дата обязательна'),
  owner: yup.string().notRequired(),
  status: yup.string().required('Статус обязателен'),
  title: yup.string().required('Название обязательно'),
  type: yup.string().required('Тип обязателен'),
  specification: yup.string().required('Спецификация обязательна'),
  guarantee: yup.object({
    start: yup
      .date()
      .nullable()
      .transform((value, originalValue) => originalValue === '' ? null : value)
      .required('Дата начала гарантии обязательна'),

    end: yup
      .date()
      .nullable()
      .transform((value, originalValue) => originalValue === '' ? null : value)
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
        value: yup.number().min(0, 'Цена должна быть положительной').required(),
        symbol: yup.string().required(),
        isDefault: yup.number().oneOf([0, 1]),
      })
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

  if (isSubmitting) return;
  isSubmitting = true;

  try {
    for (const field of fieldsOrder) {
      await schema.validateAt(field, dataForm.value);
    }

    isLoading.value = true;
    dataForm.value.price.forEach(p => {
      p.isDefault = p.symbol === defaultCurrency.value ? 1 : 0;
    });

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

    if (!result.success) {
      message.value = result.error ?? 'Ошибка при создании продукта';
      setTimeout(() => (message.value = ''), 3000);
      return;
    }

    fetchProducts(true)
    fetchOrders(true)
    resetForm();
    seccessFetch.value = true
    message.value = 'Продукт успешно создан.'

    setTimeout(() => {
      message.value = ''
      seccessFetch.value = false
      closeForm();
    }, 3000)
  } catch (err: any) {
    message.value = err.errors ? err.errors[0] : err.message || 'Unknown error';
    setTimeout(() => (message.value = ''), 3000);
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  dataForm.value = {
    serialNumber: 0,
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
  defaultCurrency.value = 'USD';
  message.value = '';
};

const closeForm = () => {
  emit('close');
};
</script>

<template>
  <div
    class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50 border py-4">
    <form class="form w-100 overflow-y-auto rounded shadow bg-white mx-3" @submit="handleSubmit">
      <div>
        <h2 class="form__title text-center py-3">Создать продукт</h2>
        <div class="px-3">
          <BaseInput v-model="dataForm.date" label="Дата" type="datetime-local" />
          <BaseInput v-model="dataForm.serialNumber" label="Серийный номер" type="number" />
          <BaseInput v-model="dataForm.owner" label="Владелец" />
          <RadioGroup label="Статус" :options="[
            { label: 'В ремонте', value: 'in_repair' },
            { label: 'Готов', value: 'ready' }
          ]" v-model="dataForm.status" />
          <BaseInput v-model="dataForm.title" label="Название продукта" placeholder="Введите название"
            id="form__title" />
          <BaseInput v-model="dataForm.type" label="Тип продукта" placeholder="Введите тип" id="form__type" />
          <BaseInput v-model="dataForm.specification" label="Спецификация" placeholder="Введите спецификацию"
            id="form__spec" />
          <BaseInput v-model="dataForm.guarantee.start" label="Гарантия с" type="date" />
          <BaseInput v-model="dataForm.guarantee.end" label="Гарантия до" type="date" />
          <BaseInput v-model="dataForm.price[0].value" label="Цена USD" type="number" />
          <BaseInput v-model="dataForm.price[1].value" label="Цена UAH" type="number" />
          <div class="d-flex justify-content-between">
            <RadioGroup label="Основная" :options="[
              { label: 'USD', value: 'USD' },
              { label: 'UAH', value: 'UAH' }
            ]" v-model="defaultCurrency" />
            <RadioGroup label="Состояние" :options="[
              { label: 'Новый', value: 1 },
              { label: 'Б/У', value: 0 }
            ]" v-model="dataForm.isNew" />
          </div>
          <ButtonFile v-model="dataForm.photoFile" :message.sync="message" />
        </div>
      </div>
      <FormButtons :isLoading="isLoading" nameConfirm="Создать" typeBtnConfirm="submit" @cancel="closeForm" />
      <FetchMessage :message="message" :type="seccessFetch ? 'success' : 'error'" />
    </form>
  </div>
</template>

<style scoped>
.form {
  min-width: 300px;
  max-width: 600px;
  max-height: 100%;
}

input[type="radio"]:checked {
  accent-color: #5c961d;
}
</style>
