<template>
  <card>
    <app-loader v-if="isLoading" />
    <template v-else>
      <p>
        <strong>Data for typing:</strong>
        {{ responseData }}
      </p>
      <div>
        <checker-input v-model="userInput" />
        <checker-results :userInput="userInput" :quoteText="responseData" />
      </div>
    </template>
  </card>
</template>

<script>
import { ref, onMounted } from 'vue';
import instance from '../../axios/index.js';
import CheckerResults from './CheckerResults.vue';
import CheckerInput from './CheckerInput.vue';
import Card from '../ui/Card/Card.vue';
import AppLoader from '../ui/Loader/AppLoader.vue';

export default {
  components: {AppLoader, Card, CheckerInput, CheckerResults },
  setup() {
    const responseData = ref(null);
    const isLoading = ref(false);
    const userInput = ref('');

    const fetchData = async () => {
      try {
        isLoading.value = true;
        const response = await instance.get('?method=getQuote&lang=en&format=json');
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

<style scoped lang="scss">
@import 'src/scss/variables';
.card {
  @media #{$common-screen-size} {
    font-size: 14px;
  }
}

</style>