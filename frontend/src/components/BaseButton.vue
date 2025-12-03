<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button class="btn d-flex align-items-center justify-content-center rounded-circle p-0"
    @click="handleClick">
    <slot></slot>
  </button>
</template>
