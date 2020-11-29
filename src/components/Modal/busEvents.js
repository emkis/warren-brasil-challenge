import { EventBus } from '@/eventBus'

export const OPEN = '@modal/OPEN'
export const CLOSE = '@modal/CLOSE'

export function openModal({ component, props, isClosable = true, modalTitle }) {
  EventBus.$emit(OPEN, { component, props, isClosable, modalTitle })
}

export function closeModal() {
  EventBus.$emit(CLOSE)
}
