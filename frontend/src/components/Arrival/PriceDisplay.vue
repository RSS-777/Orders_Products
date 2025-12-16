<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { IProduct } from '../../types/product';

const { products: rawProducts } = defineProps<{
  products: IProduct | IProduct[];
}>();

const store = useStore();
const defaultCurrencyStore = computed(() =>
  store.getters['settings/defaultCurrency']
);

const products = Array.isArray(rawProducts) ? rawProducts : [rawProducts];

const formatNumber = (num: number) => {
  const [intPart = '0', decPart = '00'] = num.toFixed(2).split('.');
  const intWithSpaces = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decPart === '00' ? intWithSpaces : `${intWithSpaces}.${decPart}`;
};

const totalUSD = computed(() => {
  const sum = products.reduce((acc, product) => {
    const price = product.price.find((p) => p.symbol === 'USD')?.value || 0;
    return acc + price;
  }, 0);
  if (sum === 0) return null;
  return formatNumber(sum);
});

const totalUAH = computed(() => {
  const sum = products.reduce((acc, product) => {
    const price = product.price.find((p) => p.symbol === 'UAH')?.value || 0;
    return acc + price;
  }, 0);
  if (sum === 0) return null;
  return formatNumber(sum);
});
</script>

<template>
  <div class="price d-flex flex-column">
    <span
      class="price__usd text-nowrap"
      :class="defaultCurrencyStore !== 'USD' ? 'price__first' : 'price__last'"
      :style="{ order: defaultCurrencyStore === 'USD' ? 2 : 1 }"
    >
      {{ totalUSD !== null ? totalUSD + ' $' : '—' }}
    </span>

    <span
      class="price__uah text-nowrap"
      :class="defaultCurrencyStore !== 'UAH' ? 'price__first' : 'price__last'"
      :style="{ order: defaultCurrencyStore === 'UAH' ? 2 : 1 }"
    >
      {{ totalUAH !== null ? totalUAH + ' UAH' : '—' }}
    </span>
  </div>
</template>

<style scoped>
.price__first {
  font-size: 12px;
  color: rgb(158, 158, 158);
}
</style>