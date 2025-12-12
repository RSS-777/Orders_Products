<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { register } from '../api/authApi';
import FetchMessage from '../components/СomponentsForm/FetchMessage.vue';
import BaseInput from '../components/СomponentsForm/BaseInput.vue';
import ButtonAuth from '../components/СomponentsForm/ButtonAuth.vue';
import AuthLink from '../components/СomponentsForm/AuthLink.vue';

const router = useRouter();
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const message = ref<string>('');
const successReg = ref<boolean>(false);
const schema = yup.object({
  name: yup.string().required('Введите имя'),
  email: yup.string().required('Введите email').email('Некорректный email'),
  password: yup.string().required('Введите пароль').min(4, 'Пароль минимум 4 символа'),
});

const onSubmit = async () => {
  message.value = '';
  successReg.value = false;

  try {
    await schema.validate({ name: name.value, email: email.value, password: password.value }, { abortEarly: false });

    const res = await register(name.value, email.value, password.value);

    if (res.success) {
      successReg.value = true;
      message.value = 'Вы успешно зарегистрировались';

      setTimeout(() => {
        message.value = '';
        router.push('/login');
      }, 3000);
      return;
    }

    throw new Error(res.error ?? 'Unknown error');
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      message.value = err.errors[0];
    } else {
      message.value = err.message || 'Unknown error';
    }

    setTimeout(() => (message.value = ''), 3000);
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
    <div class="card shadow p-4 mx-2" style="width: 380px">
      <h1 class="text-center my-3">Создать аккаунт</h1>
      <FetchMessage :message="message" :type="successReg ? 'success' : 'error'" />
      <form @submit.prevent="onSubmit" class="mb-3 mt-2">
        <BaseInput v-model="name" label="Name" autocomplete="name" id="registration-name" />
        <BaseInput v-model="email" label="Email" type="email" autocomplete="email" id="registration-email" />
        <BaseInput v-model="password" label="Password" type="password" autocomplete="new-password" id="registration-pass" />
        <ButtonAuth name="Регистрация" :disabled="successReg" />
      </form>
      <AuthLink text="Уже есть аккаунт?" link="'/login'" name="Войти" />
    </div>
  </div>
</template>
