<script setup lang="ts">
import Navigation from './components/Navigation.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div class="container-xxl min-vh-100 p-0 d-flex flex-column">
    <Header />
    <div class="block-pages d-flex flex-grow-1">
      <Navigation />
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.block-pages {
  background-color: #F0F3F5;
}
</style>
