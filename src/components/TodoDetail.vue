<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6">
    <router-link to="/" class="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 sm:mb-6">
      <ArrowLeft class="mr-2" :size="20" />
      Back to Todos
    </router-link>

    <div v-if="isLoading" class="flex justify-center p-4 sm:p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
    </div>

    <div v-else-if="todo" class="glass-card rounded-lg p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Todo #{{ todo.id }}</h1>
        <div class="flex items-center gap-2">
          <button
            @click="toggleEdit"
            class="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            {{ isEditing ? 'Cancel' : 'Edit' }}
          </button>
          <button
            v-if="isEditing"
            @click="saveTodo"
            class="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <h2 class="text-base sm:text-lg font-semibold mb-2 text-gray-700">Title</h2>
          <input
            v-if="isEditing"
            v-model="editedTitle"
            type="text"
            class="input-primary w-full"
          />
          <p v-else class="text-gray-700 text-sm sm:text-base">{{ todo.title }}</p>
        </div>

        <div class="flex items-center gap-3">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="editedCompleted"
              :disabled="!isEditing"
              class="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span class="text-gray-700">Completed</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { ArrowLeft } from 'lucide-vue-next';
import { fetchTodoById, updateTodo } from '../api/todoApi';

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const { data: todo, isLoading } = useQuery({
  queryKey: ['todo', route.params.id],
  queryFn: () => fetchTodoById(route.params.id)
});

const isEditing = ref(false);
const editedTitle = ref('');
const editedCompleted = ref(false);

const updateTodoMutation = useMutation({
  mutationFn: ({ id, updates }) => updateTodo(id, updates),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todo', route.params.id] });
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    isEditing.value = false;
  }
});

const toggleEdit = () => {
  if (!isEditing.value) {
    editedTitle.value = todo.value.title;
    editedCompleted.value = todo.value.completed;
  }
  isEditing.value = !isEditing.value;
};

const saveTodo = async () => {
  await updateTodoMutation.mutateAsync({
    id: todo.value.id,
    updates: {
      title: editedTitle.value,
      completed: editedCompleted.value
    }
  });
};
</script>