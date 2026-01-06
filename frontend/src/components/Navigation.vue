<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, nextTick, computed } from 'vue';
import { useStore } from 'vuex';
import personDefaultImg from '../assets/default.png';
import settingsImage from '../assets/settings.png';
import { updateUserPhoto } from '../api/userApi';
import padlockImage from '../assets/padlock.png';
import padlockImageOpen from '../assets/padlock-open.png';

const route = useRoute();
const store = useStore();

const isAdmin = computed(() => {
  const role = store.getters['auth/role'];
  return role === 'admin';
});

const token: string = store.getters['auth/token'];
const isOpen = ref<boolean>(false);

const role = computed(() => store.getters['auth/role']);
const userImage = computed(() => {
  const photo = store.getters['auth/photoUrl'];
  return photo ? photo : personDefaultImg;
});

const fileInput = ref<HTMLInputElement | null>(null);

const openFileDialog = () => {
  fileInput.value?.click();
};

const changePhoto = async (e: Event) => {
  if (!['admin', 'manager'].includes(role.value)) {
    return;
  }

  const input = e.target as HTMLInputElement;
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    input.value = '';
    return;
  }

  const response = await updateUserPhoto(file, token);

  if (response.success) {
    await store.commit('auth/setPhotoUrl', response.data?.photoUrl);
  }
};

const closeMenu = () => {
  isOpen.value = false;
  document.removeEventListener('click', handleClickOutside);
};

const handleClickOutside = (event: MouseEvent) => {
  const menu = document.querySelector('.navigation');
  const button = document.querySelector('.btn-navbar');

  if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
    closeMenu();
  }
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside);
    });
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};
</script>

<template>
  <div class="min-h-100 position-relative">
    <form>
      <label for="user-photo" class="visually-hidden">Upload user photo</label>
      <input ref="fileInput" id="user-photo" name="userPhoto" type="file" class="d-none"
        accept="image/jpeg,image/png,image/webp" @change="changePhoto" />
    </form>
    <button class="btn-navbar position-absolute z-2 pt-1 ps-2 fs-3 top-3 start-3 focus-none border-0 bg-transparent"
      @click="toggleMenu">☰</button>
    <div class="navigation z-1 p-2 bg-white border" :class="{ open: isOpen }" @click.stop>
      <div class="navigation__image position-relative rounded-circle border mx-auto my-4">
        <div class="overflow-hidden rounded-circle w-100 h-100 d-flex align-items-center justify-content-center">
          <img :src="userImage" alt="Image person" class="img-fluid" />
        </div>
        <button 
          @click="['admin', 'manager'].includes(role) ? openFileDialog() : null"
          :disabled="!['admin', 'manager'].includes(role)"
          class="navigation__settings position-absolute rounded-circle bg-white d-flex align-items-center justify-content-center border-0 focus-none">
          <img :src="settingsImage || personDefaultImg" alt="Icon settings" width="18" height="18" class="img-fluid" />
        </button>
      </div>
      <nav>
        <RouterLink to="/arrival" class="nav-link mx-auto mb-1 fw-medium"
          :class="{ 'active-link': route.path === '/arrival' }" @click="closeMenu">приход
        </RouterLink>
        <RouterLink to="/groups" class="nav-link mx-auto mb-1 fw-medium"
          :class="{ 'active-link': route.path === '/groups' }" @click="closeMenu">группы
        </RouterLink>
        <RouterLink to="/products" class="nav-link mx-auto mb-1 fw-medium"
          :class="{ 'active-link': route.path === '/products' }" @click="closeMenu">
          продукты
        </RouterLink>
        <RouterLink to="/users" class="nav-link mx-auto mb-1 fw-medium"
          :class="{ 'active-link': route.path === '/users', 'active-link--disabled': !['admin', 'manager'].includes(role) }" @click="closeMenu">пользователи
        </RouterLink>
        <RouterLink :to="isAdmin ? '/settings' : '#'" class="nav-link mx-auto mb-1 fw-medium"
          :class="{ 'active-link': route.path === '/settings', 'active-link--disabled': !isAdmin }"
          @click="closeMenu()">
          <img :src="isAdmin ? padlockImageOpen : padlockImage" alt="Icon settings" width="18" height="18"
            class="img-fluid me-1" />
          настройки
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.btn-navbar {
  color: #80b548;
}

.navigation {
  position: absolute;
  box-shadow: 4px 0 8px -4px rgba(85, 85, 85, 0.55);
  width: clamp(180px, 20vw, 250px);
  transition: transform 0.6s ease;
  transform: translateX(-120%);
  height: 10000px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  box-shadow: 0 0 5px 0 rgb(148, 148, 148);
  animation: rotate360 5s linear infinite;
  transition: box-shadow 0.2s ease;
}

.navigation__settings:active {
  box-shadow: 0 0 2px 0 rgb(148, 148, 148);
}

.navigation__settings:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

a {
  color: #1e2f38;
  width: fit-content;
}

.active-link {
  border-bottom: 2px solid #80b548;
  color: #1e2f38;
}

.active-link--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 1025px) {
  .navigation {
    position: static;
    transform: translateX(0);
    height: 100%;
  }

  .btn-navbar {
    display: none;
  }
}
</style>
