<script setup lang="ts">
const { isNew } = defineProps<{
    isNew: boolean;
}>();
</script>

<template>
    <div class="product__status rounded-circle ms-4"
        :class="isNew ? 'product__status--new' : 'product__status--used'"
        :aria-label="isNew ? 'Новый продукт' : 'Бывший в употреблении'"></div>
</template>

<style scoped>
.product__status {
    width: 8px;
    height: 8px;
}

.product__status--new {
    background-color: #D7E36E;
}

.product__status--used {
    background-color: #2C3C44;
}
</style>