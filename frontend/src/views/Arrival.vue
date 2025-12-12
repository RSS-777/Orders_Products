<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { fetchOrders, chooseOrderById } from '../services/orders';
import { deleteOrder } from '../api/ordersApi';
import OrdersList from '../components/Arrival/OrdersList.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';
import EllipsisText from '../components/EllipsisText.vue';
import ProductListShort from '../components/Arrival/ProductListShort.vue';
import FormCreateOrder from '../components/Arrival/FormCreateOrder.vue';
import ButtonOpenForm from '../components/СomponentsForm/ButtonOpenForm.vue';

const store = useStore();
const token = computed(() => store.getters['auth/token']);
const orderId = computed(() => store.getters['orders/orderId'])
const countOrders = computed(() => store.getters['orders/count'])
const currentOrder = computed(() => store.getters['orders/currentOrder'])

const isLoading = ref<boolean>(false);
const isSuccessDelete = ref<boolean>(false);
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');
const showProducts = ref<boolean>(false);
const openForm = ref<boolean>(false);

const toggleProducts = () => {
  showProducts.value = !showProducts.value;
};

watch(() => orderId.value, (id: number) => {
  if (id !== null) {
    chooseOrderById(id);
    handleDelete();
  }
});

const handleDelete = () => {
  showModal.value = true;
};

const handleConfirmDelete = async () => {
  if (orderId.value === null) return;
  isLoading.value = true;

  try {
    const res = await deleteOrder(orderId.value, token.value);

    if (res.success) {
      fetchMessage.value = 'Удаление прихода прошло успешно!'
      isSuccessDelete.value = true

      setTimeout(() => {
        showModal.value = false;
        store.commit('orders/clearOrderId')
        store.commit('orders/clearCurrentOrder')
        fetchOrders(true)
        fetchMessage.value = ''
        isSuccessDelete.value = false
      }, 3000)
    }

  } catch (err: any) {
    fetchMessage.value = err.error || "Произошла ошибка";

    setTimeout(() => {
      fetchMessage.value = '';
    }, 2000);
  } finally {
    isLoading.value = false;
  }
};

const handleCancelDelete = () => {
  showModal.value = false;
  showProducts.value = false
  store.commit('orders/clearOrderId')
  store.commit('orders/clearCurrentOrder')
};

const handleOpenForm = () => {
  openForm.value = !openForm.value;
};

onMounted(async () => {
  await fetchOrders()
});
</script>

<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto position-relative">
      <div class="main__inner mx-3">
        <div class="d-flex gap-3 align-items-center justify-content-start pt-5">
          <ButtonOpenForm :onclick="handleOpenForm" />
          <h1>Приходы / {{ countOrders }}</h1>
        </div>
        <OrdersList />
      </div>
    </main>
    <ConfirmModal v-if="showModal" :message="fetchMessage" :success="isSuccessDelete" name="приход"
      @confirm="handleConfirmDelete" @cancel="handleCancelDelete" :isLoading="isLoading">
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
