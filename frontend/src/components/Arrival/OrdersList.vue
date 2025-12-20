<script setup lang="ts">
import type { IOrder } from '../../types/order';
import { useStore } from 'vuex';
import { ref, computed, watch, nextTick } from 'vue';
import { cachedOrders, chooseOrderById } from '../../services/orders';
import { getProductsForOrder } from '../../services/product';
import { useTooltip } from '../../composables/useTooltip';
import CustomButton from '../CustomButton.vue';
import EllipsisText from '../EllipsisText.vue';
import VirtualGrid from '../VirtualGrid.vue';
import PriceDisplay from './PriceDisplay.vue';
import BaseButton from '../BaseButton.vue';
import FormattedDate from '../FormattedDate.vue';
import ProductListShort from './ProductListShort.vue';
import Tooltip from '../Tooltip.vue';
import imageBacket from '../../assets/basket.png';

const handleDelete = (id: number) => {
  store.commit('orders/setOrderId', id);
};

const emptyOrder: IOrder = {
  id: 0,
  title: '',
  date: '',
  description: '',
};

const store = useStore();
const openListProducts = ref<boolean>(false);
const tempScroll = ref<number | undefined>(undefined); // Использую undefined вместо null, потому что vue-virtual-scroll-grid !!!
const orders = computed<IOrder[]>(() => cachedOrders.value);
const searchText = computed(() => store.getters['search/text']);
const orderChoice = computed(() => store.getters['orders/currentOrder']);
const sortedOrdersTitle = computed<IOrder[]>(() => {
  return [...orders.value].sort((a, b) => a.title.localeCompare(b.title));
});
const { activeTooltipId, tooltipX, toggleTooltip } = useTooltip();

watch(searchText, async () => {
  await nextTick();
  findOrder();
});

const findOrder = async () => {
  const q = searchText.value?.trim().toLowerCase() || '';

  if (!q) {
    tempScroll.value = undefined;
    return;
  }

  const index = sortedOrdersTitle.value.findIndex((order) => order.title.toLowerCase().includes(q));

  if (index !== -1) {
    tempScroll.value = index;
    await nextTick();
    setTimeout(() => (tempScroll.value = undefined), 1000);
  }
};

const handleOpenProducts = (id: number) => {
  chooseOrderById(id);

  nextTick(() => {
    openListProducts.value = true;
  });
};

const handleCloseProducts = () => {
  openListProducts.value = false;
  store.commit('orders/clearCurrentOrder');
};

defineExpose({ handleCloseProducts, openListProducts });
</script>

<template>
  <VirtualGrid :items="sortedOrdersTitle" :tempScroll="tempScroll" classGrid="d-grid gap-2" :heightElement="60">
    <template #default="{ item: element }">
      <div class="order d-grid align-items-center border rounded-2 gap-3 py-2 px-4 bg-white position-relative">
        <EllipsisText :title="element.title" @click="(e: MouseEvent) => toggleTooltip(element.id, element.title, e)" />
        <div class="order__products d-flex align-items-center gap-3 justify-content-start">
          <CustomButton @click="() => handleOpenProducts(element.id)" />
          <div class="d-flex flex-column">
            <span class="fs-5 lh-1">{{ getProductsForOrder(element.id).length }}</span>
            <span class="order__products-title">Продукта</span>
          </div>
        </div>
        <FormattedDate :date="element.date" />
        <div class="d-flex justify-content-start">
          <PriceDisplay :products="getProductsForOrder(element.id)" />
        </div>
        <BaseButton @click="() => handleDelete(element.id)">
          <img :src="imageBacket" alt="Delete icon" width="16" height="16" />
        </BaseButton>
        <Tooltip :title="element.title" v-if="activeTooltipId === element.id" :x="tooltipX ?? undefined" />
      </div>
    </template>
  </VirtualGrid>
  <div class="choice-product bg-white w-100 position-absolute bottom-0 start-0 overflow-y-auto" :class="{ 'choice-product--open': openListProducts }">
    <ProductListShort :order="orderChoice ?? emptyOrder" :showProducts="true" version="expanded" />
  </div>
</template>

<style scoped>
.order {
  grid-template-columns: minmax(150px, 3fr) minmax(110px, 1fr) minmax(120px, 1fr) minmax(110px, 1fr) auto;
}

.order__products-title {
  font-size: 14px;
  color: rgb(158, 158, 158);
}

.choice-product {
  top: 126px;
  opacity: 0;
  transform: translateY(120%);
  transition:
    transform 1s ease,
    opacity 1s ease;
}

.choice-product--open {
  transform: translateY(0);
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .order:hover {
    box-shadow: 1px 1px 5px 0 #80b548;
    outline: 1px solid #80b548;
  }
}
</style>
