<script setup lang="ts">
import { formatDate } from '../utils/dateTimeFormat';

const { date, className } = defineProps<{
  date: string;
  className?: string;
}>();

const dateSm = formatDate(date.split(' ')[0], 'slash') || '—';
const dateBg = formatDate(date.split(' ')[0], 'long') || '—';
</script>

<template>
  <div class="d-flex align-items-start">
    <div class="date d-flex flex-column align-items-center">
      <span class="date__sm date__sm--space text-nowrap" :class="className">{{ dateSm }}</span>
      <span class="date__bg date__bg--space text-nowrap">{{ dateBg }}</span>
    </div>
  </div>
</template>

<style scoped>
.date__sm {
  font-size: 12px;
  color: rgb(158, 158, 158);
}

.date__sm--space,
.date__bg--space {
  letter-spacing: 1px;
}
</style>
