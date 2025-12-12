<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import type { IProduct } from '../types/product';
import GroupsList from '../components/Groups/GroupsList.vue';
import { deleteProduct } from '../api/productsApi';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';
import EllipsisText from '../components/EllipsisText.vue';
import FormCreateOrder from '../components/Arrival/FormCreateOrder.vue';
import FormCreateProduct from '../components/Groups/FormCreateProduct.vue';
import ButtonOpenForm from '../components/СomponentsForm/ButtonOpenForm.vue';
import ProductNewIndicator from '../components/Products/ProductNewIndicator.vue';
import ProductImage from '../components/Products/ProductImage.vue';
import SecondaryText from '../components/SecondaryText.vue';

import { fetchOrders, cachedOrders } from '../services/orders';
import { fetchProducts, chooseProductById } from '../services/product';

const store = useStore();

const isLoading = ref<boolean>(false);
const massage = ref<string | null>(null);
const createOrder = ref<boolean>(false);
const isDeleteProduct = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false);

const createProduct = computed<boolean>(() => store.getters['products/isCreateProductFormOpen']);
const orders = computed(() => cachedOrders.value);
const idProduct = computed(() => store.getters['products/idProduct']);
const idOrder = computed(() => store.getters['orders/orderId']);
const countOrders = computed(() => store.getters['orders/count']);
const currentProduct = computed<IProduct | null>(() => store.getters['products/currentProduct'] as IProduct | null);

watch(idProduct, (id) => {
  if (!id) return
    openDeleteModal(id)
});

const handleCloseProductForm = () => {
  store.commit('products/closeCreateProductForm')
};

const handleToggleOrderForm = () => {
  createOrder.value = !createOrder.value;
};

const openDeleteModal = (id: number) => {
  chooseProductById(id);
  showDeleteModal.value = true;
};

const handleCenselDeleteProduct = () => {
  showDeleteModal.value = false;
  store.commit('products/clearProductId');
};

const handleSubmitDeleteProduct = async () => {
  const token = store.getters['auth/token'];
  const productId = idProduct.value;

  if (!token || !productId) {
    return console.error('There is no token or product ID for deletion.');
  }

  isLoading.value = true;
  const res = await deleteProduct(productId, token);

  if (res.success) {
    massage.value = "Продукт успешно удалён!";
    isDeleteProduct.value = true

    setTimeout(() => {
      showDeleteModal.value = false;
      fetchOrders(true);
      store.commit('products/clearCurrentProduct');
      store.commit('products/clearProductId')
      massage.value = null
      isDeleteProduct.value = false
    }, 3000);
  } else {
    massage.value = "Ошибка при удалении продукта.";

    setTimeout(() => {
      massage.value = null;
    }, 2000)
  }

  isLoading.value = false;
};

onMounted(async () => {
  await fetchOrders();
  await fetchProducts();
});

onBeforeUnmount(() => {
  store.commit('products/clearProductId');
  store.commit('products/clearCurrentProduct');
  store.commit('products/closeCreateProductForm')
});
</script>

<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto position-relative">
      <div class="main__inner mx-3">
        <div class="d-flex gap-3 align-items-center justify-content-start pt-5">
          <ButtonOpenForm :onclick="handleToggleOrderForm" />
          <h1>Приходы / {{ countOrders }}</h1>
        </div>
        <GroupsList :orders="orders" />
      </div>
    </main>
    <FormCreateOrder v-if="createOrder" @close="handleToggleOrderForm" />
    <FormCreateProduct v-if="createProduct && idOrder" :idOrder="idOrder" @close="handleCloseProductForm" />
    <ConfirmModal v-if="showDeleteModal" :message="massage" :success="isDeleteProduct" name="продукт"
      :isLoading="isLoading" @confirm="handleSubmitDeleteProduct" @cancel="handleCenselDeleteProduct">
      <div class="modal-element d-grid align-items-center gap-4 py-2">
        <ProductNewIndicator v-if="currentProduct" :status="currentProduct.status" />
        <ProductImage :src="currentProduct?.photo" />
        <div class="d-flex flex-column w-100 overflow-hidden">
          <EllipsisText v-if="currentProduct" :title="currentProduct.title" className="border-0 fw-medium" />
          <SecondaryText v-if="currentProduct" :text="currentProduct?.serialNumber" />
        </div>
      </div>
    </ConfirmModal>
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
  grid-template-columns: auto auto 5fr;
}

.modal-element__btn {
  color: #7bab4b;
}
</style>
