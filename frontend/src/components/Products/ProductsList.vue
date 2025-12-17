<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, onMounted, computed, watchEffect } from 'vue';
import { fetchOrders, cachedOrders } from '../../services/orders';
import { cachedProducts } from '../../services/product';
import type { IProduct } from '../../types/product';
import type { IOrder } from '../../types/order';
import ProductNewIndicator from './ProductNewIndicator.vue';
import ProductImage from './ProductImage.vue';
import ProductStatusWork from './ProductStatusWork.vue';
import ProductNewStatus from './ProductNewStatus.vue';
import DateStartEnd from './DateStartEnd.vue';
import EllipsisText from '../EllipsisText.vue';
import BaseButton from '../BaseButton.vue';
import FormattedDate from '../FormattedDate.vue';
import VirtualGrid from '../VirtualGrid.vue';
import PriceDisplay from '../Arrival/PriceDisplay.vue';
import imageBacket from '../../assets/basket.png';

const store = useStore();
const filteredProducts = ref<IProduct[]>([]);
const products = computed<IProduct[]>(() => cachedProducts.value);
const dataOrders = computed<IOrder[]>(() => cachedOrders.value);
const searchText = computed(() => store.getters['search/text']);
const sortedProductsByType = computed<IProduct[]>(() => [...products.value].sort((a, b) => (a.type ?? '').localeCompare(b.type ?? '')));

watchEffect(() => {
  const q = searchText.value?.trim().toLowerCase() || '';

  if (!q) {
    filteredProducts.value = sortedProductsByType.value;
  } else {
    filteredProducts.value = sortedProductsByType.value.filter((product) => product.type?.trim().toLowerCase().includes(q));
  }
});

const handleDelete = (id: number) => {
  store.commit('products/setProductId', id);
};

const getCarrentOrder = (element: IProduct): IOrder | null => {
  return dataOrders.value.find((o) => o.id === element.order_id) || null;
};

onMounted(async () => {
  await fetchOrders();
  filteredProducts.value = sortedProductsByType.value;
});
</script>
<template>
  <VirtualGrid :items="filteredProducts" :tempScroll="undefined" classGrid="d-grid gap-2" :heightElement="60">
    <template #default="{ item: element }">
      <div class="product d-grid border rounded-2 gap-4 p-2 px-3 bg-white">
        <ProductNewIndicator :status="element.status" />
        <ProductImage :src="element.photo" />
        <EllipsisText :title="element.title" />
        <ProductStatusWork :status="element.status" />
        <DateStartEnd :start="element.guarantee.start" :end="element.guarantee.end" />
        <ProductNewStatus :isNew="!!element.isNew" />
        <div class="d-flex justify-content-start">
          <PriceDisplay :products="element" />
        </div>
        <EllipsisText :title="element.type" />
        <EllipsisText :title="element.owner" />
        <EllipsisText :title="getCarrentOrder(element)?.title" />
        <FormattedDate :date="element.date" />
        <BaseButton @click="() => handleDelete?.(element.id)">
          <img :src="imageBacket" alt="Delete" width="16" height="16" />
        </BaseButton>
      </div>
    </template>
  </VirtualGrid>
</template>

<style scoped>
.product {
  grid-template-columns:
    auto minmax(40px, 1fr) minmax(150px, 3fr) minmax(80px, 1fr) minmax(120px, 1fr) minmax(50px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr)
    minmax(120px, 2fr) minmax(150px, 3fr) minmax(120px, 1fr) auto;
  align-items: center;
}

@media (hover: hover) and (pointer: fine) {
  .product:hover {
    box-shadow: 1px 1px 5px 0 #80b548;
    outline: 1px solid #80b548;
  }
}
</style>
