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
        x
      </button>

      <main class="Modal__body">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
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
  background: rgba(#000, 0.53);
  z-index: 1;

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
    transition: background ease 200ms;
    cursor: pointer;

    &:hover {
      background: #ddd;
    }
  }

  &__container {
    position: relative;
    margin: 13px;
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
