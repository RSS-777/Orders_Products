<script setup lang="ts">
import { computed } from 'vue';
import type { IProduct } from '../../types/product';

const { products } = defineProps<{ products: IProduct[] }>();


const defaultCurrency = computed(() => {
    for (const product of products) {
        const defaultPrice = product.price.find(p => p.isDefault);
        if (defaultPrice) return defaultPrice.symbol;
    }
    return 'UAH';
});

const totalUSD = computed(() => {
    const sum = products.reduce((acc, product) => {
        const price = product.price.find(p => p.symbol === 'USD')?.value || 0;
        return acc + price;
    }, 0);
    if (sum === 0) return null;
    return Number.isInteger(sum)
        ? sum.toLocaleString()
        : sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
});

const totalUAH = computed(() => {
    const sum = products.reduce((acc, product) => {
        const price = product.price.find(p => p.symbol === 'UAH')?.value || 0;
        return acc + price;
    }, 0);
    if (sum === 0) return null;
    return Number.isInteger(sum)
        ? sum.toLocaleString()
        : sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
});
</script>

<template>
    <div class="price d-flex flex-column ">
        <span v-if="totalUSD" class="price__usd text-nowrap" :class="defaultCurrency !== 'USD' ? 'price__first' : 'price__last'"
            :style="{ order: defaultCurrency === 'USD' ? 2 : 1 }">
            {{ totalUSD }} $
        </span>

        <span v-if="totalUAH" class="price__uah text-nowrap" :class="defaultCurrency !== 'UAH' ? 'price__first' : 'price__last'"
            :style="{ order: defaultCurrency === 'UAH' ? 2 : 1 }">
            {{ totalUAH }} UAH
        </span>
    </div>
</template>

<style scoped>
.price__first {
    font-size: 12px;
    color: rgb(158, 158, 158);
}
</style>
