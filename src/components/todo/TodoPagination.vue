<template>
  <div class="mt-8 flex justify-center gap-4 items-center">
    <button
      @click="$emit('update:modelValue', Math.max(1, modelValue - 1))"
      :disabled="modelValue === 1"
      class="p-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 
             disabled:cursor-not-allowed transition-all duration-200"
    >
      <ChevronLeft :size="20" />
    </button>
    <span class="px-4 py-2 bg-white/50 rounded-lg">Page {{ modelValue }}</span>
    <button
      @click="$emit('update:modelValue', modelValue + 1)"
      :disabled="!hasMore"
      class="p-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 
             disabled:cursor-not-allowed transition-all duration-200"
    >
      <ChevronRight :size="20" />
    </button>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  hasMore: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>