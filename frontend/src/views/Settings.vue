<script setup lang="ts">
import CurrencyForm from '../components/Settings/CurrencyForm.vue';
</script>

<template>
  <div class="full-page w-100 p-4">
    <h1 class="text-center py-4">Настройки</h1>
    <p class="fst-italic w-75 mx-auto text-center">
      На этой странице можно управлять глобальными настройками системы: валютой по умолчанию, ролями пользователей, уведомлениями и другими
      параметрами, влияющими на работу всех пользователей.
    </p>
    <CurrencyForm />
  </div>
</template>
