<template>
  <div class="results">
    <span class="results__count">Correct symbols count: {{ correctSymbolsCount }} / {{ symbolExtractor }}</span>
    <span v-if="isTimerStopped" class="results__per-minute">Correct symbols per minute: {{ calculateSymbolsPerMinute }}</span>
    <span v-if="!isTimerStopped" class="results__timer">Timer: {{ formattedTimer }}</span>
    <span class="results__controls">
      <select class="results__duration" v-model="selectedDuration">
        <option value="60">1 minute</option>
        <option value="120">2 minutes</option>
        <option value="180">3 minutes</option>
      </select>
      <button class="results__start-btn btn btn-secondary" @click="startTimer">Start</button>
    </span>
  </div>
</template>

<script>
import { computed, ref, toRef, watch } from 'vue';
import {useTimeFormat} from '../../use/useTimeFormat.js';

export default {
  props: {
    userInput: {
      type: String,
      required: true,
    },
    quoteText: {
      type: [String, null],
      required: true,
      default: null,
    },
  },
  setup(props) {
    const correctSymbolsCount = ref(0);
    const timer = ref(0);
    const isTimerStopped = ref(false);
    const selectedDuration = ref('60'); // Default duration
    const userInputRef = toRef(props, 'userInput');
    const quoteTextRef = toRef(props, 'quoteText');
    let intervalId = null;

    const symbolExtractor = computed(() => {
      const quoteSymbols = quoteTextRef.value?.replace(/\s/g, ''); // Remove whitespace from quote
      return quoteSymbols ? quoteSymbols.length : 0;
    });

    const formattedTimer = computed(() => {
      return useTimeFormat(timer.value, selectedDuration.value);
    });

    const isTimerComplete = computed(() => {
      return timer.value === parseInt(selectedDuration.value);
    });

    const calculateSymbolsPerMinute = computed(() => {
      return correctSymbolsCount.value;
    });

    watch([userInputRef, quoteTextRef, isTimerStopped], ([newUserInput, newQuoteText]) => {
      if (!isTimerStopped.value) {
        // Perform the comparison and calculation for correct symbols count
        const userInputSymbols = newUserInput.replace(/\s/g, ''); // Remove whitespace from user input
        const quoteSymbols = newQuoteText.replace(/\s/g, ''); // Remove whitespace from quote

        let count = 0;
        for (let i = 0; i < userInputSymbols.length; i++) {
          if (userInputSymbols[i] === quoteSymbols[i]) {
            count++;
          }
        }

        correctSymbolsCount.value = count;
      }
    });

    const startTimer = () => {
      clearInterval(intervalId); // Clear the previous interval
      timer.value = 0; // Reset the timer
      correctSymbolsCount.value = 0; // Reset the correct symbols count
      isTimerStopped.value = false;
      intervalId = setInterval(() => {
        timer.value++;
      }, 1000);

      // Cleanup the timer on component unmount
      watch(
          [() => timer.value],
          () => {
            if (timer.value >= parseInt(selectedDuration.value)) {
              clearInterval(intervalId);
              isTimerStopped.value = true;
              stop(); // Manually stop the watch
            }
          },
      );
    };

    return {
      correctSymbolsCount,
      selectedDuration,
      timer,
      symbolExtractor,
      formattedTimer,
      isTimerComplete,
      startTimer,
      isTimerStopped,
      calculateSymbolsPerMinute,
    };
  },
};
</script>

<style scoped lang="scss">
@import 'src/scss/mixins';

.results {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.results__controls {
  .results__duration {
    @include common-select;
  }

  .results__start-btn {
    margin-left: 1.2rem;
  }
}

</style>
