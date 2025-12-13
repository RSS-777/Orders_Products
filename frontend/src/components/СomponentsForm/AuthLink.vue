<script setup lang="ts">
import { useRouter } from 'vue-router';

const { text, link, name, disabled } = defineProps<{
  text: string;
  link: string;
  name: string;
  disabled?: boolean;
}>();
const router = useRouter();
</script>

<template>
  <div class="text-center mt-3">
    <span>{{ text }}</span>
    <a href="#" @click.prevent="router.push(link)" :class="['ms-2', { 'disabled-link': disabled }]">{{ name }}</a>
  </div>
</template>

<style scoped>
.disabled-link {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
</style>
