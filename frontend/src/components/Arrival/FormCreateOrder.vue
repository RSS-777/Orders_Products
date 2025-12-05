<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import * as yup from "yup";
import { createOrder } from "../../api/ordersApi";
import FormButtons from "../СomponentsForm/FormButtons.vue";
import BaseInput from "../СomponentsForm/BaseInput.vue";
import BaseTextarea from "../СomponentsForm/BaseTextarea.vue";
import FetchMessage from "../СomponentsForm/FetchMessage.vue";

const emit = defineEmits(["close"]);

const store = useStore();
const token = store.getters["auth/token"];
const message = ref<string>("");
const isLoading = ref<boolean>(false);

const dataForm = ref({
  title: "",
  description: ""
});

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().max(500, "Description is too long").required("Description is required"),
});


const handleSubmit = async (e: Event) => {
  e.preventDefault();

  try {
    await schema.validate(dataForm.value);

    isLoading.value = true;

    const payload = {
      title: dataForm.value.title,
      description: dataForm.value.description,
      date: new Date().toISOString()
    };

    const res = await createOrder(token, payload);

    if (!res.success) {
      message.value = res.error ?? "Error creating order.";
      setTimeout(() => (message.value = ""), 2000);
      return;
    }

    closeForm()

  } catch (err) {
    if (err instanceof yup.ValidationError) {
      message.value = err.message;
    } else {
      message.value = "Unexpected error.";
    }
    setTimeout(() => (message.value = ""), 2000);
  } finally {
    isLoading.value = false;
  }
};

const closeForm = () => {
  emit("close");
}
</script>

<template>
  <div class="modal position-absolute d-flex justify-content-center align-items-center bg-dark bg-opacity-50">

    <form class="form__content w-100 rounded shadow bg-white overflow-hidden relative mx-3" @submit="handleSubmit">
      <h2 class="form__title text-center py-3">Создать заказ</h2>
      <BaseInput v-model="dataForm.title" label="Название заказа" placeholder="Введите название" id="form__title" />
      <BaseTextarea v-model="dataForm.description" label="Описание" id="form__textarea" placeholder="Введите описание"
        :rows="4" />
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
