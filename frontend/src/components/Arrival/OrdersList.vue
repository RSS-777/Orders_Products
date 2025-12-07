<script setup lang="ts">
import { useStore } from "vuex";
import { ref, computed, watch, nextTick } from "vue";
import type { IOrder } from "../../types/order";
import CustomButton from "../CustomButton.vue";
import EllipsisText from "../EllipsisText.vue";
import VirtualGrid from "../VirtualGrid.vue";
import PriceDisplay from "./PriceDisplay.vue";
import BaseButton from "../BaseButton.vue";
import OrderStats from "./OrderStats.vue";
import ProductListShort from "./ProductListShort.vue";
import imageBacket from "../../assets/basket.png";

const { orders, handleDelete } = defineProps<{
  orders: IOrder[];
  handleDelete?: (id: number) => void;
}>();

const emptyOrder: IOrder = {
  id: 0,
  title: '',
  date: '',
  description: '',
  products: []
};

const store = useStore()
const tempScroll = ref<number | undefined>(undefined) //Знаю ноооо!  Здесь обязательно должно быть именно undefined!!! (По другому не-а \|/) 
const searchText = computed(() => store.getters['search/text']);
const orderChoice = ref<IOrder | null>(null);
const openListProducts = ref<boolean>(false)

const findOrder = async () => {
  if (!searchText.value) return;
  const index = orders.findIndex(order =>
    order.title.toLowerCase().includes(searchText.value.toLowerCase())
  );

  if (index !== -1) {
    tempScroll.value = index;
    await nextTick();
    setTimeout(() => { tempScroll.value = undefined }, 1000)
  }
}

const handleOpenProducts = (id: number) => {
  const order =  orders.find(el => el.id === id) || null
  if (!order || !order.products?.length) return
  orderChoice.value = order
  nextTick(() => {
    openListProducts.value = true
  })
}

const handleCloseProducts = () => {
  openListProducts.value = false
}

watch(searchText, (newValue) => {
  if (newValue) findOrder();
});

</script>
<template>
  <VirtualGrid :items="orders" :tempScroll="tempScroll ? tempScroll : undefined" classGrid="d-grid gap-2"
    :maxHeightGrid=650 :heightElement=60>
    <template #default="{ item: element }">
      <div class="order d-grid align-items-center border rounded-2  gap-3 p-2 px-4 bg-white">
        <EllipsisText :title="element.title"/>
        <div class="order__products d-flex align-items-center gap-3 justify-content-start">
          <CustomButton @click="() => handleOpenProducts(element.id)" />
          <div class="d-flex flex-column">
            <span class="fs-5 lh-1">{{ element.products.length }}</span>
            <span class="order__products-title">Продукта</span>
          </div>
        </div>
        <OrderStats :order="element" />
        <div class="d-flex justify-content-start">
          <PriceDisplay :products="element.products" />
        </div>
        <BaseButton @click="() => handleDelete?.(element.id)">
          <img :src="imageBacket" alt="Delete icon" width="16" height="16">
        </BaseButton>
      </div>
    </template>
  </VirtualGrid>
  <div
     class="choice-product bg-white w-100 h-100 start-0 position-absolute"
    :class="{ 'choice-product--open': openListProducts }"
    >
    <ProductListShort  :order="orderChoice ?? emptyOrder" :showProducts="true" version="expanded">
      <template #header>
        <button class="button position-absolute top-0 end-0 me-2 mt-1 text-danger border-0 bg-transparent fs-5 fw-semibold" @click="handleCloseProducts">✕</button>
      </template>
    </ProductListShort>
  </div>
</template>

<style scoped>
.order {
  grid-template-columns: minmax(150px, 3fr) minmax(110px, 1fr) minmax(120px, 1fr) minmax(110px, 1fr) auto;
}

.order:hover {
  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.702);
}

.order__products-title {
  font-size: 14px;
  color: rgb(158, 158, 158);
}

.choice-product {
  top: 126px;
  transform: translateY(120%); 
  opacity: 0;
  transition: transform 1s ease, opacity 1s ease;
  pointer-events: none; 
}

.choice-product--open {
  transform: translateY(0); 
  opacity: 1;
  pointer-events: auto;
}

.button:active {
 transform: scale(0.95);
}
</style>