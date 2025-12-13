<script setup lang="ts">
const { name, disabled } = defineProps<{
  name: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button class="btn btn-success btn-success--mod w-100" type="submit" :disabled="disabled">{{ name }}</button>
</template>
