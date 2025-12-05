<script setup lang="ts">
import { onMounted, computed, reactive, ref } from "vue";
import { getOrders } from "../api/data";
import OrderProducts from "../components/Arrival/OrderProducts.vue";
// import { getOrders } from "../api/ordersApi";
import type { IOrder } from "../types/order";
import ConfirmModal from "../components/ConfirmModal.vue";
import WrapperMain from "../components/WrapperMain.vue";
import { deleteOrder } from "../api/ordersApi";
import defaultImageProduct from "../assets/box.png"
import EllipsisText from "../components/EllipsisText.vue";
import SecondaryText from "../components/SecondaryText.vue";

const state = reactive({
  countOrders: 0,
  dataOrders: [] as IOrder[],
});

const orderId = ref<number | null>(null)
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('')
const showProducts = ref<boolean>(false);

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

const currentOrder = computed(() => {
  if (orderId.value === null) return null
  return state.dataOrders.find(o => o.id === orderId.value) || null
})

const handleConfirmDelete = async () => {
  if (orderId.value === null) return;

  const res = await deleteOrder(orderId.value)

  if (res.error) {
    fetchMessage.value = res.error
    setTimeout(() => { fetchMessage.value = '' }, 2000)
    return
  }

  orderId.value = null
  showModal.value = false
}

const handleCancelDelete = () => {
  showModal.value = false
}

const handleDelete = (id: number) => {
  orderId.value = id
  showModal.value = true
}

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
</script>


<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto w-100 overflow-auto">
      <div class="main__inner mx-3">
        <div class="title d-flex gap-3 align-items-center justify-content-start pt-5">
          <button class="title__btn btn btn-sm rounded-circle text-white p-0">+</button>
          <h1>Приходы / {{ state.countOrders }}</h1>
        </div>
        <OrderProducts :handleDelete="handleDelete"
          :orders="state.dataOrders" />
      </div>
    </main>
    <ConfirmModal :show="showModal" :message="fetchMessage" name="приход" @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete">
      <div class="modal-element p-4">
        <EllipsisText v-if="currentOrder" :title="currentOrder.title"  className="fs-5 border-0 fw-medium"/>
        <p class="fd-2 lh-sm my-2">{{ currentOrder?.description }}</p>
        <div v-if="currentOrder?.products.length">
          <button class="modal-element__btn border-0 bg-transparent p-0 d-flex align-items-center" @click="toggleProducts">
            <span>Продукти</span> <span>{{showProducts ? '▲': '▼'}}</span>
          </button>
          <ul class="product list-unstyled mt-2 overflow-y-auto"
            :style="{ maxHeight: showProducts ? '200px' : '5px', transition: 'max-height 0.5s ease' }">
            <li v-for="product in currentOrder?.products" :key="product.id" class="product__list gap-4 py-1">
              <div class="product__status rounded-circle ms-4"
                :class="product.isNew ? 'product__status--active' : 'product__status--inActive'"
                :aria-label="product.isNew ? 'новый продукт' : 'существующий продукт'"></div>
              <img :src="product.photo ? product.photo : defaultImageProduct" alt="Product" width="42" height="42"
                class="me-3">
              <div class="product__information overflow-hidden">
                <EllipsisText :title="product.title" />
                <SecondaryText :text="product.serialNumber" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ConfirmModal>
  </WrapperMain>
</template>

<style scoped>
.main {
  max-width: 1440px;
}

.main__inner {
  min-width: 780px;
}

.title__btn {
  background-color: #80B548;
  border: 5px solid #7BAB4B;
  width: 30px;
  height: 30px;
}

.modal-element {
  border-top: 1px solid rgb(189, 189, 189);
}

.modal-element__btn {
   color: #7BAB4B;
}

.product__status {
  width: 8px;
  height: 8px;
  background-color: #7BAB4B;
}

.product__status--active {
  background-color: #7BAB4B;
}

.product__status--inActive {
  background-color: rgb(171, 132, 3);
}

.product__list {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  border-top: 1px solid rgb(223, 223, 223);
}

.product__information {
  max-width: 420px;
}
</style>