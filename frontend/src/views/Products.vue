<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { fetchProducts, chooseProductById } from '../services/product';
import { fetchOrders } from '../services/orders';
import { deleteProduct } from '../api/productsApi';
import ProductsList from '../components/Products/ProductsList.vue';
import ProductNewIndicator from '../components/Products/ProductNewIndicator.vue';
import ProductImage from '../components/Products/ProductImage.vue';
import EllipsisText from '../components/EllipsisText.vue';
import SecondaryText from '../components/SecondaryText.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';
import Tooltip from '../components/Tooltip.vue';
import { useTooltip } from '../composables/useTooltip';

const store = useStore();
const token = computed(() => store.getters['auth/token']);
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');
const countProducts = computed(() => store.getters['products/count']);
const productId = computed(() => store.getters['products/idProduct']);
const currentProduct = computed(() => store.getters['products/currentProduct']);
const isLoading = ref<boolean>(false);
const successDelete = ref<boolean>(false);
const { activeTooltipId, tooltipX, toggleTooltip } = useTooltip();

watch(productId, (newId) => {
  if (newId !== null) {
    chooseProductById(newId);
    openDeleteModal();
  }
});

const openDeleteModal = () => {
  showModal.value = true;
};

const handleConfirmDelete = async () => {
  if (productId.value === null || isLoading.value) return;

  try {
    isLoading.value = true;
    const res = await deleteProduct(productId.value, token.value);

    if (res.success) {
      successDelete.value = true;
      fetchMessage.value = 'Продукт успешно удалён!';

      setTimeout(() => {
        showModal.value = false;
        fetchOrders(true);
        fetchProducts(true);
        store.commit('products/clearCurrentProduct');
        store.commit('products/clearProductId');
        fetchMessage.value = '';
        successDelete.value = false;
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
  store.commit('products/clearProductId');
  store.commit('products/clearCurrentProduct');
};

onBeforeMount(async () => {
  await Promise.all([fetchOrders(), fetchProducts()]);
});

onBeforeUnmount(() => {
  store.commit('products/clearProductId');
  store.commit('products/clearCurrentProduct');
});
</script>

<template>
  <WrapperMain>
    <main class="main full-page pb-2 mx-auto overflow-hidden d-flex flex-column">
      <div class="main__inner mx-3 d-flex flex-column overflow-x-auto overflow-y-hidden">
        <div class="pt-5 mb-5">
          <h1>Продукты / {{ countProducts }}</h1>
        </div>
        <ProductsList />
      </div>
    </main>
    <ConfirmModal
      v-if="showModal"
      :message="fetchMessage"
      :isLoading="isLoading"
      :success="successDelete"
      name="продукт"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    >
      <div class="modal-element d-grid align-items-center gap-2 py-2 position-relative">
        <ProductNewIndicator v-if="currentProduct" :status="currentProduct.status" />
        <ProductImage :src="currentProduct?.photo" />
        <div class="d-flex flex-column w-100 overflow-hidden">
          <EllipsisText
            v-if="currentProduct"
            :title="currentProduct.title"
            className=" border-0 fw-medium"
            @click="(e: MouseEvent) => toggleTooltip(currentProduct.id, currentProduct.title, e)"
          />
          <SecondaryText v-if="currentProduct" :text="currentProduct?.serialNumber" />
        </div>
        <Tooltip v-if="activeTooltipId === currentProduct?.id" :title="currentProduct?.title" :x="tooltipX ?? undefined" />
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
  grid-template-columns: 1fr 1fr 8fr;
  justify-items: center;
}
</style>
