<script setup lang="ts">
import { onBeforeMount, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { fetchOrders, chooseOrderById } from '../services/orders';
import { getProductsForOrder } from '../services/product';
import { fetchProducts } from '../services/product';
import { deleteOrder } from '../api/ordersApi';
import { fetchCurrency } from '../services/settings';
import OrdersList from '../components/Arrival/OrdersList.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';
import EllipsisText from '../components/EllipsisText.vue';
import ProductListShort from '../components/Arrival/ProductListShort.vue';
import FormCreateOrder from '../components/Arrival/FormCreateOrder.vue';
import ButtonOpenForm from '../components/СomponentsForm/ButtonOpenForm.vue';

const store = useStore();
const token = computed(() => store.getters['auth/token']);
const orderId = computed(() => store.getters['orders/orderId']);
const countOrders = computed(() => store.getters['orders/count']);
const currentOrder = computed(() => store.getters['orders/currentOrder']);
const isLoading = ref<boolean>(false);
const isSuccessDelete = ref<boolean>(false);
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');
const showProducts = ref<boolean>(false);
const openForm = ref<boolean>(false);
const ordersListRef = ref<InstanceType<typeof OrdersList>>();
const isProductsOpen = computed(() => ordersListRef.value?.openListProducts ?? false);
const showCloseProductsButton = ref<boolean>(false);
let openListTimer: number | null = null;

const callChildClose = () => {
  ordersListRef.value?.handleCloseProducts();
};

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

watch(isProductsOpen, (isOpen) => {
  if (openListTimer) {
    clearTimeout(openListTimer);
    openListTimer = null;
  }

  if (isOpen) {
    openListTimer = window.setTimeout(() => {
      showCloseProductsButton.value = true;
    }, 1000);
  } else {
    showCloseProductsButton.value = false;
  }
});

watch(
  () => orderId.value,
  async (id: number) => {
    if (id !== null) {
      await chooseOrderById(id);
      handleDelete();
    }
  },
);

const handleDelete = () => {
  showModal.value = true;
};

const handleConfirmDelete = async () => {
  if (orderId.value === null || isLoading.value) return;

  try {
    isLoading.value = true;
    const res = await deleteOrder(orderId.value, token.value);

    if (res.success) {
      isSuccessDelete.value = true;
      fetchMessage.value = 'Удаление прихода прошло успешно!';

      setTimeout(() => {
        showModal.value = false;
        store.commit('orders/clearOrderId');
        store.commit('orders/clearCurrentOrder');
        fetchOrders(true);
        fetchProducts(true);
        fetchMessage.value = '';
        isSuccessDelete.value = false;
        isLoading.value = false;
      }, 3000);
      return;
    }

    throw new Error(res.error ?? 'Неизвестная ошибка');
  } catch (err: any) {
    fetchMessage.value = err.error || 'Произошла ошибка';

    setTimeout(() => {
      fetchMessage.value = '';
      isLoading.value = false;
    }, 3000);
  }
};

const handleCancelDelete = () => {
  showModal.value = false;
  showProducts.value = false;
  store.commit('orders/clearOrderId');
  store.commit('orders/clearCurrentOrder');
};

const handleOpenForm = () => {
  openForm.value = !openForm.value;
};

onBeforeMount(async () => {
  await fetchCurrency();
  await Promise.all([fetchOrders(), fetchProducts()]);
});
</script>

<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto position-relative d-flex flex-column overflow-hidden">
      <button
        v-if="showCloseProductsButton"
        class="button position-absolute z-2 rounded-circle shadow border-0 fw-semibold bg-white"
        @click="callChildClose"
      >
        ✕
      </button>

      <div class="main__inner d-flex flex-column overflow-x-auto overflow-y-hidden mx-3 position-relative">
        <div class="d-flex gap-3 align-items-center justify-content-start pt-5 mb-5">
          <ButtonOpenForm :onclick="handleOpenForm" />
          <h1>Приходы / {{ countOrders }}</h1>
        </div>
        <OrdersList ref="ordersListRef" />
      </div>
    </main>
    <ConfirmModal
      v-if="showModal"
      :message="fetchMessage"
      :success="isSuccessDelete"
      :isLoading="isLoading"
      name="приход"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    >
      <div class="modal-element p-4">
        <EllipsisText v-if="currentOrder" :title="currentOrder.title" className="fs-5 border-0 fw-medium" />
        <p class="fd-2 lh-sm my-2">{{ currentOrder?.description }}</p>
        <div v-if="getProductsForOrder(currentOrder?.id).length">
          <button class="modal-element__btn border-0 bg-transparent p-0 d-flex align-items-center" @click="toggleProducts">
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
  flex: 1;
  max-width: 1540px;
}

.main__inner {
  flex: 1;
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

.button {
  color: rgb(192, 192, 192);
  font-size: 12px;
  width: 32px;
  height: 32px;
  top: 110px;
  right: 5px;
}

.button:active {
  transform: scale(0.95);
}
</style>
