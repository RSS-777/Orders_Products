<script setup lang="ts">
const { status } = defineProps<{
  status: string;
}>();
</script>

<template>
  <div
    class="product__status rounded-circle ms-4"
    :class="status === 'ready' ? 'product__status--ready' : 'product__status--repair'"
    :aria-label="status === 'ready' ? 'Свободен' : 'В ремонте'"
  ></div>
</template>

<style scoped>
.product__status {
  width: 8px;
  height: 8px;
}

.product__status--ready {
  background-color: #d7e36e;
}

.product__status--repair {
  background-color: #2c3c44;
}
</style>
