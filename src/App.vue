<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <nav class="bg-white/80 backdrop-blur-sm shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <ListTodo class="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <span class="ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TO DO App
              </span>
            </router-link>
          </div>
          <div class="hidden sm:flex items-center">
            <router-link
              to="/error-test"
              class="text-gray-600 hover:text-gray-900"
            >
              Test Error
            </router-link>
          </div>
          <div class="sm:hidden flex items-center">
            <button
              @click="isMenuOpen = !isMenuOpen"
              class="text-gray-600 hover:text-gray-900"
            >
              <X v-if="isMenuOpen" :size="24" />
              <Menu v-else :size="24" />
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/error-test"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            @click="isMenuOpen = false"
          >
            Test Error
          </router-link>
        </div>
      </div>
    </nav>

    <main class="py-4 sm:py-8">
      <router-view v-slot="{ Component }">
        <suspense>
          <component :is="Component" />
        </suspense>
      </router-view>
    </main>

    <footer class="py-4 text-center text-gray-600">
      <div class="flex items-center justify-center gap-1">
        <Copyright size="16" />
        <span>Olasubomi 2025</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListTodo, Menu, X, Copyright } from 'lucide-vue-next';

const isMenuOpen = ref(false);
</script>