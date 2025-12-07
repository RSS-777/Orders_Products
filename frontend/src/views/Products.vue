<script setup lang="ts">
import { onMounted, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getProducts } from "../api/data"; // mock
// import { getProducts } from "../api/productsApi";
import { deleteProduct } from "../api/productsApi";
import type { IProduct } from "../types/product";
import ProductsList from "../components/Products/ProductsList.vue";
import ProductNewIndicator from "../components/Products/ProductNewIndicator.vue";
import ProductImage from "../components/Products/ProductImage.vue";
import EllipsisText from "../components/EllipsisText.vue";
import SecondaryText from "../components/SecondaryText.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import WrapperMain from "../components/WrapperMain.vue";


const state = reactive({
  countProducts: 0,
  dataProducts: [] as IProduct[],
});

const store = useStore();
const token = computed(() => store.getters['auth/token']);
const productId = ref<number | null>(null)
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');

const currentProduct = computed(() => {
  if (productId.value === null) return null;
  return state.dataProducts.find(p => p.id === productId.value) || null;
});

const handleConfirmDelete = async () => {
  if (productId.value === null) return;

  const res = await deleteProduct(productId.value, token.value)

  if (res.error) {
    fetchMessage.value = res.error
    setTimeout(() => { fetchMessage.value = '' }, 2000)
    return
  }

  productId.value = null
  showModal.value = false
}

const handleCancelDelete = () => {
  showModal.value = false
}

const handleDelete = (id: number) => {
  productId.value = id
  showModal.value = true
}

onMounted(async () => {
  const res = await getProducts();

  if (res.success) {
    state.dataProducts = res.data || [];
    state.countProducts = state.dataProducts.length;
  } else {
    console.error("Error orders:", res.error);
  }
});
</script>


<template>
  <WrapperMain>
    <main class="main pb-2 mx-auto ">
      <div class="main__inner mx-3">
        <div class="pt-5">
          <h1>Продукты / {{ state.countProducts }}</h1>
        </div>
        <ProductsList :handleDelete="handleDelete" :products="state.dataProducts" />
      </div>
    </main>
    <ConfirmModal :show="showModal" :message="fetchMessage" name="продукт" @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete">
      <div class="modal-element d-grid align-items-center gap-2 py-2">
        <ProductNewIndicator v-if="currentProduct" :status=currentProduct.status />
        <ProductImage :src="currentProduct?.photo" />
        <div class="d-flex flex-column  w-100 overflow-hidden">
          <EllipsisText v-if="currentProduct" :title="currentProduct.title" className=" border-0 fw-medium" />
          <SecondaryText v-if="currentProduct" :text="currentProduct?.serialNumber" />
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
  overflow-x: auto;
}

.modal-element {
  border-top: 1px solid rgb(189, 189, 189);
  grid-template-columns: 1fr 1fr 8fr;
  justify-items: center;
}
</style>
