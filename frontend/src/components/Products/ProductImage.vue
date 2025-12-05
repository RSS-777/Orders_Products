<script setup lang="ts">
import { computed } from "vue";
import defaultImageProduct from "../../assets/box.png"

const { src, alt, width, height } = defineProps<{
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
}>();

const imageSrc = computed(() => src || defaultImageProduct);
</script>

<template>
    <img :src="imageSrc" :alt="alt || 'Product'" :width="width || 42" :height="height || 42" class="me-3" />
</template>
