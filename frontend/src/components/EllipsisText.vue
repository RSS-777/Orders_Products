<script setup lang="ts">

const { title, className } = defineProps<{
    title: string;
    className?: string;
    maxWidth?: string;
}>()
</script>

<template>
    <p 
    class="ellipsis text-truncate flex-grow-1" 
    :title="title"
    :style="{ maxWidth: maxWidth || '400px' }"
    >
        <span class="ellipsis__text" :class="className">{{ title }}</span>
    </p>
</template>

<style scoped>
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: help;
    max-width: 400px;
}

.ellipsis__text {
    line-height: 1.2;
    border-bottom: 1px solid rgb(182, 182, 182);
}
</style>
