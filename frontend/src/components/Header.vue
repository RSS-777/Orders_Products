<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex';
import logo from '../assets/logo.png'
import clock from '../assets/clock.png'

const store = useStore();
const searchValue = ref<string>('');
const formattedDate = ref<string>('')
const formattedDay = ref<string>('')
const formattedTime = ref<string>('')

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && searchValue.value.trim() !== '') {
    store.commit('search/setSearch', { text: searchValue.value.trim() });
    searchValue.value = '';
    setTimeout(() => {
        store.commit('search/clearSearch');
    }, 3000)
  }
};

function updateDateTime() {
    const now = new Date()
    const weekday = now.toLocaleDateString('ru-RU', { weekday: 'long' })
    const dayOfWeek = weekday.charAt(0).toUpperCase() + weekday.slice(1)

    const day = now.getDate().toString().padStart(2, '0')
    const monthShort = now.toLocaleString('ru-RU', { month: 'short' })
    const month = monthShort.charAt(0).toUpperCase() + monthShort.slice(1).replace('.', '')
    const year = now.getFullYear()

    formattedDate.value = `${day} ${month}, ${year}`
    formattedDay.value = dayOfWeek

    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    formattedTime.value = `${hours}:${minutes}`
}

let timeoutId: number | undefined
let intervalId: number | undefined

onMounted(() => {
    updateDateTime()

    const now = new Date()
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000

    timeoutId = window.setTimeout(() => {
        updateDateTime()
        intervalId = window.setInterval(updateDateTime, 60 * 1000)
    }, msUntilNextMinute)
})

onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
    if (intervalId) clearInterval(intervalId)
})
</script>

<template>
    <header
        class="header container-fluid d-flex align-items-center justify-content-around px-2 py-2 w-100 position-relative z-2 bg-white">
        <div
            class="block block--width d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between w-100">
            <div class="header__brand d-flex align-items-center">
                <img class="header__brand-logo me-2" width="45" height="45" :src="logo" alt="Logo" />
                <span class="header__brand-title">inventory</span>
            </div>

            <div class="header__search flex-grow-1 my-2 my-sm-0 mx-sm-3">
                <input class="header__search-input px-2" type="search" placeholder="Поиск" aria-label="Search" v-model="searchValue" @keypress="handleKeyPress"/>
            </div>
        </div>

        <div class="header__info d-flex align-items-center flex-column flex-shrink-0 align-self-start">
            <span class="header__info-label align-self-end align-self-sm-start">{{ formattedDay }}</span>
            <div class="d-flex flex-column flex-sm-row align-items-end align-items-sm-center">
                <span class="me-sm-3">{{ formattedDate }}</span>
                <div class="d-flex align-items-center">
                    <img :src="clock" alt="Image clock" width="18" class="mx-2">
                    <span>{{ formattedTime }}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    box-shadow: 0 4px 6px -2px rgba(85, 85, 85, 0.5);
}

.header__brand {
    gap: 5px;
}

.header__brand-logo {
    object-fit: contain;
}

.header__brand-title {
    font-weight: 500;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #80B548;
}

.block--width {
    max-width: 580px;
}

.header__search {
    max-width: 320px;
}

.header__search-input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #C0C8D1;
    background-color: #F0F3F5;
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
