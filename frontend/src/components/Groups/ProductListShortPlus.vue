<script setup lang="ts">
import type { IOrder } from '../../types/order';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getProductsForOrder } from '../../services/product';
import EllipsisText from '../EllipsisText.vue';
import ProductImage from '../Products/ProductImage.vue';
import ProductStatus from '../Products/ProductNewIndicator.vue';
import SecondaryText from '../SecondaryText.vue';
import ProductStatusWork from '../Products/ProductStatusWork.vue';
import BaseButton from '../BaseButton.vue';
import imageBacket from '../../assets/basket.png';

const store = useStore();
const order = computed<IOrder>(() => store.getters['orders/currentOrder']);

const onDelete = (id: number) => {
  store.commit('products/setProductId', id);
};
</script>

<template>
  <div class="wrapper relative d-flex flex-column">
    <ul class="product list-unstyled mt-2 overflow-y-auto overflow-x-hidden" v-if="order">
      <li class="product__list d-grid align-items-center gap-4 py-1" v-for="product in getProductsForOrder(order.id)" :key="product.id">
        <ProductStatus :status="product.status" />
        <ProductImage />
        <div class="product__information overflow-hidden">
          <EllipsisText :title="product.title" maxWidth="100%" />
          <SecondaryText :text="product.serialNumber" />
        </div>
        <ProductStatusWork :status="product.status" />
        <BaseButton @click="onDelete(product.id)">
          <img :src="imageBacket" alt="Delete icon" width="16" height="16" />
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  flex: 1;
  min-height: 0;
}

.product {
  flex: 1;
}

.product__list {
  grid-template-columns: auto auto minmax(150px, 500px) minmax(90px, 1fr) auto;
  border-top: 1px solid rgb(223, 223, 223);
  padding-right: 20px;
}
</style>
