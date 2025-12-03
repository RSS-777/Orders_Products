<script setup lang="ts">
import { onMounted } from "vue";
// import { getProducts } from "../api/productsApi";
import { getProducts } from "../api/data";

onMounted(async () => {
  const res = await getProducts();

  if (res.success) {
    console.log("Products loaded:", res.data);
  } else {
    console.error("Error product:", res.error);
  }
});

</script>

<template>
  <main>

    <h1>продукты</h1>
  </main>
</template>

<style scoped></style>
