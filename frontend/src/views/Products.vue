<script setup lang="ts">
import { onMounted, computed, reactive, ref } from "vue";
import { getProducts } from "../api/data";
import type { IProduct } from "../types/product";
import ProductsList from "../components/Products/ProductsList.vue";


// import { getProducts } from "../api/productsApi";
// import { getOrders } from "../api/data";
// import { deleteOrder } from "../api/ordersApi";
import OrderProducts from "../components/Arrival/OrderProducts.vue";
// import { getOrders } from "../api/ordersApi";
import type { IOrder } from "../types/order";
import ConfirmModal from "../components/ConfirmModal.vue";
import WrapperMain from "../components/WrapperMain.vue";
import EllipsisText from "../components/EllipsisText.vue";
import ProductListShort from "../components/Arrival/ProductListShort.vue";

const state = reactive({
  countProducts: 0,
  dataProducts: [] as IProduct[],
});

const productId = ref<number | null>(null)
const showModal = ref<boolean>(false);
const fetchMessage = ref<string>('');


// const currentOrder = computed(() => {
//   if (orderId.value === null) return null
//   return state.dataOrders.find(o => o.id === orderId.value) || null
// })

// const handleConfirmDelete = async () => {
//   if (orderId.value === null) return;

//   const res = await deleteOrder(orderId.value)

//   if (res.error) {
//     fetchMessage.value = res.error
//     setTimeout(() => { fetchMessage.value = '' }, 2000)
//     return
//   }

//   orderId.value = null
//   showModal.value = false
// }

// const handleCancelDelete = () => {
//   showModal.value = false
// }

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
    <main class="main pb-2 mx-auto w-100 overflow-auto">
      <div class="main__inner mx-3">
        <div class="title pt-5">
          <h1>Продукты / {{ state.countProducts }}</h1>
        </div>
        <ProductsList :handleDelete="handleDelete" :products="state.dataProducts"/>
        <!-- <OrderProducts :handleDelete="handleDelete"
          :orders="state.dataOrders" /> -->
      </div>
    </main>
    <!-- <ConfirmModal :show="showModal" :message="fetchMessage" name="приход" @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete">
      <div class="modal-element p-4">
        <EllipsisText v-if="currentOrder" :title="currentOrder.title"  className="fs-5 border-0 fw-medium"/>
        <p class="fd-2 lh-sm my-2">{{ currentOrder?.description }}</p>
        <div v-if="currentOrder?.products.length">
          <button class="modal-element__btn border-0 bg-transparent p-0 d-flex align-items-center" @click="toggleProducts">
            <span>Продукти</span> <span>{{showProducts ? '▲': '▼'}}</span>
          </button>
          <ProductListShort :order="currentOrder" :showProducts="showProducts" />
        </div>
      </div>
    </ConfirmModal> -->
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
