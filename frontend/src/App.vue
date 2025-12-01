<script setup lang="ts">
import Navigation from './components/Navigation.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="d-flex">
    <Navigation />
    <router-view />
  </div>
</template>

<style scoped></style>
