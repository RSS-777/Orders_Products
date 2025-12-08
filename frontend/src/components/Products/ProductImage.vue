<script setup lang="ts">
import { computed } from 'vue';
import defaultImageProduct from '../../assets/box.png';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const { src, alt, width, height } = defineProps<{
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}>();

const imageSrc = computed(() => {
  if (!src) return defaultImageProduct;
  return src.startsWith('http') ? src : `${BASE_URL}${src}`;
});
</script>

<template>
  <img :src="imageSrc" :alt="alt || 'Product'" :width="width || 42" :height="height || 42" class="me-3" />
</template>
