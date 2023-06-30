<template>
  <div class="checker">
    <div class="checker__results">
      <div class="checker__count" v-show="isTimerStarted || isTimerComplete">
        Correct symbols count: {{ correctSymbolsCount }} / {{ symbolExtractor }}
      </div>
      <div v-if="isTimerComplete" class="checker__stats">
        <div class="checker__per-minute">
          Symbols per minute: {{ calculateSymbolsPerMinute }}
        </div>
        <div class="checker__accuracy">
          Accuracy: {{ typingAccuracy }}%
        </div>
      </div>
    </div>
    <div class="checker__controls">
      <div class="checker__duration">
        <label for="duration">Duration: </label>
        <select id="duration" v-model="selectedDuration">
          <option value="60">1 minute</option>
          <option value="120">2 minutes</option>
          <option value="180">3 minutes</option>
        </select>
      </div>
      <div>
        <button class="checker__start-btn btn btn-primary" @click="startTimer">Start</button>
        <button class="checker__reset-btn btn btn-danger" @click="resetTimer">Reset</button>
      </div>
    </div>
    <div v-if="isTimerStarted" class="checker__timer">
      Timer: {{ timerStarter }}
    </div>
  </div>
</template>

<script>
import { computed, ref, toRef, watch } from 'vue';
import { useTimeFormat } from '../../use/useTimeFormat.js';

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
  emits: ['clearInput'],

  setup(props, { emit }) {
    const correctSymbolsCount = ref(0);
    const timer = ref(0);
    const isTimerStarted = ref(false);
    const isTimerStopped = ref(false);
    const selectedDuration = ref('60'); // Default duration
    const quoteTextRef = toRef(props, 'quoteText');
    const userInputRef = toRef(props, 'userInput');
    let intervalId = null;

    const symbolExtractor = computed(() => {
      const quoteSymbols = quoteTextRef.value?.replace(/\s/g, ''); // Remove whitespace from quote
      return quoteSymbols ? quoteSymbols.length : 0;
    });

    const timerStarter = computed(() => {
      return useTimeFormat(timer.value, selectedDuration.value);
    });

    const isTimerComplete = computed(() => {
      return timer.value === parseInt(selectedDuration.value);
    });

    const calculateSymbolsPerMinute = computed(() => {
      return Math.round((correctSymbolsCount.value / parseInt(selectedDuration.value)) * 60);
    });

    const typingAccuracy = computed(() => {
      if (correctSymbolsCount.value === 0 || symbolExtractor.value === 0) {
        return 0;
      }
      const accuracy = (correctSymbolsCount.value / symbolExtractor.value) * 100;
      return Math.round(accuracy * 10) / 10;
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

    const resetTimer = () => {
      isTimerStarted.value = false;
      isTimerStopped.value = true;
      clearInterval(intervalId);
      timer.value = 0;
      emit('clearInput')
    }
    const startTimer = () => {
      isTimerStarted.value = true;
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
              isTimerStarted.value = false;
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
      typingAccuracy,
      timerStarter,
      isTimerComplete,
      startTimer,
      resetTimer,
      isTimerStarted,
      isTimerStopped,
      calculateSymbolsPerMinute,
    };
  },
};
</script>

<style scoped lang="scss">
@import 'src/scss/variables';
@import 'src/scss/mixins';

.checker {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__results {
    margin-bottom: 1rem;
    text-align: center;

    @media #{$common-screen-size} {
      font-size: 13px;
    }
  }

  &__count {
    margin-bottom: 0.5rem;
  }

  .checker__timer {
    @media #{$common-screen-size} {
      font-weight: 700;
      font-size: 13px;
    }
  }
  &__stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;

    &__per-minute,
    &__accuracy {
      margin-bottom: 0.2rem;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    @media #{$common-screen-size} {
      font-size: 13px;
    }

    label {
      margin-right: 0.2rem;

      @media #{$common-screen-size} {
        font-size: 13px;
      }
    }
    select {
      padding: 0.3rem;
      @include common-select;

      @media #{$common-screen-size} {
        font-size: 13px;
      }
    }
  }

  &__start-btn, &__reset-btn {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    padding: 0.3rem 1rem;
    font-size: 14px;

    @media #{$common-screen-size} {
      font-size: 13px;
    }
    
    @media (max-width: 412px) {
      margin-top: 0.5rem;
    }
  }

  &__timer {
    font-size: 15px;
  }
}
</style>
