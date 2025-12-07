<script setup lang="ts">
import type { IOrder } from '../../types/order';
import EllipsisText from '../EllipsisText.vue';
import ProductImage from '../Products/ProductImage.vue';
import ProductStatus from '../Products/ProductNewIndicator.vue';
import SecondaryText from '../SecondaryText.vue';

const { showProducts, order, version = 'modal' } = defineProps<{
  showProducts: boolean;
  order: IOrder;
  version?: 'modal' | 'expanded';
}>()
</script>

<template>
  <div class="relative">
    <div v-if="version === 'expanded'" class="product-header">
      <slot name="header"></slot>
    </div>
    <ul class="product list-unstyled mt-2 overflow-y-auto"
      :style="{ maxHeight: (!showProducts && version === 'modal') ? '5px' : undefined }"
      :class="version === 'modal' ? 'product--modal' : 'product--expanded'">
      <li v-for="product in order?.products" :key="product.id" class="product__list gap-3 py-1"
        :class="version === 'modal' ? 'product__list--modal' : 'product__list--expanded'">
        <ProductStatus :status=product.status />
        <ProductImage />
        <div class="product__information overflow-hidden">
          <EllipsisText :title="product.title" :maxWidth="version === 'expanded' ? '100%' : ''" />
          <SecondaryText :text="product.serialNumber" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.product {
  transition: max-height 0.5s ease;
}

.product--modal {
  max-height: 200px;
}

.product--expanded {
  max-height: 500px;
  padding-top: 30px;
}

.product__list {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  border-top: 1px solid rgb(223, 223, 223);
}

.product__list--modal {
  max-width: 420px;
}

.product__list--expanded {
  max-width: 100%;
  padding-right: 20px;
}
</style>