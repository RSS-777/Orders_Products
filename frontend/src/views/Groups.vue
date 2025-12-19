<script setup lang="ts">
import { useStore } from 'vuex';
import type { IProduct } from '../types/product';
import { onBeforeMount, onBeforeUnmount, computed, ref, watch } from 'vue';
import { deleteProduct } from '../api/productsApi';
import { fetchOrders, cachedOrders } from '../services/orders';
import { fetchProducts, chooseProductById } from '../services/product';
import GroupsList from '../components/Groups/GroupsList.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';
import EllipsisText from '../components/EllipsisText.vue';
import FormCreateOrder from '../components/Arrival/FormCreateOrder.vue';
import FormCreateProduct from '../components/Groups/FormCreateProduct.vue';
import ButtonOpenForm from '../components/СomponentsForm/ButtonOpenForm.vue';
import ProductNewIndicator from '../components/Products/ProductNewIndicator.vue';
import ProductImage from '../components/Products/ProductImage.vue';
import SecondaryText from '../components/SecondaryText.vue';

const store = useStore();
const isLoading = ref<boolean>(false);
const massage = ref<string | null>(null);
const createOrder = ref<boolean>(false);
const isDeleteProduct = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);
const createProduct = computed<boolean>(() => store.getters['products/isCreateProductFormOpen']);
const orders = computed(() => cachedOrders.value);
const idProduct = computed(() => store.getters['products/idProduct']);
const idOrder = computed(() => store.getters['orders/orderId']);
const countOrders = computed(() => store.getters['orders/count']);
const currentProduct = computed<IProduct | null>(() => store.getters['products/currentProduct'] as IProduct | null);

watch(idProduct, (id) => {
  if (!id) return;
  openDeleteModal(id);
});

const handleCloseProductForm = () => {
  store.commit('products/closeCreateProductForm');
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
  if (isLoading.value) return;
  const token = store.getters['auth/token'];
  const productId = idProduct.value;

  try {
    isLoading.value = true;
    const res = await deleteProduct(productId, token);

    if (res.success) {
      massage.value = 'Продукт успешно удалён!';
      isDeleteProduct.value = true;

      setTimeout(() => {
        showDeleteModal.value = false;
        fetchOrders(true);
        fetchProducts(true);
        store.commit('products/clearCurrentProduct');
        store.commit('products/clearProductId');
        massage.value = null;
        isDeleteProduct.value = false;
        isLoading.value = false;
      }, 3000);
      return;
    }

    throw new Error(res.error ?? 'Неизвестная ошибка');
  } catch (err: any) {
    massage.value = err.error || 'Произошла ошибка';

    setTimeout(() => {
      isLoading.value = false;
      massage.value = null;
    }, 2000);
  }
};

onBeforeMount(async () => {
  await Promise.all([fetchOrders(), fetchProducts()]);
});

onBeforeUnmount(() => {
  store.commit('products/clearProductId');
  store.commit('products/clearCurrentProduct');
  store.commit('products/closeCreateProductForm');
  store.commit('orders/clearCurrentOrder');
  store.commit('orders/clearOrderId');
});
</script>

<template>
  <WrapperMain>
    <main class="main full-page d-flex flex-column pb-2 mx-auto position-relative over overflow-hidden">
      <div class="main__inner d-flex flex-column mx-3 overflow-hidden">
        <div class="d-flex gap-3 align-items-center justify-content-start mb-4 pt-5 ps-4">
          <ButtonOpenForm :onclick="handleToggleOrderForm" />
          <h1>Приходы / {{ countOrders }}</h1>
        </div>
        <GroupsList :orders="orders" />
      </div>
    </main>
    <FormCreateOrder v-if="createOrder" @close="handleToggleOrderForm" />
    <FormCreateProduct v-if="createProduct && idOrder" :idOrder="idOrder" @close="handleCloseProductForm" />
    <ConfirmModal
      v-if="showDeleteModal"
      :message="massage"
      :success="isDeleteProduct"
      name="продукт"
      :isLoading="isLoading"
      @confirm="handleSubmitDeleteProduct"
      @cancel="handleCenselDeleteProduct"
    >
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
  flex: 1;
  max-width: 1540px;
}

.main__inner {
  flex: 1;
}

.modal-element {
  border-top: 1px solid rgb(189, 189, 189);
  grid-template-columns: auto auto 5fr;
}

.modal-element__btn {
  color: #7bab4b;
}
</style>
