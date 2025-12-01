<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink  to="/arrival" class="nav-link">приход</RouterLink>
    <RouterLink  to="/groups" class="nav-link">группы</RouterLink>
    <RouterLink  to="/products" class="nav-link">продукты</RouterLink>
    <RouterLink  to="/users" class="nav-link">пользователи</RouterLink>
    <RouterLink  to="/settings" class="nav-link">настройки</RouterLink>
  </nav>
</template>

<style scoped>

</style>
