<script setup lang="ts">
import { onMounted } from "vue";
import { getProducts } from "../api/productsApi";
import { getOrders } from "../api/ordersApi";
// import { orders, products } from "../api/data";

// onMounted(async () => {
//   const res = await getProducts();

//   if (res.success) {
//     console.log("✅ Products loaded:", res.data);
//   } else {
//     console.error("❌ Error product:", res.error);
//   }
// });

// onMounted(async () => {
//   const res = await getOrders();

//   if (res.success) {
//     console.log("✅ Orders loaded:", res.data);
//   } else {
//     console.error("❌ Error orders:", res.error);
//   }
// });

</script>

<template>
  <h1>приход</h1>
</template>

<style scoped></style>
