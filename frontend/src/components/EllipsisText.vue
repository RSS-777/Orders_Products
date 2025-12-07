<script setup lang="ts">

const { title, className, maxWidth, minWidth } = defineProps<{
    title?: string;
    className?: string;
    maxWidth?: string;
    minWidth?: string;
}>()
</script>

<template>
    <p class="ellipsis text-truncate flex-grow-1" :title="title"
        :style="{ maxWidth: maxWidth || '400px', minWidth: minWidth || '100px' }">
        <span 
        :class="[title ? 'ellipsis--text' : 'ellipsis--notext', className]"
        >
            {{ title || '—' }}
        </span>
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

.ellipsis--text {
    line-height: 1.2;
    border-bottom: 1px solid rgb(182, 182, 182);
}

.ellipsis--notext {
    display: flex;
    align-items: center; 
    justify-content: center; 
    height: 100%; 
}
</style>
