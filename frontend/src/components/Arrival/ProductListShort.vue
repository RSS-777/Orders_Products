<script setup lang="ts">
import type { IOrder } from '../../types/order';
import EllipsisText from '../EllipsisText.vue';
import ProductImage from '../Products/ProductImage.vue';
import ProductStatus from '../Products/ProductNewIndicator.vue';
import SecondaryText from '../SecondaryText.vue';

const { } = defineProps<{
  showProducts: boolean;
  order: IOrder;
}>()
</script>

<template>
  <ul class="product list-unstyled mt-2 overflow-y-auto"
    :style="{ maxHeight: showProducts ? '200px' : '5px', transition: 'max-height 0.5s ease' }">
    <li v-for="product in order?.products" :key="product.id" class="product__list gap-4 py-1">
      <ProductStatus :isNew="!!product.isNew"/>
      <ProductImage />
      <div class="product__information overflow-hidden">
        <EllipsisText :title="product.title" />
        <SecondaryText :text="product.serialNumber" />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.product__list {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  border-top: 1px solid rgb(223, 223, 223);
}

.product__information {
  max-width: 420px;
}
</style>