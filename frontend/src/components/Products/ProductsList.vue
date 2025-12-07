<script setup lang="ts">
import { useStore } from "vuex";
import { ref, watch, onMounted, computed, reactive, nextTick } from "vue";
import { searchProductDate } from "../../utils/searchProductDate";
import type { IProduct } from "../../types/product";
import type { IOrder } from "../../types/order";
import ProductNewIndicator from "./ProductNewIndicator.vue";
import ProductImage from "./ProductImage.vue";
import ProductStatusWork from "./ProductStatusWork.vue";
import ProductNewStatus from "./ProductNewStatus.vue";
import { getOrders } from "../../api/data"; // mock
// import { getOrders } from "../../api/ordersApi";
import DateStartEnd from "./DateStartEnd.vue";
import EllipsisText from "../EllipsisText.vue";
import BaseButton from "../BaseButton.vue";
import OrderStats from "../Arrival/OrderStats.vue";
import VirtualGrid from "../VirtualGrid.vue";
import PriceDisplay from "../Arrival/PriceDisplay.vue";
import imageBacket from "../../assets/basket.png"

const { products, handleDelete } = defineProps<{
    products: IProduct[];
    handleDelete?: (id: number) => void;
}>();

const state = reactive({
    dataOrders: [] as IOrder[],
});

const store = useStore()
const tempScroll = ref<number | undefined>(undefined)  // Знаю ноооо! Здесь обязательно должно быть именно undefined! 
const searchText = computed(() => store.getters['search/text']);

const getProductsFromOrder = (element: IProduct) => {
    if (!state.dataOrders.length) return [];
    const order = state.dataOrders.find(o => o.id === element.order);
    return order?.products || [];
}

const getCarrentOrder = (element: IProduct): IOrder | null => {
    return state.dataOrders.find(o => o.id === element.order) || null;
}

onMounted(async () => {
    const res = await getOrders();

    if (res.success) {
        state.dataOrders = res.data || [];
    } else {
        console.error("Error orders:", res.error);
    }
});

const findProduct = async () => {
    if (!searchText.value) return;

    const query = searchText.value.toLowerCase();
    const index = products.findIndex(product => {
        const order = getCarrentOrder(product)
        return (
            product.title.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            product.specification.toLowerCase().includes(query) ||
            product.owner.toLowerCase().includes(query) ||
            String(product.serialNumber).includes(query) ||
            (order?.date ? searchProductDate(order.date, query) : false)
        );
    });

    if (index !== -1) {
        tempScroll.value = index;
        await nextTick();
        setTimeout(() => { tempScroll.value = undefined }, 1000)
    }
}

watch(searchText, (newValue) => {
    if (newValue) findProduct();
});
</script>
<template>
    <VirtualGrid :items="products" :tempScroll="tempScroll ? tempScroll : undefined" classGrid="d-grid gap-2"
        :maxHeightGrid=650 :heightElement=60>
        <template #default="{ item: element }">
            <div class="product d-grid border rounded-2  gap-4 p-2 px-3 bg-white">
                <ProductNewIndicator :status=element.status />
                <ProductImage :src="element.photo" />
                <EllipsisText :title="element.title" />
                <ProductStatusWork :status="element.status" />
                <DateStartEnd :start="element.guarantee.start" :end="element.guarantee.end" />
                <ProductNewStatus :isNew="!!element.isNew" />
                <div class="d-flex justify-content-start">
                    <PriceDisplay :products="getProductsFromOrder(element)" />
                </div>
                <EllipsisText :title="element.type" />
                <EllipsisText :title="element.owner"  />
                <EllipsisText :title="getCarrentOrder(element)?.title" />
                <OrderStats :order="getCarrentOrder(element)" />
                <BaseButton @click="() => handleDelete?.(element.id)">
                    <img :src="imageBacket" alt="Delete icon" width="16" height="16">
                </BaseButton>
            </div>
        </template>
    </VirtualGrid>
</template>

<style scoped>
.product {
    grid-template-columns: auto minmax(40px, 1fr) minmax(150px, 3fr) minmax(80px, 1fr) minmax(120px, 1fr) minmax(50px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(120px, 2fr) minmax(150px, 3fr) minmax(120px, 1fr) auto;
    align-items: center;
}

.product:hover {
    box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.702);
}
</style>