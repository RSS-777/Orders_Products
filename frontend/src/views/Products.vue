<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { fetchProducts, chooseProductById } from '../services/product';
import { deleteProduct } from '../api/productsApi';
import ProductsList from '../components/Products/ProductsList.vue';
import ProductNewIndicator from '../components/Products/ProductNewIndicator.vue';
import ProductImage from '../components/Products/ProductImage.vue';
import EllipsisText from '../components/EllipsisText.vue';
import SecondaryText from '../components/SecondaryText.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import WrapperMain from '../components/WrapperMain.vue';

const store = useStore();
const token = computed(() => store.getters['auth/token']);
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');

const countProducts = computed(() => store.getters['products/count']);
const productId = computed(() => store.getters['products/idProduct']);
const currentProduct = computed(() => store.getters['products/currentProduct']);

const isLoading = ref<boolean>(false)
const successDelete = ref<boolean>(false)

watch(productId, (newId) => {
  if (newId !== null) {
    chooseProductById(newId)
    openDeleteModal()
  }
})

const openDeleteModal = () => {
  showModal.value = true;
};

const handleConfirmDelete = async () => {
  if (productId.value === null) return;

  const res = await deleteProduct(productId.value, token.value);

  if (res.success) {
    fetchMessage.value = "Продукт успешно удалён!";
    successDelete.value = true
    await fetchProducts(true);

    setTimeout(() => {
      showModal.value = false;
      store.commit('products/clearCurrentProduct');
      store.commit('products/clearProductId')
      fetchMessage.value = "";
      successDelete.value = false
    }, 2000)
  } else {
    fetchMessage.value = res.error || "Произошла ошибка";

    setTimeout(() => {
      fetchMessage.value = '';
    }, 2000);
  }
};

const handleCancelDelete = () => {
  showModal.value = false;
  store.commit('products/clearProductId');
  store.commit('products/clearCurrentProduct');
};

onMounted(async () => {
  await fetchProducts();
});

onBeforeUnmount(() => {
  store.commit('products/clearProductId');
  store.commit('products/clearCurrentProduct');
});

</script>

<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto">
      <div class="main__inner mx-3">
        <div class="pt-5">
          <h1>Продукты / {{ countProducts }}</h1>
        </div>
        <ProductsList />
      </div>
    </main>
    <ConfirmModal v-if="showModal" :message="fetchMessage" :isLoading="isLoading" :success="successDelete"
      name="продукт" @confirm="handleConfirmDelete" @cancel="handleCancelDelete">
      <div class="modal-element d-grid align-items-center gap-2 py-2">
        <ProductNewIndicator v-if="currentProduct" :status="currentProduct.status" />
        <ProductImage :src="currentProduct?.photo" />
        <div class="d-flex flex-column w-100 overflow-hidden">
          <EllipsisText v-if="currentProduct" :title="currentProduct.title" className=" border-0 fw-medium" />
          <SecondaryText v-if="currentProduct" :text="currentProduct?.serialNumber" />
        </div>
      </div>
    </ConfirmModal>
  </WrapperMain>
</template>

<style scoped>
.main {
  max-width: 1540px;
}

.main__inner {
  overflow-x: auto;
}

.modal-element {
  border-top: 1px solid rgb(189, 189, 189);
  grid-template-columns: 1fr 1fr 8fr;
  justify-items: center;
}
</style>
