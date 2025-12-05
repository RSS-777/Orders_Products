<script setup lang="ts">
import { onMounted, computed, reactive, ref } from "vue";
import { getOrders } from "../api/data";
import OrderProducts from "../components/Arrival/OrderProducts.vue";
// import { getOrders } from "../api/ordersApi";
import type { IOrder } from "../types/order";
import ConfirmModal from "../components/ConfirmModal.vue";
import WrapperMain from "../components/WrapperMain.vue";
import { deleteOrder } from "../api/ordersApi";
import EllipsisText from "../components/EllipsisText.vue";
import ProductListShort from "../components/Arrival/ProductListShort.vue";
import FormCreateOrder from "../components/Arrival/FormCreateOrder.vue";

const state = reactive({
  countOrders: 0,
  dataOrders: [] as IOrder[],
});

const isLoading = ref<boolean>()
const orderId = ref<number | null>(null)
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('')
const showProducts = ref<boolean>(false);
const openForm = ref<boolean>(false)

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

const currentOrder = computed(() => {
  if (orderId.value === null) return null
  return state.dataOrders.find(o => o.id === orderId.value) || null
})

const handleConfirmDelete = async () => {
  if (orderId.value === null) return;

  isLoading.value = true
  try {
    const res = await deleteOrder(orderId.value)

    if (res.error) {
      fetchMessage.value = res.error
      setTimeout(() => { fetchMessage.value = '' }, 2000)
      return
    }

    orderId.value = null;
    showModal.value = false;

  } catch (err) {
    fetchMessage.value = (err instanceof Error ? err.message : 'Unexpected error');
    setTimeout(() => { fetchMessage.value = ''; }, 2000);
  } finally {
    isLoading.value = false;
  }
}

const handleCancelDelete = () => {
  showModal.value = false
}

const handleDelete = (id: number) => {
  orderId.value = id
  showModal.value = true
}

const handleOpenForm = () => {
  openForm.value = !openForm.value
}

onMounted(async () => {
  const res = await getOrders();

  if (res.success) {
    state.dataOrders = res.data || [];
    state.countOrders = state.dataOrders.length;
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
          <button class="title__btn btn btn-sm rounded-circle text-white p-0" @click="handleOpenForm">+</button>
          <h1>Приходы / {{ state.countOrders }}</h1>
        </div>
        <OrderProducts :handleDelete="handleDelete" :orders="state.dataOrders" />
      </div>
    </main>
    <ConfirmModal :show="showModal" :message="fetchMessage" name="приход" @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete" :isLoading="isLoading">
      <div class="modal-element p-4">
        <EllipsisText v-if="currentOrder" :title="currentOrder.title" className="fs-5 border-0 fw-medium" />
        <p class="fd-2 lh-sm my-2">{{ currentOrder?.description }}</p>
        <div v-if="currentOrder?.products.length">
          <button class="modal-element__btn border-0 bg-transparent p-0 d-flex align-items-center"
            @click="toggleProducts">
            <span>Продукти</span> <span>{{ showProducts ? '▲' : '▼' }}</span>
          </button>
          <ProductListShort :order="currentOrder" :showProducts="showProducts" />
        </div>
      </div>
    </ConfirmModal>
    <FormCreateOrder v-if="openForm" @close="handleOpenForm" />
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
</style>