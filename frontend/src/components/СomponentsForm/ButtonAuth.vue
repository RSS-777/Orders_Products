<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>()
</script>

<template>
    <button class="btn btn-success btn-success--mod w-100" type="submit">{{ name }}</button>
</template>
