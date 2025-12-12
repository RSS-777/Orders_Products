<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import EllipsisText from '../EllipsisText.vue';
import ProductImage from '../Products/ProductImage.vue';
import ProductStatus from '../Products/ProductNewIndicator.vue';
import SecondaryText from '../SecondaryText.vue';
import ProductStatusWork from '../Products/ProductStatusWork.vue';
import BaseButton from '../BaseButton.vue';
import type { IOrder } from '../../types/order';
import imageBacket from '../../assets/basket.png';

const store = useStore()
const order = computed<IOrder>(() => store.getters['orders/currentOrder']);

const onDelete = (id: number) => {
  store.commit('products/setProductId', id);
};
</script>

<template>
  <div class="relative">
    <div class="product-header">
      <slot name="header"></slot>
    </div>

    <ul class="product list-unstyled mt-2 overflow-y-auto" v-if="order">
      <li v-for="product in order?.products" :key="product.id" class="product__list  gap-4 py-1">
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
.product {
  transition: max-height 0.5s ease;
  max-height: 480px;
  padding-top: 10px;
}

.product__list {
  display: grid;
  grid-template-columns: auto auto minmax(150px, 500px) minmax(120px, 1fr) auto;
  align-items: center;
  border-top: 1px solid rgb(223, 223, 223);
  padding-right: 20px;
}
</style>
