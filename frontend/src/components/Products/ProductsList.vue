<script setup lang="ts">
import { useStore } from "vuex";
import { ref, computed, watch, nextTick } from "vue";
import ProductNewIndicator from "./ProductNewIndicator.vue";
import ProductImage from "./ProductImage.vue";
import ProductStatusWork from "./ProductStatusWork.vue";
import ProductNewStatus from "./ProductNewStatus.vue";

import { formatDate } from "../../utils/DateTimeFormat";
import CustomButton from "../CustomButton.vue";
import EllipsisText from "../EllipsisText.vue";
import VirtualGrid from "../VirtualGrid.vue";
import PriceDisplay from "../Arrival/PriceDisplay.vue";
import BaseButton from "../BaseButton.vue";

import type { IProduct } from "../../types/product";

import imageBacket from "../../assets/basket.png";

const { products, handleDelete } = defineProps<{
    products: IProduct[];
    handleDelete?: (id: number) => void;
}>();

watch(() => products, (val) => {
    console.log("UPDATED products:", JSON.parse(JSON.stringify(val)));
}, { deep: true, immediate: true });

const store = useStore()
const tempScroll = ref<number | undefined>(undefined)

// const searchText = computed(() => store.getters['search/text']);

// const findOrder = async () => {
//   if (!searchText.value) return;
//   const index = orders.findIndex(order =>
//     order.title.toLowerCase().includes(searchText.value.toLowerCase())
//   );

// if (index !== -1) {
//     await nextTick();
//     tempScroll.value = index;
//   }
// }


const getProductStatus = (product: IProduct) => {
  return product.order > 0 ? 'В ремонте' : 'Свободен';
};

</script>
<template>
    <VirtualGrid :items="products" :tempScroll="tempScroll" classGrid="d-grid gap-2" :maxHeightGrid=600
        :heightElement=60>
        <template #default="{ item: element }">
            <div class="order__block d-grid align-items-center border rounded-2  gap-3 p-2 px-4 bg-white">
                <ProductNewIndicator :isNew="!!element.isNew" />
                <ProductImage />
                <EllipsisText :title="element.title" />
                <ProductStatusWork :order="element.order"/>
                <ProductNewStatus :isNew="!!element.isNew"/>
        <div class="d-flex justify-content-start">
                    <PriceDisplay :products="element.price" />
                </div>
                <!-- <div class="order__products d-flex align-items-center gap-3 justify-content-start">
                    <CustomButton @click="() => handleOpenProducts(element.id)" />
                    <div class="d-flex flex-column">
                        <span class="fs-5 lh-1">{{ element.products.length }}</span>
                        <span class="order__products-title">Продукта</span>
                    </div>
                </div> -->

        



                <!-- <div class="d-flex align-items-start">
                    <div class="order__date d-flex flex-column align-items-center">
                        <span class="order__date-count text-nowrap">{{element.products.filter((p: IProduct) => p.isNew
                            === 1).length}} /
                            {{
                                element.products.length }}</span>
                        <span class="order__date-time text-nowrap">{{ formatDate(element.date.split(' ')[0]) }}</span>
                    </div>
                </div> -->

                <!-- <BaseButton @click="() => handleDelete?.(element.id)">
                    <img :src="imageBacket" alt="Delete icon" width="16" height="16">
                </BaseButton> -->
            </div>
        </template>
    </VirtualGrid>
</template>

<style scoped>
.order {
    grid-template-columns: 1fr;
}

.order__block {
    grid-template-columns: 3fr 1fr 1fr 1fr auto;
}

.order__block:hover {
    box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.702);
}

.order__products-title {
    font-size: 14px;
    color: rgb(158, 158, 158);
}

.order__date-count {
    font-size: 12px;
    color: rgb(158, 158, 158);
}
</style>