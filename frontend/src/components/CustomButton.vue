<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button class="custom-button btn d-flex align-items-center justify-content-center rounded-circle p-0" @click="handleClick">
    <div class="custom-button__lines d-flex flex-column ms-1">
      <div class="custom-button__line position-relative rounded"></div>
      <div class="custom-button__line position-relative rounded"></div>
      <div class="custom-button__line position-relative rounded"></div>
    </div>
  </button>
</template>

<style scoped>
.custom-button {
  background: none;
  border: 1px solid gray;
  width: 30px;
  height: 30px;
}

.custom-button__lines {
  width: 14px;
  gap: 2px;
}

.custom-button__line {
  height: 3px;
  background-color: #4d6875;
}

.custom-button__line::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #4d6875;
}
</style>
