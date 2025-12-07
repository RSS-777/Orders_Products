<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button class="button d-flex align-items-center justify-content-center p-2 bg-transparent border-0"
    @click="handleClick">
    <slot></slot>
  </button>
</template>
<style scoped>
.button {
  width: fit-content;
}

.button:active {
  transform: scale(0.9);
}
</style>