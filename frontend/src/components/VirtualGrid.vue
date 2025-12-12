<script setup lang="ts">
import { ref, watch } from 'vue';
import Grid from 'vue-virtual-scroll-grid';

const { items, tempScroll, classGrid, heightElement, maxHeightGrid } = defineProps<{
  items: any[];
  tempScroll: number | undefined;
  classGrid?: string;
  heightElement: number;
  maxHeightGrid: number;
}>();

const activeIndex = ref<number | null>(null);
const maxHeight = { maxHeight: `${maxHeightGrid}px` };

const pageProvider = (pageNumber: number, pageSize: number) => {
  const start = pageNumber * pageSize;
  const end = start + pageSize;
  return Promise.resolve(items.slice(start, end));
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
</script>
<template>
  <div :style="maxHeight" class="mt-5 overflow-y-auto">
    <Grid
      :length="items.length"
      :pageProvider="pageProvider"
      :pageSize="20"
      :scrollTo="tempScroll"
      :class="classGrid"
      class="columns"
      :key="'gridKey-' + items.length"
      :getKey="internalItem => internalItem.index"
    >
      <template v-slot:default="{ item, index, style }">
        <div :style="style" :class="{ 'active-element': index === activeIndex }">
          <slot :item="item"></slot>
        </div>
      </template>

      <template v-slot:placeholder="{ index, style }">
        <div :style="style">Loading... {{ index }}</div>
      </template>

      <template v-slot:probe>
        <div
          class="item"
          :style="{
            height: `${heightElement}px`,
            width: 'auto',
            visibility: 'hidden',
          }"
        >
          Probe
        </div>
      </template>
    </Grid>
  </div>
</template>

<style scoped>
.columns {
  grid-template-columns: 1fr;
}
</style>


<!-- <script setup lang="ts">
import { ref, watch } from 'vue';
import Grid from 'vue-virtual-scroll-grid';

const { items, tempScroll, classGrid, heightElement, maxHeightGrid } = defineProps<{
  items: any[];
  tempScroll: number | undefined;
  classGrid?: string;
  heightElement: number;
  maxHeightGrid: number;
}>();

const activeIndex = ref<number | null>(null);
const maxHeight = { maxHeight: `${maxHeightGrid}px` };

const pageProvider = (pageNumber: number, pageSize: number) => {
  const start = pageNumber * pageSize;
  const end = start + pageSize;
  return Promise.resolve(items.slice(start, end));
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
</script>
<template>
  <div :style="maxHeight" class="mt-5 overflow-y-auto">
    <Grid
      :length="items.length"
      :pageProvider="pageProvider"
      :pageSize="20"
      :scrollTo="tempScroll"
      :class="classGrid"
      class="columns"
      :key="'gridKey-' + items.length"
      :getKey="internalItem => internalItem.index"
    >
      <template v-slot:default="{ item, index, style }">
        <div :style="style" :class="{ 'active-element': index === activeIndex }">
          <slot :item="item"></slot>
        </div>
      </template>

      <template v-slot:placeholder="{ index, style }">
        <div :style="style">Loading... {{ index }}</div>
      </template>

      <template v-slot:probe>
        <div
          class="item"
          :style="{
            height: `${heightElement}px`,
            width: 'auto',
            visibility: 'hidden',
          }"
        >
          Probe
        </div>
      </template>
    </Grid>
  </div>
</template>

<style scoped>
.columns {
  grid-template-columns: 1fr;
}
</style> -->

