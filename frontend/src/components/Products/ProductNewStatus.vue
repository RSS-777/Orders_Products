<script setup lang="ts">
const { isNew } = defineProps<{
    isNew: boolean;
}>();

const statusProdust =  isNew ? 'новый' : 'Б/У'
</script>

<template>
    <div>
        <span class="product">{{statusProdust}}</span>
    </div>
</template>

<style scoped>
.product {
    color: #58707C;
}
</style>