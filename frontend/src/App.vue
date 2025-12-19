<script setup lang="ts">
import Navigation from './components/Navigation.vue';
import Header from './components/Header.vue';
import { useStore } from 'vuex';

const store = useStore();
</script>

<template>
  <div class="wrapper min-vh-100 p-0 d-flex flex-column mx-auto">
    <Header v-if="store.getters['auth/isAuth']" />
    <div class="wrapper__pages d-flex flex-grow-1 overflow-hidden">
      <Navigation v-if="store.getters['auth/isAuth']" />
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1920px;
}

.wrapper__pages {
  background-color: #f0f3f5;
  min-height: 0; 
  overflow-y: auto; 
  -webkit-overflow-scrolling: touch;
}
</style>
