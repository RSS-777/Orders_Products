<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button class="btn--flex d-flex align-items-center justify-content-center rounded-circle p-0" @click="handleClick">
    <div class="btn__lines d-flex flex-column ms-1">
      <div class="btn__line position-relative rounded"></div>
      <div class="btn__line position-relative rounded"></div>
      <div class="btn__line position-relative rounded"></div>
    </div>
  </button>
</template>

<style scoped>
.btn--flex {
  background: none;
  border: 1px solid gray;
  width: 30px;
  height: 30px;
}

.btn--flex:active {
  transform: scale(0.95);
}

.btn__lines {
  width: 14px;
  gap: 2px;
}

.btn__line {
  height: 3px;
  background-color: #4d6875;
}

.btn__line::before {
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

@media (hover: hover) and (pointer: fine) {
  .btn--flex:hover {
    border: 1px solid #80b548;
  }
}
</style>
