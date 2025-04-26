import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  const storedData = localStorage.getItem(key);
  const data = ref(storedData ? JSON.parse(storedData) : defaultValue);

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  return data;
}