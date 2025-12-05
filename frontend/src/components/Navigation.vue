<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import personDefaultImg from '../assets/default.png'
import settingsImage from '../assets/settings.png'
import { updateUserPhoto } from '../api/userApi';

const route = useRoute()
const store = useStore();
const token: string = store.getters['auth/token'];
const userId: number = store.getters['auth/userId'];
const userImage: string = store.getters['auth/photoUrl'];
const isOpen = ref<boolean>(false)

const fileInput = ref<HTMLInputElement | null>(null)
const openFileDialog = () => {
  fileInput.value?.click()
}

const changePhoto = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const response = await updateUserPhoto(userId, file, token);

  if (response.success && response.data?.photoUrl) {
    store.commit('auth/setPhotoUrl', response.data.photoUrl);
  } else {
    console.error("Error updating photo");
  }
};

const closeMenu = () => {
  isOpen.value = false
  document.removeEventListener('click', handleClickOutside)
}

const handleClickOutside = (event: MouseEvent) => {
  const menu = document.querySelector('.navigation')
  const button = document.querySelector('.btn-navbar')

  if (
    menu &&
    !menu.contains(event.target as Node) &&
    button &&
    !button.contains(event.target as Node)
  ) {
    closeMenu()
  }
}


const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}
</script>

<template>
  <input ref="fileInput" type="file" class="d-none" accept="image/*" @change="changePhoto" />

  <button class="btn-navbar position-fixed z-5 pt-1 ps-2 fs-3 top-3 start-3 focus-none border-0 bg-transparent" @click="toggleMenu">
    ☰
  </button>

  <div class="navigation z-1 p-2 w-100 bg-white border" :class="{ open: isOpen }" @click.stop>
    <div class="navigation__image position-relative rounded-circle border mx-auto my-4">
      <img :src="userImage ? userImage : personDefaultImg" alt="Image person" class="img-fluid">
      <button @click="openFileDialog"
        class="navigation__settings position-absolute rounded-circle bg-white d-flex align-items-center justify-content-center shadow border-0 focus-none">
        <img :src="settingsImage" alt="Icon settings" width="18" height="18" class="img-fluid">
      </button>
    </div>
    <nav>
      <RouterLink to="/arrival" class="nav-link mx-auto" :class="{ 'active-link': route.path === '/arrival' }"
        @click="closeMenu">приход
      </RouterLink>
      <RouterLink to="/groups" class="nav-link mx-auto" :class="{ 'active-link': route.path === '/groups' }"
        @click="closeMenu">группы
      </RouterLink>
      <RouterLink to="/products" class="nav-link mx-auto" :class="{ 'active-link': route.path === '/products' }"
        @click="closeMenu">
        продукты
      </RouterLink>
      <RouterLink to="/users" class="nav-link mx-auto" :class="{ 'active-link': route.path === '/users' }"
        @click="closeMenu">пользователи
      </RouterLink>
      <RouterLink to="/settings" class="nav-link mx-auto" :class="{ 'active-link': route.path === '/settings' }"
        @click="closeMenu">
        настройки
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.btn-navbar {
  color: #80B548;
  z-index: 1000;
}

.navigation {
  box-shadow: 4px 0 8px -4px rgba(85, 85, 85, 0.549);
  min-width: 180px;
  max-width: 250px;
  height: 100%;
  transition: transform 1.5s ease;
  position: fixed;
  transform: translateX(-120%);
}

.navigation.open {
  transform: translateX(0);
}

.navigation__image {
  width: 90px;
  height: 90px;
}

.navigation__settings {
  width: 42px;
  height: 42px;
  bottom: -5px;
  right: -5px;
}

a {
  margin-bottom: 10px;
  color: #1E2F38;
  font-weight: 500;
  width: fit-content;
}

.active-link {
  border-bottom: 2px solid #80B548;
  color: #1E2F38;
}

@media (min-width: 1025px) {
  .navigation {
    position: static;
    transform: translateX(0);
    height: auto;
  }

  .btn-navbar {
    display: none;
  }
}
</style>
