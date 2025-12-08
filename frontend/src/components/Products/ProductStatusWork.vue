<script setup lang="ts">
const { status } = defineProps<{
  status: string;
}>();

const workStatus = status === 'in_repair' ? 'В ремонте' : 'Свободен';
</script>

<template>
  <div>
    <span class="status text-nowrap" :class="status === 'in_repair' ? 'status--repair' : 'status--ready'">{{ workStatus }} </span>
  </div>
</template>

<style scoped>
.status--repair {
  color: #2c3c44;
}

.status--ready {
  color: #d7e36e;
}
</style>
