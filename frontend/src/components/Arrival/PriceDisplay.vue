<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { IProduct } from '../../types/product';

const { products } = defineProps<{
  products: IProduct[] | IProduct;
}>();

const store = useStore();
const defaultCurrencyStore = computed(() => store.getters['settings/defaultCurrency']);
const productsArray = Array.isArray(products) ? products : [products];

const formatNumber = (num: number) => {
  const n = Number(num) || 0;
  const parts = n.toFixed(2).split('.');
  const intPart = parts[0] ?? '0';
  const decPart = parts[1] ?? '00';
  const intWithSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decPart === '00' ? intWithSpaces : `${intWithSpaces}.${decPart}`;
};

const totalUSD = computed(() => {
  if (!productsArray.length) return null;

  const sum = productsArray.reduce((acc, product) => {
    if (!product || !Array.isArray(product.price)) return acc;
    const price = product.price.find((p) => p.symbol === 'USD')?.value ?? 0;
    return acc + price;
  }, 0);

  return sum;
});

const totalUAH = computed(() => {
  if (!productsArray.length) return null;

  const sum = productsArray.reduce((acc, product) => {
    if (!product || !Array.isArray(product.price)) return acc;
    const price = product.price.find((p) => p.symbol === 'UAH')?.value ?? 0;
    return acc + price;
  }, 0);

  return sum;
});
</script>

<template>
  <div class="price d-flex flex-column">
    <span
      class="price__usd text-nowrap"
      :class="defaultCurrencyStore !== 'USD' ? 'price__first' : 'price__last'"
      :style="{ order: defaultCurrencyStore === 'USD' ? 2 : 1 }"
    >
      {{ totalUSD && Number(totalUSD) > 0 ? formatNumber(totalUSD) + ' $' : '—' }}
    </span>
    <span
      class="price__uah text-nowrap"
      :class="defaultCurrencyStore !== 'UAH' ? 'price__first' : 'price__last'"
      :style="{ order: defaultCurrencyStore === 'UAH' ? 2 : 1 }"
    >
      {{ totalUAH && Number(totalUAH) > 0 ? formatNumber(totalUAH) + ' UAH' : '—' }}
    </span>
  </div>
</template>

<style scoped>
.price__first {
  font-size: 12px;
  color: rgb(158, 158, 158);
}
</style>
