<template>
  <component
    :is="component"
    v-bind="componentProps"
    @on-fetch="fetchTransactions"
  />
</template>

<script>
import { asyncDelay } from '@/utilities'
import { TransactionService } from '@/services/TransactionService'
import { filters } from '@/pages/Transactions/filters'

import TransactionHistory from './TransactionHistory'
import TransactionHistoryPlaceholder from './TransactionHistoryPlaceholder'
import { TransactionHistoryError } from './lazyImports'

export default {
  name: 'TransactionHistoryContainer',
  props: {
    searchQuery: { type: String, required: true },
    statusFilter: { type: String, required: true },
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      rawTransactions: [],
    }
  },
  mounted() {
    this.fetchTransactions()
  },
  computed: {
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
    async fetchTransactions() {
      this.isLoading = true
      this.hasError = false

      try {
        const [transactionsResponse] = await Promise.all([
          TransactionService.fetchTransactions(),
          asyncDelay(600),
        ])

        this.rawTransactions = transactionsResponse.data
      } catch (error) {
        this.hasError = true
        throw new Error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
