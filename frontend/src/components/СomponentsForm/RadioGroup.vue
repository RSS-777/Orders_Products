<script setup lang="ts">
interface Option {
  label: string;
  value: string | number;
}

const { label, options, modelValue } = defineProps<{
  label: string;
  options: Option[];
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const updateValue = (value: string | number) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="mb-3">
    <p class="form-label fw-medium">{{ label }}</p>
    <div>
      <template v-for="option in options">
        <input
          type="radio"
          :id="`${label}-${option.value}`"
          :name="label"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="updateValue(option.value)"
        />
        <label :for="`${label}-${option.value}`" class="me-3 ms-1">
          {{ option.label }}
        </label>
      </template>
    </div>
  </div>
</template>

<style scoped>
input[type="radio"]:checked {
  accent-color: #5c961d;
}
</style>

