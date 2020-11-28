<template>
  <div class="Transactions">
    <h1 class="Transactions__title">Suas transações</h1>

    <AppInput
      placeholder="Busque transações aqui"
      label="Busque transações aqui"
      :value="filterQuery"
      ref="searchInput"
      @input="handleInputChange"
      autofocus
    />

    <FilterOptions
      :options="filters"
      :value="filterType"
      @on-select="handleSelectedFilter"
    />

    <TransactionHistory :isLoading="isLoading" :transactions="transactions" />
  </div>
</template>

<script>
import { debounce } from 'debounce'

import {
  filterTypesEnum,
  filterTypesTexts,
  transactionStatusTexts,
} from '@/constants'
import { removeAccent, groupArrayByProp, asyncDelay } from '@/utilities'
import { TransactionService } from '@/services/TransactionService'

import AppInput from '@/components/AppInput'
import FilterOptions from '@/components/FilterOptions'
import TransactionHistory from '@/components/TransactionHistory'

export default {
  name: 'TransactionsPage',
  components: { AppInput, FilterOptions, TransactionHistory },
  data() {
    return {
      isLoading: true,
      hasError: false,

      originalTransactions: [],
      filterQuery: '',
      filterType: filterTypesEnum.TITLE,
    }
  },
  mounted() {
    this.fetchTransactions()
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

        this.originalTransactions = transactionsResponse.data
      } catch (error) {
        this.hasError = true
        throw new Error(error)
      } finally {
        this.isLoading = false
      }
    },
    handleInputChange: debounce(function (event) {
      const inputValue = event.target.value.trim()
      this.filterQuery = inputValue
    }, 200),
    handleSelectedFilter(filterName = '') {
      this.filterType = filterName
      this.$refs.searchInput.focus()
    },
    getFilteredTransactions(transactions) {
      return transactions.filter((transaction) => {
        const targetProperty = String(transaction[this.filterType])

        const normalizedString = removeAccent(targetProperty.toLowerCase())
        const normalizedQuery = removeAccent(this.filterQuery.toLowerCase())

        return normalizedString.includes(normalizedQuery)
      })
    },
    groupTransactionsByDate(transactions) {
      return groupArrayByProp('date', transactions)
    },
    parseTransactions(transactions) {
      const formatTransactionStatus = (transaction) => {
        const originalStatus = transaction.status
        const customStatus = transactionStatusTexts[originalStatus]

        return { ...transaction, status: customStatus, originalStatus }
      }

      return transactions.map(formatTransactionStatus)
    },
    sortTransactions(transactions) {
      const formatTransactionItem = (transactionDate) => {
        const dayTransactions = transactions[transactionDate]
        return { date: transactionDate, transactions: dayTransactions }
      }

      return Object.keys(transactions)
        .sort()
        .reverse()
        .map(formatTransactionItem)
    },
  },
  computed: {
    filters() {
      const filters = Object.values(filterTypesEnum)

      const formatFilter = (filterType) => {
        const filterName = filterTypesTexts[filterType]
        return { name: filterName, value: filterType }
      }

      return filters.map(formatFilter)
    },
    transactions() {
      const {
        originalTransactions,
        parseTransactions,
        getFilteredTransactions,
        groupTransactionsByDate,
        sortTransactions,
      } = this

      const parsedTransactions = parseTransactions(originalTransactions)
      const filteredTransactions = getFilteredTransactions(parsedTransactions)
      const groupedTransactions = groupTransactionsByDate(filteredTransactions)
      const sortedTransactions = sortTransactions(groupedTransactions)

      return sortedTransactions
    },
  },
}
</script>

<style lang="scss" scoped>
.Transactions {
  max-width: 533px;
  margin: 0 auto;
  padding: ($default-gutter * 3) ($default-gutter);

  &__title {
    margin-bottom: $default-gutter * 2;
  }

  .TransactionHistory {
    margin-top: $default-gutter * 4;
  }

  * + * {
    margin-top: $default-gutter;
  }
}
</style>
