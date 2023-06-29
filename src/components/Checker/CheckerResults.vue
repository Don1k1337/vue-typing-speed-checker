<template>
  <div class="results">
    <span>Correct symbols count: {{ correctSymbolsCount }} / {{ symbolExtractor }}</span>
    <span v-if="timer === 120">Correct symbols per minute: {{ calculateSymbolsPerMinute() }}</span>
    <span>Timer: {{ timeFormatter(timer) }} : 2:00</span>
  </div>
</template>

<script>
import {computed, ref, toRef, watch} from 'vue';
import {timeFormatter} from '../../use/timeFormatter.js';

export default {
  methods: { timeFormatter },
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
    const userInputRef = toRef(props, 'userInput');
    const quoteTextRef = toRef(props, 'quoteText');

    const symbolExtractor = computed(() => {
      const quoteSymbols = quoteTextRef.value?.replace(/\s/g, ''); // Remove whitespace from quote
      return quoteSymbols ? quoteSymbols.length : 0;
    });

    watch([userInputRef, quoteTextRef], ([newUserInput, newQuoteText]) => {
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

    // Start the timer
    const intervalId = setInterval(() => {
      timer.value++;
    }, 1000);

    // Cleanup the timer on component unmount
    // This is important to prevent memory leaks
    watch(() => timer.value, () => {
      if (timer.value >= 120) {
        clearInterval(intervalId);
        isTimerStopped.value = true;
      }
    });

    // Calculate symbols per minute
    const calculateSymbolsPerMinute = () => {
      return correctSymbolsCount || 0;
    };

    return {
      correctSymbolsCount,
      timer,
      symbolExtractor,
      calculateSymbolsPerMinute,
    };
  },
};
</script>

<style scoped lang="scss">
.results {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
