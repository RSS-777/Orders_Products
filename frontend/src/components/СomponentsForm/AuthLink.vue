<script setup lang="ts">
import { useRouter } from 'vue-router';

const { text, link, name } = defineProps<{
  text: string;
  link: string;
  name: string;
}>();
const router = useRouter();
</script>

<template>
  <div class="text-center mt-3">
    <span>{{ text }}</span> <a href="#" @click.prevent="router.push(link)">{{ name }}</a>
  </div>
</template>

<style scoped></style>
