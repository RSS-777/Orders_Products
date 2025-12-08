<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { getOrders } from "../api/ordersApi";
import { deleteOrder } from '../api/ordersApi';
import type { IOrder } from '../types/order';
import OrdersList from '../components/Arrival/OrdersList.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';
import EllipsisText from '../components/EllipsisText.vue';
import ProductListShort from '../components/Arrival/ProductListShort.vue';
import FormCreateOrder from '../components/Arrival/FormCreateOrder.vue';

const state = reactive({
  countOrders: 0,
  dataOrders: [] as IOrder[],
});
const store = useStore();
const token = computed(() => store.getters['auth/token']);
const isLoading = ref<boolean>();
const orderId = ref<number | null>(null);
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');
const showProducts = ref<boolean>(false);
const openForm = ref<boolean>(false);

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

const currentOrder = computed(() => {
  if (orderId.value === null) return null;
  return state.dataOrders.find((o) => o.id === orderId.value) || null;
});

const handleConfirmDelete = async () => {
  if (orderId.value === null) return;

  isLoading.value = true;
  try {
    const res = await deleteOrder(orderId.value, token.value);

    if (res.error) {
      fetchMessage.value = res.error;
      setTimeout(() => {
        fetchMessage.value = '';
      }, 2000);
      return;
    }

    orderId.value = null;
    showModal.value = false;
  } catch (err) {
    fetchMessage.value = err instanceof Error ? err.message : 'Unexpected error';
    setTimeout(() => {
      fetchMessage.value = '';
    }, 2000);
  } finally {
    isLoading.value = false;
  }
};

const handleCancelDelete = () => {
  showModal.value = false;
};

const handleDelete = (id: number) => {
  orderId.value = id;
  showModal.value = true;
};

const handleOpenForm = () => {
  openForm.value = !openForm.value;
};

onMounted(async () => {
  const store = useStore();
  const token: string = store.getters['auth/token'];

  if (!token) {
    return console.error('No token found. Please log in.')
  }

  const res = await getOrders(token);

  if (res.success) {
    state.dataOrders = res.data || [];
    state.countOrders = state.dataOrders.length;
  } else {
    console.error('Error orders:', res.error);
  }
});
</script>

<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto position-relative">
      <div class="main__inner mx-3">
        <div class="d-flex gap-3 align-items-center justify-content-start pt-5">
          <button class="main__btn rounded-circle text-white d-flex align-items-center"
            @click="handleOpenForm">+</button>
          <h1>Приходы / {{ state.countOrders }}</h1>
        </div>
        <OrdersList :handleDelete="handleDelete" :orders="state.dataOrders" />
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
  max-width: 1540px;
  overflow-y: hidden;
}

.main__inner {
  overflow-x: auto;
}

.main__btn {
  background-color: #80b548;
  border: 5px solid #7bab4b;
  width: 30px;
  height: 30px;
}

.main__btn:active {
  transform: scale(0.9);
}

.modal-element {
  border-top: 1px solid rgb(189, 189, 189);
}

.modal-element__btn {
  color: #7bab4b;
}
</style>
