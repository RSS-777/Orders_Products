<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/authApi';
import * as yup from 'yup';
import FetchMessage from '../components/СomponentsForm/FetchMessage.vue';
import BaseInput from '../components/СomponentsForm/BaseInput.vue';
import ButtonAuth from '../components/СomponentsForm/ButtonAuth.vue';
import AuthLink from '../components/СomponentsForm/AuthLink.vue';

const store = useStore();
const router = useRouter();
const email = ref<string>('admin@example.com');
const password = ref<string>('admin');
const message = ref<string>('');

const schema = yup.object({
  email: yup.string().required('Введите email').email('Некорректный email'),

  password: yup.string().required('Введите пароль').min(3, 'Минимум 3 символа'),
});

const onSubmit = async () => {
  message.value = '';

  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false });
    const res = await login(email.value, password.value);

    if (!res.success) {
      message.value = 'Неверный логин или пароль';
      setTimeout(() => (message.value = ''), 3000);
      return;
    }

    store.commit('auth/setAuth', {
      token: res.token,
      userId: res.userId,
      photoUrl: res.photoUrl,
    });

    router.push('/arrival');
  } catch {
    message.value = 'Неверный логин или пароль';
    setTimeout(() => (message.value = ''), 3000);
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
    <div class="card shadow p-4 mx-2" style="width: 380px">
      <h1 class="text-center my-3">Авторизация</h1>
      <FetchMessage :message="message" type="error" />
      <form @submit.prevent="onSubmit" class="mb-3 mt-2">
        <BaseInput v-model="email" label="Email" type="email" autocomplete="email" id="login-email" />
        <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password" id="login-pass" />
        <ButtonAuth name="Войти" />
      </form>
      <AuthLink text="Нет аккаунта?" link="/register" name="Зарегистрироваться" />
    </div>
  </div>
</template>

<style scoped>
.btn-primary--active:active {
  transform: scale(0.98);
}
</style>
