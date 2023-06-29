<template>
  <AppModal :showModal="pathIsIncorrect">
    <h2 class="modal-title">Упс! Мы не знаем как Вы попали сюда, но похоже данной страницы не существует :)</h2>
    <div class="modal-content">
      <span class="modal-content__btn">
        <button class="btn btn-secondary" @click="goHome">Домой</button>
      </span>
    </div>
  </AppModal>
</template>

<script>
import { ref } from 'vue';
import { goHomeMixin } from '../mixin/goHomeMixin.js';
import AppModal from '../components/ui/Modal/AppModal.vue';

export default {
  components: { AppModal },
  mixins: [goHomeMixin],
  setup() {
    const pathIsIncorrect = ref(true);
    const { goHome } = goHomeMixin;

    return {
      pathIsIncorrect,
      goHome,
    };
  },
};
</script>

<style scoped lang="scss">
.modal-title {
  font-size: 17px;
}
</style>