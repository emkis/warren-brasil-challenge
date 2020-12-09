<template>
  <component
    :is="component"
    v-bind="componentProps"
    @on-fetch="fetchTransactions"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { filters } from '@/pages/Transactions/filters'

import TransactionHistory from './TransactionHistory'
import TransactionHistoryPlaceholder from './TransactionHistoryPlaceholder'
import { TransactionHistoryError } from './lazyImports'

const { mapState, mapActions } = createNamespacedHelpers('transactions')

export default {
  name: 'TransactionHistoryContainer',
  props: {
    searchQuery: { type: String, required: true },
    statusFilter: { type: String, required: true },
  },
  created() {
    this.fetchTransactions()
  },
  computed: {
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
      return { transactions: this.filteredTransactions }
    },
    filteredTransactions() {
      return filters.getFilteredTransactions({
        transactions: this.rawTransactions,
        searchQuery: this.searchQuery,
        statusFilter: this.statusFilter,
      })
    },
  },
  methods: {
    ...mapActions(['fetchTransactions']),
  },
}
</script>
