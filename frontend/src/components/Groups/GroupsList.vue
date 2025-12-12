<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, computed, watch, nextTick } from 'vue';
import CustomButton from '../CustomButton.vue';
import iconArrow from '../../assets/arrow-icon.png'
import EllipsisText from '../EllipsisText.vue';
import VirtualGrid from '../VirtualGrid.vue';
import Date from '../Date.vue';
import ProductListShortPlus from './ProductListShortPlus.vue';
import { chooseOrderById } from '../../services/orders';
import { cachedOrders } from '../../services/orders';
import { findIdByDate } from '../../utils/findIdByDate';

const orders = computed(() => cachedOrders.value);
const searchText = computed(() => store.getters['search/text']);
const orderChoice = computed(() => store.getters['orders/currentOrder']);
const store = useStore();
const tempScroll = ref<number | undefined>(undefined);
const openListProducts = ref<boolean>(false);

watch(searchText, (newValue) => {
  if (newValue) findOrder();
});

const findOrder = async () => {
  if (!searchText.value || !orders.value) return;

  const id = findIdByDate(orders.value, searchText.value);
  if (!id) return;

  tempScroll.value = id - 1;
  await nextTick();
  setTimeout(() => {
    tempScroll.value = undefined;
  }, 1000);
};


const handleOpenProductForm = (id: number) => {
  if (!id) return;
  store.commit('orders/setOrderId', id)
  store.commit('products/openCreateProductForm')
}

const handleOpenProductList = (id: number) => {
  chooseOrderById(id);
  nextTick(() => openListProducts.value = true);
};

const handleCloseProductList = () => {
  openListProducts.value = false;
  store.commit('orders/clearCurrentOrder');
};

</script>
<template>
  <div class="wrapper">
    <div class="group d-grid gap-4  px-4">

      <VirtualGrid :items="orders" :tempScroll="tempScroll ? tempScroll : undefined" classGrid="d-grid gap-2"
        :maxHeightGrid="650" :heightElement="60">
        <template #default="{ item: element }">
          <div class="order relative d-grid align-items-center border rounded-2 gap-3 p-2 px-4 bg-white"
            :class="{ 'order--active': element.id === orderChoice?.id }">
            <div class="order__products d-flex align-items-center gap-3 justify-content-start">
              <CustomButton @click="() => handleOpenProductList(element.id)" />
              <div class="d-flex flex-column">
                <span class="fs-5 lh-1">{{ element.products.length }}</span>
                <span class="order__products-title">Продукта</span>
              </div>
            </div>
            <Date :date="element.date" :className="'align-self-start'" />
            <img v-if="element.id === orderChoice?.id" :src="iconArrow" alt="button" height="100%"
              class="order__btn position-absolute top-50 ">
          </div>
        </template>
      </VirtualGrid>

      <div class="choice-products bg-white  position-relative" :class="{ 'choice-products--open': openListProducts }">
        <EllipsisText :title="orderChoice?.title" className="border-0 fs-6 text-dark"
          classBlock="mt-4 mx-4 choice-products__title" maxWidth="90%" />

        <button type="button"
          class="btn rounded-circle-btn shadow-sm rounded-circle d-flex align-items-center justify-content-center ms-4 mt-3 text-white border-0"
          @click="handleOpenProductForm(orderChoice?.id)">
          +
        </button>
        <ProductListShortPlus>
          <template #header>
            <button class="button position-absolute rounded-circle shadow  border-0 fw-semibold bg-white"
              @click="handleCloseProductList">
              ✕
            </button>
          </template>
        </ProductListShortPlus>
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

.order__btn {
  right: 8px;
  transform: translateY(-50%) rotate(180deg);
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

.button {
  color: rgb(192, 192, 192);
  font-size: 12px;
  width: 32px;
  height: 32px;
  top: -15px;
  right: -15px;
}

.button:active {
  transform: scale(0.95);
}

.choice-products--open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.choice-products__title {
  letter-spacing: 1px;
  font-weight: 500;
}

.rounded-circle-btn {
  width: 26px;
  height: 26px;
  font-size: 24px;
  background-color: #80B548;
}
</style>
