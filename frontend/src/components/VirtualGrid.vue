<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Grid from 'vue-virtual-scroll-grid';

const { items, tempScroll, classGrid, heightElement } = defineProps<{
  items: any[];
  tempScroll?: number;
  classGrid?: string;
  heightElement: number;
}>();

const activeIndex = ref<number | null>(null);
const gridKey = ref<number>(0);

const pageProvider = async (pageNumber: number, pageSize: number) => {
  const start = pageNumber * pageSize;
  const end = start + pageSize;
  return Promise.resolve([...items.slice(start, end)]);
};


watch(
  () => tempScroll,
  (newIndex) => {
    if (newIndex !== undefined && newIndex !== null) {
      activeIndex.value = newIndex;

      setTimeout(() => {
        activeIndex.value = null;
      }, 3000);
    }
  },
);

watch(
  () => items.length,
  async () => {
    gridKey.value++;
    await nextTick();
  }
);
</script>

<template>
  <div class="virtual-wrapper overflow-y-auto pb-1 pt-1">
    <Grid 
      :length="items.length" 
      :pageProvider="pageProvider" 
      :pageSize="20" 
      :scrollTo="tempScroll" 
      :class="classGrid"
      class="columns" 
      :key="gridKey"
    >
      <template v-slot:default="{ item, index, style }">
        <div :style="style" :class="{ 'active-element': index === activeIndex }"  class="px-1">
          <slot :item="item"></slot>
        </div>
      </template>

      <template v-slot:placeholder="{ index, style }">
        <div :style="style">Loading... {{ index }}</div>
      </template>

      <template v-slot:probe>
        <div class="item" :style="{
          height: `${heightElement}px`,
          width: 'auto',
          visibility: 'hidden',
        }">
          Probe
        </div>
      </template>
    </Grid>
  </div>
</template>

<style scoped>
.virtual-wrapper {
  flex: 1;
  min-height: 0;
}

.columns {
  grid-template-columns: 1fr;
}
</style>