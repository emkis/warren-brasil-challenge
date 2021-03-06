<template>
  <div class="Modal" @click.self="isClosable && handleClose()">
    <div class="Modal__container">
      <button
        type="button"
        v-if="isClosable"
        class="Modal__exit-btn"
        title="Close"
        @click="handleClose"
      >
        <IconClose size="14" />
      </button>

      <header v-if="title" class="Modal__header">
        <h4 class="Modal__title">Resumo de transação</h4>
      </header>

      <main class="Modal__body">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import { IconClose } from '@/components/Icons'

export default {
  name: 'Modal',
  components: { IconClose },
  props: {
    title: { type: String, required: false },
    isClosable: { type: Boolean },
  },
  mounted() {
    this.subscribeToEvents()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleEscKeyup(event) {
      const isEscapeKey = event.keyCode === 27

      if (isEscapeKey && this.isClosable) {
        this.handleClose()
      }
    },
    subscribeToEvents() {
      document.addEventListener('keyup', this.handleEscKeyup)
    },
    unsubscribeToEvents() {
      document.removeEventListener('keyup', this.handleEscKeyup)
    },
  },
  beforeDestroy() {
    this.unsubscribeToEvents()
  },
}
</script>

<style lang="scss" scoped>
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: var(--modal-overlay);
  z-index: 1;

  &__header {
    padding: 22px;
    text-align: center;
    background: var(--element-bg);
  }

  &__title {
    font-size: 16px;
    line-height: 1.5;
    color: var(--primary-text);
  }

  &__exit-btn {
    $btn-position: 14px;
    $button-size: 40px;

    position: absolute;
    top: $btn-position;
    right: $btn-position;
    width: $button-size;
    height: $button-size;
    display: grid;
    place-content: center;
    border: 0;
    border-radius: 50%;
    padding: 10px;
    font-size: 20px;
    background: none;
    color: var(--secondary-text);
    transition: background ease 200ms;
    cursor: pointer;

    &:hover {
      background: var(--element-hover);
    }
  }

  &__container {
    position: relative;
    border-radius: $radius-box;
    overflow: hidden;
  }

  &__body {
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    overscroll-behavior: contain;
  }
}
</style>
