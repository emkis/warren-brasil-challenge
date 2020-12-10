<template>
  <component
    :is="component"
    v-bind="componentProps"
    @on-fetch="fetchTransactions"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TransactionHistory from './TransactionHistory'
import TransactionHistoryPlaceholder from './TransactionHistoryPlaceholder'
import { TransactionHistoryError } from './lazyImports'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'transactions'
)

export default {
  name: 'TransactionHistoryContainer',
  props: {
    filters: { type: Object, required: true },
  },
  created() {
    this.fetchTransactions()
  },
  computed: {
    ...mapGetters(['getFilteredTransactions']),
    ...mapState({
      rawTransactions: 'transactions',
      isLoading: 'isFetching',
      hasError: 'isFetchFailed',
    }),
    component() {
      if (this.isLoading) return TransactionHistoryPlaceholder
      if (this.hasError) return TransactionHistoryError
      else return TransactionHistory
    },
    componentProps() {
      if (this.isLoading || this.hasError) return null
      return { transactions: this.transactions }
    },
    transactions() {
      return this.getFilteredTransactions({
        title: this.filters.title,
        status: this.filters.status,
      })
    },
  },
  methods: {
    ...mapActions(['fetchTransactions']),
  },
}
</script>
