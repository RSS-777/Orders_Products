<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useDate } from '../composables/useDate';
import { useTime } from '../composables/useTime';
import { useActiveSessions } from '../composables/useActiveSessions';
import logo from '../assets/logo.png';
import clock from '../assets/clock.png';
import person from '../assets/person.png';

const store = useStore();
const route = useRoute();
const searchValue = ref<string>('');

const { formattedDate, formattedDay } = useDate('slash');
const { formattedTime } = useTime();
const { activeSessions } = useActiveSessions();

const placeholderText = computed(() => {
  if (route.path === '/products') return 'Фильтр по типу';
  if (route.path === '/arrival') return 'Поиск по названию';
  if (route.path === '/groups') return 'Поиск по дате';
  return 'Поиск';
});

watch(searchValue, (newVal) => {
  if (!newVal?.trim() && route.path === '/products') {
    store.commit('search/clearSearch');
  }
});

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    store.commit('search/setSearch', { text: searchValue.value.trim() });

    if (route.path !== '/products') {
      searchValue.value = '';

      setTimeout(() => {
        store.commit('search/clearSearch');
      }, 1000);
    }
  }
};
</script>

<template>
  <header class="header container-fluid d-flex align-items-center justify-content-around px-2 py-2 w-100 position-relative z-2 bg-white">
    <div class="block block--width d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between w-100">
      <div class="header__brand d-flex align-items-center gap-1">
        <img class="header__brand-logo me-2 object-fit-contain" width="45" height="45" :src="logo" alt="Logo" />
        <span class="header__brand-title">inventory</span>
      </div>

      <div class="header__search flex-grow-1 my-2 my-sm-0 mx-sm-3">
        <input
          class="header__search-input px-2 w-100"
          type="search"
          id="header-search"
          :placeholder="placeholderText"
          aria-label="Search"
          name="headerSearch"
          v-model="searchValue"
          @keypress="handleKeyPress"
        />
      </div>
    </div>

    <div class="header__info d-flex align-items-center flex-column flex-shrink-0 align-self-start">
      <span class="header__info-label align-self-end align-self-sm-start">{{ formattedDay }}</span>
      <div class="d-flex flex-column flex-sm-row align-items-end align-items-sm-center">
        <span class="me-sm-3">{{ formattedDate }}</span>
        <div class="d-flex align-items-center">
          <img :src="clock" alt="Image clock" width="18" class="mx-2" />
          <span>{{ formattedTime }}</span>
          <div class="d-flex gap-1 align-items-center ms-3">
            <img :src="person" alt="" width="14" height="14" /><span>{{ activeSessions }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  box-shadow: 0 4px 6px -2px rgba(85, 85, 85, 0.5);
}

.header__brand-title {
  font-weight: 500;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #80b548;
}

.block--width {
  max-width: 580px;
}

.header__search {
  max-width: 320px;
}

.header__search-input {
  border-radius: 5px;
  border: 1px solid #c0c8d1;
  background-color: #f0f3f5;
  outline: none;
}

.header__search-input::placeholder {
  font-weight: 400;
  color: black;
}

.header__info {
  color: #293942;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
}
</style>
