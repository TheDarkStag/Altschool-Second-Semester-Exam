<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="{ value, label } in filters"
      :key="value"
      @click="$emit('update:modelValue', value)"
      :class="[
        'px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-200',
        modelValue === value
          ? 'bg-purple-600 text-white shadow-md'
          : 'bg-white/50 text-gray-600 hover:bg-white/80'
      ]"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);

const filters = [
  { value: 'all', label: 'All Tasks' },
  { value: 'completed', label: 'Completed' },
  { value: 'incomplete', label: 'Incomplete' }
];
</script>