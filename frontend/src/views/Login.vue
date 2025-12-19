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
import Spinner from '../components/СomponentsForm/Spinner.vue';

const store = useStore();
const router = useRouter();
const email = ref<string>('admin@example.com');
const password = ref<string>('admin');
const message = ref<string>('');
const isSubmitting = ref<boolean>(false);
const successReg = ref<boolean>(false);

const schema = yup.object({
  email: yup.string().required('Введите email').email('Некорректный email'),

  password: yup.string().required('Введите пароль').min(3, 'Минимум 3 символа'),
});

const onSubmit = async () => {
  if (isSubmitting.value) return;
  successReg.value = false;

  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false });
    isSubmitting.value = true;

    const res = await login(email.value, password.value);

    if (res.success) {
      successReg.value = true;
      message.value = 'Вы успешно вошли!';

      setTimeout(() => {
        store.commit('auth/setAuth', {
          token: res.token,
          userId: res.userId,
          photoUrl: res.photoUrl,
        });

        message.value = '';
        isSubmitting.value = false;
        router.push('/arrival');
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
      isSubmitting.value = false;
    }, 3000);
  }
};
</script>

<template>
  <div class=" full-page d-flex justify-content-center align-items-center w-100 bg-light ">
    <div class="card shadow p-4 mx-2" style="width: 380px">
      <h1 class="text-center my-3">Авторизация</h1>
      <FetchMessage :message="message" :type="successReg ? 'success' : 'error'" />
      <form @submit.prevent="onSubmit" class="mb-3 mt-2">
        <BaseInput v-model="email" label="Email" type="email" autocomplete="email" id="login-email" />
        <BaseInput v-model="password" label="Password" type="password" autocomplete="current-password" id="login-pass" />
        <ButtonAuth name="Войти" :disabled="isSubmitting" />
      </form>
      <Spinner :isLoading="isSubmitting" />
      <AuthLink text="Нет аккаунта?" link="/register" name="Зарегистрироваться" :disabled="isSubmitting" />
    </div>
  </div>
</template>

<style scoped>
.btn-primary--active:active {
  transform: scale(0.98);
}
</style>
