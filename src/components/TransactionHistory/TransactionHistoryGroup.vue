<template>
  <section class="TransactionHistoryGroup">
    <h3 class="TransactionHistoryGroup__title">{{ formatDate(title) }}</h3>

    <ol class="TransactionHistoryGroup__list">
      <slot />
    </ol>
  </section>
</template>

<script>
import { formatDateString } from '@/utilities/formatters'

export default {
  name: 'TransactionHistoryGroup',
  props: {
    title: { type: String, required: true },
  },
  methods: {
    formatDate: formatDateString,
  },
}
</script>

<style lang="scss" scoped>
.TransactionHistoryGroup {
  &__title {
    font-size: 16px;
    color: var(--primary-text);
    margin-bottom: $default-gutter;
  }

  &__list {
    list-style: none;
  }
}
</style>
