<template>
  <card>
    <p v-if="isLoading">Loading...</p>
    <p v-else>
      <strong>Data for typing:</strong>
      {{ responseData }}
    </p>
    <checker-input v-model="userInput" />
    <checker-results :userInput="userInput" :quoteText="responseData" />
  </card>
</template>

<script>
import { ref, onMounted } from 'vue';
import instance from '../../axios/index.js';
import CheckerResults from "./CheckerResults.vue";
import CheckerInput from "./CheckerInput.vue";
import Card from "../ui/Card/Card.vue";

export default {
  components: {Card, CheckerInput, CheckerResults },
  setup() {
    const responseData = ref(null);
    const isLoading = ref(false);
    const userInput = ref('');

    const fetchData = async () => {
      try {
        isLoading.value = true;
        const response = await instance.get('?method=getQuote&format=json&lang=en');
        responseData.value = response.data.quoteText;
        isLoading.value = false;
      } catch (e) {
        isLoading.value = false;
        console.error(e);
      }
    };

    onMounted(fetchData);

    return {
      responseData,
      isLoading,
      userInput
    };
  }
};
</script>
