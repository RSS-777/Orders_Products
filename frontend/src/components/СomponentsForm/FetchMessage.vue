<script setup lang="ts">
const { message, type } = defineProps<{
    message?: string;
    type?: 'error' | 'info' | 'success';
}>();
</script>

<template>
    <p v-if="message" :class="['form__message', `form__message--${type || 'info'}`]">
        {{ message }}
    </p>
</template>

<style scoped>
.form__message {
    text-align: center;
    padding: 0.5rem 0;
}

.form__message--error {
    color: #E33545;
    background-color: #ffcfd4;
}

.form__message--success {
    color: #198754;
    background-color: #d1e7dd;
}

.form__message--info {
    color: #0d6efd;
    background-color: #cff4fc;
}
</style>
