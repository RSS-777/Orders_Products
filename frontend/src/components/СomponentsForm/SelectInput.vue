<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  name: string;
  id?: string;
  label: string;
  options: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const idSpecifier = props.id ? props.id : props.name + '-select';

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="mb-3">
    <label :for="idSpecifier" class="form-label">{{ props.label }}</label>
    <select :name="props.name" :id="idSpecifier" :value="props.modelValue" @change="onChange" class="form-select">
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
