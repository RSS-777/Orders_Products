<script setup lang="ts">
const { order } = defineProps<{
  order: number;
}>();

const workStatus = order > 0 ? 'В ремонте' : 'Свободен';
</script>

<template>
  <div>
    <span 
    class="status"
    :class="order > 0  ? 'status--active' : 'status--inActive'"
    >{{ workStatus }}
  </span>
    </div>
</template>

<style scoped>
.status--active {
  color: #2C3C44;
}

.status--inActive {
  color: #D7E36E;
}
</style>
