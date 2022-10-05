import { ref } from 'vue';

export default function useFetch() {
  // reactive state
  const results = ref([]);
  const loading = ref(false);
  const hasErrors = ref(null);

  const execute = async (url, method, body) => {
    loading.value = true;

    try {
      const options =
        method || body
          ? {
              method,
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          : {};

      const response = await fetch(url, options);
      const data = await response.json();
      results.value = data;
    } catch (err) {
      hasErrors.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { results, loading, hasErrors, execute };
}
