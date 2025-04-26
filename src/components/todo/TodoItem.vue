<template>
  <div class="group block glass-card rounded-xl p-4 hover:scale-[1.02] transition-all duration-200">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4 flex-1">
        <div class="relative">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleComplete"
            class="h-5 w-5 rounded border-gray-300 text-purple-600 
                   focus:ring-purple-500 transition-colors duration-200"
          />
          <div
            v-if="todo.completed"
            class="absolute inset-0 bg-purple-600 rounded opacity-20"
          ></div>
        </div>
        <div v-if="isEditing" class="flex-1 flex gap-2">
          <input
            v-model="editedTitle"
            type="text"
            class="input-primary flex-1"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
          />
          <button
            @click="saveEdit"
            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
        <span
          v-else
          :class="['flex-1', todo.completed ? 'line-through text-gray-400' : 'text-gray-700']"
          @dblclick="startEdit"
        >
          {{ todo.title }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="!isEditing"
          @click="startEdit"
          class="text-gray-400 hover:text-purple-600 p-1 rounded-lg 
                 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          title="Edit todo"
        >
          <Edit2 :size="18" />
        </button>
        <button
          @click="handleDelete"
          class="text-gray-400 hover:text-red-600 p-1 rounded-lg 
                 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          title="Delete todo"
        >
          <Trash2 :size="18" />
        </button>
        <router-link :to="`/todo/${todo.id}`">
          <ChevronRight :size="18" class="text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Trash2, ChevronRight, Edit2 } from 'lucide-vue-next';

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete', 'update']);

const isEditing = ref(false);
const editedTitle = ref(props.todo.title);

const handleDelete = async (e) => {
  e.preventDefault(); // Prevent navigation
  if (window.confirm('Are you sure you want to delete this todo?')) {
    await emit('delete', props.todo.id);
  }
};

const toggleComplete = () => {
  emit('update', props.todo.id, { completed: !props.todo.completed });
};

const startEdit = (e) => {
  e.preventDefault(); // Prevent navigation
  isEditing.value = true;
  editedTitle.value = props.todo.title;
};

const saveEdit = () => {
  if (editedTitle.value.trim()) {
    emit('update', props.todo.id, { title: editedTitle.value.trim() });
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedTitle.value = props.todo.title;
};
</script>