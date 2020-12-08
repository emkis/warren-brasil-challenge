<template>
  <Modal
    v-if="component"
    :title="modalTitle"
    :isClosable="isClosable"
    @close="onClose"
  >
    <component :is="component" v-bind="componentProps" />
  </Modal>
</template>

<script>
import { EventBus } from '@/eventBus'
import { OPEN, CLOSE } from './busEvents'
import { toggleAppScroll } from '@/utilities'

import { Modal } from './lazyImports'

export default {
  name: 'ModalContainer',
  components: { Modal },
  data() {
    return {
      component: null,
      componentProps: null,
      isClosable: true,
      modalTitle: null,
    }
  },
  mounted() {
    this.subscribeToEvents()
  },
  methods: {
    subscribeToEvents() {
      EventBus.$on(OPEN, this.onOpen)
      EventBus.$on(CLOSE, this.onClose)
    },
    onOpen({ component, props, isClosable = true, modalTitle }) {
      this.component = component
      this.componentProps = props
      this.isClosable = isClosable
      this.modalTitle = modalTitle
    },
    onClose() {
      this.resetState()
    },
    resetState() {
      this.component = null
      this.componentProps = null
      this.isClosable = true
      this.modalTitle = null
    },
  },
  watch: {
    component() {
      toggleAppScroll()
    },
  },
}
</script>
