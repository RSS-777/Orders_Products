<script setup lang="ts">
const { className, onClick } = defineProps<{
  className?: string;
  onClick?: () => void;
}>();
</script>

<template>
  <button class="open-btn rounded-circle text-white d-flex align-items-center" :class="className" @click="onClick">+</button>
</template>

<style scoped>
.open-btn {
  background-color: #80b548;
  border: 5px solid #7bab4b;
  width: 30px;
  height: 30px;
}

.open-btn:active {
  transform: scale(0.9);
}
</style>
