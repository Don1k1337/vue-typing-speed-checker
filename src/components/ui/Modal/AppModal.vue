<template>
  <div>
    <div v-if="showModal" class="modal__overlay"></div>
    <div v-if="showModal" class="modal">
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AppModal',
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const showModal = ref(props.showModal);

    return {
      showModal
    };
  }
};
</script>

<style lang="scss" scoped>
.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: fixed;
  width: 300px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.modal-content {
  margin-top: 1rem;

  .modal-title {
    margin-top: 1rem;
  }
}
</style>
