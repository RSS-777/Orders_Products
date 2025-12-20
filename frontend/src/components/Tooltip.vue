<script setup lang="ts">
const { title } = defineProps<{
  title: string;
  x?: number;
}>();
</script>

<template>
  <p class="tooltip-text position-absolute px-2 top-0 rounded" :style="{ left: x + 'px' }">
    {{ title }}
  </p>
</template>

<style scoped>
.tooltip-text {
  display: none;
  background-color: rgba(0, 0, 0, 0.837);
  color: #bbbbbb;
  font-size: 12px;
}

@media (hover: none), (pointer: coarse) {
  .tooltip-text {
    display: block;
  }
}
</style>
