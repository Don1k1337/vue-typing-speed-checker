<template>
  <card>
    <template v-slot:default>
      <h2 class="card__title">{{ cardTitle }}</h2>
      <p>
        Welcome to the Type Speed Checker app!
        <br />
        Test your typing speed and accuracy with this interactive tool.
        Simply enter the provided text in the input field and start typing. The app will track the number of correct symbols you type per minute.
        You can challenge yourself to improve your typing skills and aim for a higher accuracy rate.
        <br />
        Have fun and enjoy improving your typing speed!
      </p>
      <button class="btn btn-primary" @click="startChecker">Start</button>
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
