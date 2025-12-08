<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, computed, watch, nextTick } from 'vue';
import type { IOrder } from '../../types/order';
import CustomButton from '../CustomButton.vue';
import arrow from '../../assets/arrow-icon.png'
import EllipsisText from '../EllipsisText.vue';
import VirtualGrid from '../VirtualGrid.vue';
// import PriceDisplay from '../Arrival/PriceDisplay.vue';
// import BaseButton from '../BaseButton.vue';
import OrderStats from '../Arrival/OrderStats.vue';
import ProductListShort from '../Arrival/ProductListShort.vue';
// import imageBacket from '../../assets/basket.png';
// import { products } from '../../api/data';

const { orders, handleDelete } = defineProps<{
  orders: IOrder[];
  handleDelete?: (id: number) => void;
}>();

const emptyOrder: IOrder = {
  id: 0,
  title: '',
  date: '',
  description: '',
  products: [],
};

const store = useStore();
const tempScroll = ref<number | undefined>(undefined); // Здесь обязательно должно быть именно undefined!!! 
const searchText = computed(() => store.getters['search/text']);
const orderChoice = ref<IOrder | null>(null);
const openListProducts = ref<boolean>(false);

const findOrder = async () => {
  if (!searchText.value) return;
  const index = orders.findIndex((order) => order.title.toLowerCase().includes(searchText.value.toLowerCase()));

  if (index !== -1) {
    tempScroll.value = index;
    await nextTick();
    setTimeout(() => {
      tempScroll.value = undefined;
    }, 1000);
  }
};

const handleOpenProducts = (id: number) => {
  const order = orders.find((el) => el.id === id) || null;
  if (!order || !order.products?.length) return;
  orderChoice.value = order;
  nextTick(() => {
    openListProducts.value = true;
  });
};

const handleCloseProducts = () => {
  openListProducts.value = false;
  orderChoice.value = null
};

watch(searchText, (newValue) => {
  if (newValue) findOrder();
});
</script>
<template>
    <div class="wrapper">

            <div class="group d-grid gap-4  px-4">

            <VirtualGrid 
                :items="orders" 
                :tempScroll="tempScroll ? tempScroll : undefined" 
                classGrid="d-grid gap-2" 
                :maxHeightGrid="650" 
                :heightElement="60"
            >
            <template #default="{ item: element }">

            <div 
            class="order relative d-grid align-items-center border rounded-2 gap-3 p-2 px-4 bg-white"
            :class="{ 'order--active': element.id === orderChoice?.id }"
            >
                <div class="order__products d-flex align-items-center gap-3 justify-content-start">
                <CustomButton @click="() => handleOpenProducts(element.id)" />
                <div class="d-flex flex-column">
                    <span class="fs-5 lh-1">{{ element.products.length }}</span>
                    <span class="order__products-title">Продукта</span>
                </div>
                </div>
                <OrderStats :order="element" :classNameCounter="'align-self-start'"/>
                <img v-if="element.id === orderChoice?.id"  
                    src="arrow"
                    alt="click" 
                    height="100%" 
                    class="order__arrow position-absolute top-50 ">
            </div>

            </template>
        </VirtualGrid>

        <div class="choice-products bg-white  position-relative" :class="{ 'choice-products--open': openListProducts }">
            <EllipsisText  />
            <ProductListShort :order="orderChoice ?? emptyOrder" :showProducts="true" version="expanded">
            <template #header>
                <button
                class="button position-absolute top-0 end-0 me-2 mt-1 text-danger border-0 bg-transparent fs-5 fw-semibold"
                @click="handleCloseProducts"
                >
                ✕
                </button>
            </template>
            </ProductListShort>
        </div>
   </div>
</div>
</template>

<style scoped>
.wrapper {
    grid-template-columns: minmax(350px, 1fr) 2fr;
    overflow-y: hidden;
    overflow-x: auto;
}

.group {
    grid-template-columns: minmax(350px, 1fr) 2fr;
    overflow-y: hidden;
    overflow-x: auto;
    min-width: 750px;
}

.order {
  grid-template-columns: minmax(110px, 1fr) 2fr;
}

.order--active::before {
 content: '';
 position: absolute;
 border-radius: 0 5px 5px 0;
 right: 0;
 width: 40px;
 height: 100%;
 z-index: 2;
 background-color: #CFD8DC;
}

.order__arrow {
  right: 8px;       
  transform: translateY(-50%) rotate(180deg);;
  width: 20px;       
  height: 20px;         
  z-index: 10;        
  pointer-events: none; 
}

.order:hover {
  box-shadow: 1px 1px 8px 0 rgba(100, 100, 100, 0.702);
}

.order__products-title {
  font-size: 14px;
  color: rgb(158, 158, 158);
}

.choice-products {
  top: 50px;
  transform: translateY(120%);
  opacity: 0;
  transition:
    transform 1s ease,
    opacity 1s ease;
  pointer-events: none;
}

.choice-products--open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.button:active {
  transform: scale(0.95);
}
</style>
