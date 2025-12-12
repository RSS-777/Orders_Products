<script setup lang="ts">
import SecondaryText from '../SecondaryText.vue';
const {} = defineProps<{
  start: string;
  end: string;
  className?: string;
}>();

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
</script>

<template>
  <div class="date">
    <div class="date__block d-grid gap-1 text-nowrap">
      <SecondaryText text="с" />
      <span :class="className"  class="date__span">{{ formatDate(start) }}</span>
    </div>
    <div class="date__block d-grid gap-1">
      <SecondaryText text="по" />
      <span :class="className" class="date__span">{{ formatDate(end) }}</span>
    </div>
  </div>
</template>

<style scoped>
.date__block {
  grid-template-columns: 1fr 1fr;
  align-items: baseline;
}

.date__span {
 letter-spacing: 1px;
}
</style>
