<template>
  <div class="relative">
    <input
      type="text"
      placeholder="Search tasks..."
      class="input-primary w-full pl-10"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <Search class="absolute left-3 top-2.5 text-gray-400" :size="20" />
  </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next';

defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>