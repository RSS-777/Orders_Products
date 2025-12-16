<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, computed, watch, nextTick } from 'vue';
import type { IOrder } from '../../types/order';
import { chooseOrderById } from '../../services/orders';
import { cachedOrders } from '../../services/orders';
import { findIdByDate } from '../../utils/findIdByDate';
import FormattedDate from '../FormattedDate.vue';
import CustomButton from '../CustomButton.vue';
import EllipsisText from '../EllipsisText.vue';
import VirtualGrid from '../VirtualGrid.vue';
import ProductListShortPlus from './ProductListShortPlus.vue';
import iconArrow from '../../assets/arrow-icon.png';

const store = useStore();
const openListProducts = ref<boolean>(false);
const tempScroll = ref<number | undefined>(undefined); //Использую undefined вместо null, потому что vue-virtual-scroll-grid !!!
const orders = computed<IOrder[]>(() => cachedOrders.value);
const searchText = computed(() => store.getters['search/text']);
const orderChoice = computed(() => store.getters['orders/currentOrder']);
const sortedOrders = computed<IOrder[]>(() => {
  return [...orders.value].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
});

watch(searchText, (newValue) => {
  if (newValue) findOrder();
});

const findOrder = async () => {
  if (!searchText.value || !sortedOrders.value) return;

  const id = findIdByDate(sortedOrders.value, searchText.value);
  if (!id) return;

  const index = sortedOrders.value.findIndex((order) => order.id === id);
  if (index === -1) return;
  tempScroll.value = index;

  await nextTick();

  setTimeout(() => {
    tempScroll.value = undefined;
  }, 1500);
};

const handleOpenProductForm = (id: number) => {
  if (!id) return;
  store.commit('orders/setOrderId', id);
  store.commit('products/openCreateProductForm');
};

const handleOpenProductList = (id: number) => {
  chooseOrderById(id);
  nextTick(() => (openListProducts.value = true));
};

const handleCloseProductList = () => {
  openListProducts.value = false;
  store.commit('orders/clearCurrentOrder');
};
</script>

<template>
  <div class="wrapper d-flex overflow-x-visible h-100">
    <div class="group d-grid overflow-y-hidden pt-3 px-4 h-100" :class="{ 'gap-4': openListProducts }">
      <VirtualGrid 
        :items="sortedOrders" 
        :tempScroll="tempScroll" 
        classGrid="d-grid gap-2" 
        :heightElement="60"
      >
        <template #default="{ item: element }">
          <div class="order position-relative d-grid align-items-center rounded-2 gap-3 py-2 px-4 mx-1 bg-white"
            :class="{ 'order--active': element.id === orderChoice?.id }"
            >
            <div class="order__products d-flex align-items-center gap-3 justify-content-start">
              <CustomButton @click="() => handleOpenProductList(element.id)" />
              <div class="d-flex flex-column">
                <span class="fs-5 lh-1">{{ element.products.length }}</span>
                <span class="order__products-title">Продукта</span>
              </div>
            </div>
            <FormattedDate :date="element.date" :className="'align-self-start'" />
            <img v-if="element.id === orderChoice?.id" :src="iconArrow" alt="button" height="100%"
              class="order__arrow-icon position-absolute z-2 top-50" />
          </div>
        </template>
      </VirtualGrid>
      <div class="choice-products d-flex flex-column bg-white position-relative rounded-1 h-100"
        :class="{ 'choice-products--open': openListProducts }">
        <button v-if="openListProducts"
          class="choice-products__btn-close position-absolute rounded-circle shadow border-0 fw-semibold bg-white"
          @click="handleCloseProductList">
          ✕
        </button>
        <div class="choice-products__inner d-flex flex-column overflow-y-auto overflow-x-hidden">
          <div class="choice-products__header">
            <EllipsisText :title="orderChoice?.title" className="border-0 fs-6 text-dark"
              classBlock="mt-4 mx-4 choice-products__title fw-medium" maxWidth="90%" />
            <div class="d-flex gap-3 align-items-center ms-4 mt-3">
              <button type="button"
                class="choice-products__btn btn shadow-sm rounded-circle d-flex align-items-center justify-content-center text-white border-0"
                @click="handleOpenProductForm(orderChoice?.id)">
                +
              </button>
              <span>Добавить продукт</span>
            </div>
          </div>
          <ProductListShortPlus />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  flex: 1;
  min-height: 0;
}

.group {
  flex: 1;
  grid-template-columns: minmax(350px, 400px) auto;
  min-height: 0;
}

.order {
  grid-template-columns: minmax(110px, 1fr) 2fr;
  border: 1px solid #D1DADE;
}

.order--active::before {
  content: '';
  position: absolute;
  border-radius: 0 5px 5px 0;
  right: 0;
  width: 40px;
  height: 100%;
  z-index: 2;
  background-color: #cfd8dc;
}

.order__products-title {
  font-size: 14px;
  color: rgb(158, 158, 158);
}

.order__arrow-icon {
  right: 8px;
  transform: translateY(-50%) rotate(180deg);
  width: 20px;
  height: 20px;
}

.choice-products {
  width: 0;
  opacity: 0;
  border: 0;
  min-height: 0;
  transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

.choice-products--open {
  width: 100%;
  opacity: 1;
  border: 1px solid #D1DADE;
}

.choice-products__btn-close {
  color: rgb(192, 192, 192);
  font-size: 12px;
  width: 32px;
  height: 32px;
  top: -15px;
  right: -15px;
}

.choice-products__btn-close:active {
  transform: scale(0.95);
}

.choice-products__inner {
  flex: 1 1 auto;
  min-height: 0;
}

.choice-products__header {
  flex: 0 0 auto;
  color: #80b548;
}

.choice-products__title {
  letter-spacing: 1px;
}

.choice-products__btn {
  width: 26px;
  height: 26px;
  font-size: 24px;
  background-color: #80b548;
}

@media (hover: hover) and (pointer: fine) {
  .order:hover {
    box-shadow: 1px 1px 5px 0 #80B548;
    outline: 1px solid #80B548;
  }
}
</style>
