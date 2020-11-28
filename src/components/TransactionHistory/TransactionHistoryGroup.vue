<template>
  <section class="TransactionHistoryGroup">
    <h2 class="TransactionHistoryGroup__title">{{ formatDate(title) }}</h2>

    <ol class="TransactionHistoryGroup__list">
      <slot />
    </ol>
  </section>
</template>

<script>
import { formatDateString } from '@/utilities'

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
    margin-bottom: 13px;
  }

  &__list {
    list-style: none;
  }
}
</style>
