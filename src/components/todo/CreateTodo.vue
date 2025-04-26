<template>
  <form @submit.prevent="handleSubmit" class="mb-6 sm:mb-8">
    <div class="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        v-model="title"
        placeholder="What needs to be done?"
        class="input-primary w-full"
        :disabled="isSubmitting"
      />
      <button
        type="submit"
        :disabled="!title.trim() || isSubmitting"
        class="btn-primary whitespace-nowrap"
      >
        <Plus class="inline-block mr-1" :size="20" />
        Add Task
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';

const emit = defineEmits(['submit']);
const title = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!title.value.trim() || isSubmitting.value) return;

  isSubmitting.value = true;
  try {
    await emit('submit', title.value);
    title.value = '';
  } finally {
    isSubmitting.value = false;
  }
};
</script>