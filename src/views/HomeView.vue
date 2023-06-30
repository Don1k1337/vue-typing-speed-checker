<template>
  <card>
    <template v-slot:default>
      <h2 class="card__title">{{ cardTitle }}</h2>
      <p class="card__paragraph">
        Welcome to the Type Speed Checker app!
        <br />
        Test your typing speed and accuracy with this interactive tool.
        Simply enter the provided text in the input field and start typing. The app will track the number of correct symbols you type per specified duration.
        You can challenge yourself to improve your typing skills and aim for a higher accuracy rate.
        <br />
        Have fun and enjoy improving your typing speed!
      </p>
      <button class="btn btn-primary" @click="startChecker">Let's go</button>
    </template>
  </card>
</template>

<script setup>
import Card from '../components/ui/Card/Card.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cardTitle = "This is a simple type speed checker app";

const startChecker = () => {
  router.push('/checker');
};
</script>

<style scoped lang="scss">
@import 'src/scss/variables';

.card {
  @media #{$common-screen-size} {
    .card__paragraph {
      font-size: 13px;
    }
    .card__title {
      font-size: 15px;
    }
  }
}
</style>
