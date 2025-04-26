<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-8">
      <div class="flex items-center justify-center mb-6 sm:mb-8">
        <ListTodo class="h-8 w-8 sm:h-12 sm:w-12 text-purple-600" />
        <h1 class="text-xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-3 sm:ml-4">
          TO DO App
        </h1>
      </div>
      
      <CreateTodo @submit="handleCreateTodo" />
      
      <div class="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
        <TodoSearch v-model="search" />
        <TodoFilter v-model="filter" />
      </div>

      <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>

      <div v-else class="space-y-3 sm:space-y-4">
        <div v-if="filteredTodos.length === 0" class="text-center py-8 sm:py-12 text-gray-500">
          No todos found. Create one to get started!
        </div>
        <TodoItem
          v-else
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @delete="handleDeleteTodo"
          @update="handleUpdateTodo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ListTodo } from 'lucide-vue-next';
import { useTodos } from '../composables/useTodos';
import TodoItem from './todo/TodoItem.vue';
import TodoFilter from './todo/TodoFilter.vue';
import TodoSearch from './todo/TodoSearch.vue';
import CreateTodo from './todo/CreateTodo.vue';

const search = ref('');
const filter = ref('all');
const { 
  todos, 
  isLoading, 
  error,
  initializeTodos,
  addTodo,
  removeTodo,
  updateTodoItem,
  filterTodos
} = useTodos();

// Initialize todos from API
onMounted(() => {
  initializeTodos();
});

const filteredTodos = computed(() => {
  const filtered = filterTodos(todos.value, filter.value);
  if (search.value) {
    return filtered.filter(todo => 
      todo.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return filtered;
});

const handleCreateTodo = async (title) => {
  await addTodo(title);
};

const handleDeleteTodo = async (id) => {
  await removeTodo(id);
};

const handleUpdateTodo = async (id, updates) => {
  await updateTodoItem(id, updates);
};
</script>