<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getOrders } from "../api/data";
// import { getOrders } from "../api/ordersApi";
import type { IOrder } from "../types/order";
import CustomButton from "../components/CustomButton.vue";
import type { IProduct } from "../types/product";
import PriceDisplay from "../components/Arrival/PriceDisplay.vue";
import BaseButton from "../components/BaseButton.vue";
import imageBacket from "../assets/basket.png";

const state = reactive({
  countOrders: 0,
  dataOrders: [] as IOrder[],
});

onMounted(async () => {
  const res = await getOrders();

  if (res.success) {
    state.dataOrders = res.data || [];
    state.countOrders = state.dataOrders.length;
    console.log("Orders loaded:", state.dataOrders);
  } else {
    console.error("Error orders:", res.error);
  }
});

const handleOpenProducts = () => {
  console.log('handleOpenProducts')
}

const handleDelete = () => {
  console.log('handleDelete')
}
</script>


<template>
  <main class="main w-100 overflow-x-auto px-3 mx-auto">
    <div class="main__inner w-100">
      <div class="title d-flex gap-3 align-items-center justify-content-start pt-5">
        <button class="title__btn btn btn-sm rounded-circle text-white">+</button>
        <h1>Приходы / {{ state.countOrders }}</h1>
      </div>

      <div class="order pt-5 d-flex flex-column  gap-2">

        <div v-for="element in state.dataOrders" :key="element.id" class="order__block border rounded-2  gap-3 p-2">
          <p class="order__title text-truncate flex-grow-1" :title="element.title">
            <span class="order__title-text">{{ element.title }}</span>
          </p>

          <div class="order__products d-flex align-items-center gap-3 justify-content-center">
            <CustomButton @click="handleOpenProducts" />
            <div class="d-flex flex-column">
              <span class="fs-5 lh-1">{{ element.products.length }}</span>
              <span class="order__products-title">Продукта</span>
            </div>
          </div>

          <div class="order__date d-flex flex-column align-items-center justify-content-center">
            <span class="order__date-count">{{element.products.filter(p => p.isNew === 1).length}} / {{
              element.products.length }}</span>
            <span class="order__date-time">{{ element.date.split(' ')[0] }}</span>
          </div>
          <div class="d-flex justify-content-center">
            <PriceDisplay :products="element.products"/>
          </div>
          <BaseButton @click="handleDelete">
            <img :src="imageBacket" alt="Icon basket" width="12" height="12">
          </BaseButton>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  max-width: 1440px;
}

.main__inner {
  min-width: 800px;
}

.title__btn {
  background-color: #80B548;
  border: 5px solid #7BAB4B;
  width: 30px;
  height: 30px;
  padding: 0;
}

.order__block {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  align-items: center;
}

.order__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
  max-width: 400px;
}

.order__products-title {
  font-size: 12px;
  color: rgb(158, 158, 158);
}

.order__title-text {
  line-height: 1.2;
  border-bottom: 1px solid rgb(182, 182, 182);
}

.order__date-count {
  font-size: 12px;
  color: rgb(158, 158, 158);
}
</style>