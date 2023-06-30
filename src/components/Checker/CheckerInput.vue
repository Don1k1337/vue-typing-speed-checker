<template>
  <card :card-title="title">
    <input type="text" class="card__input" :value="modelValue" @input="updateUserInput($event.target.value)">
  </card>
</template>

<script>
import { ref } from 'vue';
import Card from '../ui/Card/Card.vue';

export default {
  components: {Card},
  emits: ['update:modelValue'],
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

    return {
      title: 'The speed typing area:',
      userInput,
      updateUserInput,
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
}

</style>