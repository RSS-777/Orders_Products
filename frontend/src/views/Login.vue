<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../api/data";
// import { login } from "../api/userApi";
import * as yup from "yup";

const store = useStore();
const router = useRouter();

const email = ref<string>("admin@example.com");
const password = ref<string>("admin");
const error = ref<string>("");

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(3),
});

const onSubmit = async () => {
  error.value = "";

  try {
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false });

    const res = await login(email.value, password.value);

    if (!res.success) {
      error.value = "Incorrect login or password";
      setTimeout(() => (error.value = ""), 3000);
      return;
    }

    store.commit("auth/setAuth", {
      token: res.token,
      userId: res.userId,
      photoUrl: res.photoUrl,
    });

    router.push("/arrival");

  } catch {
    error.value = "Incorrect login or password";
    setTimeout(() => (error.value = ""), 3000);
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
    <div class="card shadow p-4" style="width: 380px;">
      <h3 class="text-center mb-3">Login</h3>

      <div v-if="error" class="alert alert-danger py-2">
        {{ error }}
      </div>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" />
        </div>

        <button class="btn btn-primary w-100" type="submit">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
