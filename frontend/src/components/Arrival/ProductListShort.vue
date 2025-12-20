<script setup lang="ts">
import type { IOrder } from '../../types/order';
import EllipsisText from '../EllipsisText.vue';
import ProductImage from '../Products/ProductImage.vue';
import ProductStatus from '../Products/ProductNewIndicator.vue';
import SecondaryText from '../SecondaryText.vue';
import { getProductsForOrder } from '../../services/product';
import { useTooltip } from '../../composables/useTooltip';
import Tooltip from '../Tooltip.vue';

const {
  showProducts,
  order,
  version = 'modal',
} = defineProps<{
  showProducts: boolean;
  order: IOrder;
  version?: 'modal' | 'expanded';
}>();

const { activeTooltipId, tooltipX, toggleTooltip } = useTooltip();
</script>

<template>
  <div>
    <ul
      class="product list-unstyled overflow-y-auto"
      :style="{ maxHeight: !showProducts && version === 'modal' ? '0' : '' }"
      :class="{ 'product--modal': version === 'modal' }"
    >
      <li
        v-for="product in getProductsForOrder(order?.id) || []"
        :key="product.id"
        class="product__list gap-3 py-1 position-relative"
        :class="version === 'modal' ? 'product__list--modal' : 'product__list--expanded'"
      >
        <ProductStatus :status="product.status" />
        <ProductImage />
        <div class="product__information overflow-hidden">
          <EllipsisText
            :title="product.title"
            :maxWidth="version === 'expanded' ? '100%' : ''"
            @click="(e: MouseEvent) => toggleTooltip(product.id, product.title, e)"
          />
          <SecondaryText :text="product.serialNumber" />
        </div>
        <Tooltip :title="product.title" v-if="activeTooltipId === product.id" :x="tooltipX ?? undefined" />
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
