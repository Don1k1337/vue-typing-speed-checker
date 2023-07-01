<template>
  <card :card-title="title">
    <textarea class="card__input" :value="modelValue" @input="updateUserInput($event.target.value)"></textarea>
  </card>
</template>

<script>
import { ref } from 'vue';
import Card from '../ui/Card/Card.vue';

export default {
  components: {Card},
  emits: ['update:modelValue', 'clearInput'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const userInput = ref(props.modelValue);

    const updateUserInput = (value) => {
      userInput.value = value;
      emit('update:modelValue', value);
    };

    const clearInput = () => {
      emit('clearInput');
    }

    return {
      title: 'The speed typing area:',
      userInput,
      updateUserInput,
      clearInput
    };
  },
};
</script>

<style scoped lang="scss">
@import 'src/scss/variables';
@import 'src/scss/mixins';

.card {
  @include common-card;
  max-width: 400px;
  margin: 40px auto;
}

.card__input {
  @include common-input;
  font-family: Arial, sans-serif;
  width: 300px;
  height: 120px;
  resize: none;

  @media #{$common-screen-size} {
    width: 200px;
    height: 60px;
  }
}

</style>