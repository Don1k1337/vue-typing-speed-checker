<template>
  <AppModal :showModal="pathIsIncorrect">
    <h2 class="modal-title">Oops! Seems that the URL path is not correct</h2>
    <div class="modal-content">
      <span class="modal-content__btn">
        <button class="btn btn-secondary" @click="goHome">Back home</button>
      </span>
    </div>
  </AppModal>
</template>

<script>
import { ref } from 'vue';
import AppModal from '../components/ui/Modal/AppModal.vue';
import router from '../router/index.js';

export default {
  components: { AppModal },

  setup() {
    const pathIsIncorrect = ref(true);

    const goHome = () => {
      return router.push('/')
    }
    return {
      pathIsIncorrect,
      goHome
    };
  },
};
</script>

<style scoped lang="scss">
.modal-title {
  font-size: 17px;
}
</style>
