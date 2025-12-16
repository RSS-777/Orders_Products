<script setup lang="ts">
const { isLoading } = defineProps<{ isLoading: boolean }>();
</script>

<template>
  <div v-if="isLoading" class="spinner d-flex justify-content-center gap-2 p-2">
    <span class="spinner__dot rounded-circle"></span>
    <span class="spinner__dot rounded-circle"></span>
    <span class="spinner__dot rounded-circle"></span>
    <span class="spinner__dot rounded-circle"></span>
    <span class="spinner__dot rounded-circle"></span>
    <span class="spinner__dot rounded-circle"></span>
  </div>
</template>

<style scoped>
.spinner__dot {
  width: 8px;
  height: 8px;
  background-color: #66a127;
  opacity: 0.3;
  transform: scale(0.5);
  animation: pulse 2s infinite ease-in-out;
}

.spinner__dot:nth-child(1) {
  animation-delay: 0s;
}

.spinner__dot:nth-child(2) {
  animation-delay: 0.2s;
}

.spinner__dot:nth-child(3) {
  animation-delay: 0.4s;
}

.spinner__dot:nth-child(4) {
  animation-delay: 0.6s;
}

.spinner__dot:nth-child(5) {
  animation-delay: 0.8s;
}

.spinner__dot:nth-child(6) {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0.3;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.5);
    opacity: 0.3;
  }
}
</style>
