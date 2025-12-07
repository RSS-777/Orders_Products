<script setup lang="ts">
import { formatDate } from '../../utils/dateTimeFormat';
import type { IProduct } from '../../types/product';
import type { IOrder } from '../../types/order';

const { order } = defineProps<{
    order?: IOrder | null;
}>();

const counter = `${order?.products.filter((p: IProduct) => p.status === 'ready').length || '—'}  / ${order?.products.length || '—'}`;
const date = formatDate(order?.date.split(' ')[0], 'slash') || '—';
</script>

<template>
    <div class=" d-flex align-items-start" :class="order ? '' : 'empty-order'">
        <div class="date d-flex flex-column align-items-center">
            <span class="date__count text-nowrap">{{ counter }}</span>
            <span class="date__time text-nowrap">{{ date }}</span>
        </div>
    </div>
</template>

<style scoped>
.date__count {
    font-size: 12px;
    color: rgb(158, 158, 158);
}

.empty-order {
    display: flex;
    align-items: center; 
    justify-content: center; 
    height: 100%; 
}
</style>