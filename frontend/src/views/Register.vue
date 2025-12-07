<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useStore } from 'vuex';
import { register } from '../api/authApi';

const router = useRouter();
const store = useStore();

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(4),
});

const onSubmit = async () => {
    error.value = '';
    
    try {
        await schema.validate({ name: name.value, email: email.value, password: password.value }, { abortEarly: false });

        const res = await register(name.value, email.value, password.value);

        if (!res.success) {
            error.value = res.error || 'Registration failed';
            setTimeout(() => (error.value = ''), 3000);
            return;
        }

        store.commit('auth/setAuth', {
            token: res.token,
            userId: res.userId,
            photoUrl: res.photoUrl,
        });

        router.push('/login');

    } catch {
        error.value = 'Validation error';
        setTimeout(() => (error.value = ''), 3000);
    }
};
</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
        <div class="card shadow p-3 mx-2" style="width: 380px;">
            <h3 class="text-center mb-3">Регистрация</h3>

            <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

            <form @submit.prevent="onSubmit">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input v-model="name" type="text" class="form-control" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input v-model="email" type="email" class="form-control" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" />
                </div>

                <button class="btn btn-success w-100" type="submit">Register</button>
            </form>

            <div class="text-center mt-3">
                <span>Уже есть аккаунт? </span>
                <a href="#" @click.prevent="router.push('/login')">Войти</a>
            </div>
        </div>
    </div>
</template>
