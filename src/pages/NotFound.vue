<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Oops! Page not found</p>
      <router-link
        to="/"
        class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        <Home class="mr-2" :size="20" />
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { Home } from 'lucide-vue-next';
</script>