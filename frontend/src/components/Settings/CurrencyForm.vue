<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { updateDefaultCurrency } from '../../api/settingsApi';
import ButtonAuth from '../СomponentsForm/ButtonAuth.vue';
import { fetchCurrency } from '../../services/settings';
import SelectInput from '../СomponentsForm/SelectInput.vue';
import Spinner from '../СomponentsForm/Spinner.vue';
import FetchMessage from '../СomponentsForm/FetchMessage.vue';

const store = useStore();
const token = store.getters['auth/token'];
const role = store.getters['auth/role'];
const currencyCurrent = computed(() => store.getters['settings/defaultCurrency']);
const isLoading = ref<boolean>(false);
const message = ref<string>('');
const isSeccess = ref<boolean>(false);
const currency = ref<string>(currencyCurrent.value || 'USD');

const submitForm = async () => {
  if (!token || isLoading.value || !currency.value) return;

  if (!['admin', 'manager'].includes(role)) {
    message.value = 'У вас нет прав!!!';

    setTimeout(() => {message.value = ''}, 2000)
    return;
  }

  try {
    isLoading.value = true;
    const res = await updateDefaultCurrency(currency.value, token);

    if (res.success) {
      isSeccess.value = true;
      message.value = 'Валюта по умолчанию успешно обновлена.';

      setTimeout(() => {
        fetchCurrency(true);
        isSeccess.value = false;
        message.value = '';
        isLoading.value = false;
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
</script>

<template>
  <form class="form-currency mx-auto mt-4" @submit.prevent="submitForm">
    <div class="mb-3">
      <SelectInput v-model="currency" name="currency" label="Валюта по умолчанию" :options="['USD', 'UAH']" />
      <ButtonAuth name="Сохранить изменения" :disabled="isLoading" />
    </div>
    <FetchMessage :message="message" :type="isSeccess ? 'success' : 'error'" />
    <Spinner :isLoading="isLoading" />
  </form>
</template>

<style scoped>
.form-currency {
  width: 100%;
  max-width: 400px;
}
</style>
