<script setup lang="ts">

const { text, className } = defineProps<{
    text: string | number;
    className?: string;
}>()
</script>

<template>
    <span class="text" :class="className">{{ text }}</span>
</template>

<style scoped>
.text {
    font-size: 12px;
    color: rgb(158, 158, 158);
}
</style>
