<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue';
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
const createProduct = ref<boolean>(false);

const orders = computed(() => cachedOrders.value);
const idProduct = computed(() => store.getters['products/idProduct']);
const idOrder = computed(() => store.getters['order/orderId']);
const countOrders = computed(() => store.getters['order/countOrders'])
const currentProduct = computed<IProduct | null>(() => store.getters['products/currentProduct'] as IProduct | null);

watch(idProduct, (id) => {
  chooseProductById(id);
});

const submitDeleteProduct = async () => {
  const token = store.getters['auth/token'];
  const productId = idProduct.value;

  if (!token || !productId) {
    return console.error('There is no token or product ID for deletion.');
  }

  isLoading.value = true;
  const res = await deleteProduct(productId, token);

  if (res.success) {
    massage.value = "Продукт успішно видалено!";
    await fetchOrders(true);
    store.commit('products/clearCurrentProduct');
    setTimeout(() => (massage.value = null), 3000);
  } else {
    massage.value = "Помилка при видаленні продукту.";
  }

  isLoading.value = false;
};


const handleCreateOpenProduct = () => {
  createProduct.value = !createProduct.value;
};

const handleCreateOpenOrder = () => {
  createOrder.value = !createOrder.value;
};

const handleCancelDelete = () => {
  store.commit('products/clearProductId');
};

onMounted(async () => {
  await fetchOrders();
  await fetchProducts();
});
</script>

<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto position-relative">
      <div class="main__inner mx-3">
        <div class="d-flex gap-3 align-items-center justify-content-start pt-5">
          <ButtonOpenForm :onclick="handleCreateOpenOrder" />
          <h1>Приходы / {{ countOrders }}</h1>
        </div>
        <GroupsList :orders="orders" />
      </div>
    </main>
    <FormCreateOrder v-if="createOrder" @close="handleCreateOpenOrder" />
    <FormCreateProduct v-if="createProduct" :idOrder="idOrder" @close="handleCreateOpenProduct" />
    <ConfirmModal
      v-if="idProduct !== null"
      :message="massage"
      name="продукт"
      @confirm="submitDeleteProduct"
      @cancel="handleCancelDelete"
    >
      <div class="modal-element d-grid align-items-center gap-2 py-2">
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
}

.modal-element__btn {
  color: #7bab4b;
}
</style>
