<script setup lang="ts">
const { className, onClick } = defineProps<{
  className?: string;
  onClick?: () => void; 
}>();
</script>

<template>
  <button
    class="main__btn rounded-circle text-white d-flex align-items-center"
    :class="className"
    @click="onClick"
  >
    +
  </button>
</template>
