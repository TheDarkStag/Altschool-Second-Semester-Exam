<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Error Boundary Test</h1>
      <button
        @click="triggerError"
        class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
      >
        Trigger Error
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const shouldError = ref(false);

const triggerError = () => {
  shouldError.value = true;
  throw new Error('This is a test error');
};
</script>