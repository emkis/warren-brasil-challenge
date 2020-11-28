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
      :options="transactionFilters"
      :value="filterType"
      @on-select="handleSelectedFilter"
    />

    <TransactionHistory
      :isLoading="isLoading"
      :transactions="normalizedTransactions"
    />
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
  },
  computed: {
    transactionFilters() {
      const filterTypes = Object.values(filterTypesEnum)
      const formatFilter = (filterType) => {
        return {
          name: filterTypesTexts[filterType],
          value: filterType,
        }
      }

      return filterTypes.map(formatFilter)
    },
    parsedTransactions() {
      const formatTransactionStatus = (transaction) => {
        const originalStatus = transaction.status
        const customStatus = transactionStatusTexts[originalStatus]

        return { ...transaction, status: customStatus, originalStatus }
      }

      return this.originalTransactions.map(formatTransactionStatus)
    },
    filteredTransactions() {
      return this.parsedTransactions?.filter((transaction) => {
        const targetProperty = transaction[this.filterType]

        const normalizedString = removeAccent(targetProperty.toLowerCase())
        const normalizedQuery = removeAccent(this.filterQuery.toLowerCase())

        return normalizedString.includes(normalizedQuery)
      })
    },
    normalizedTransactions() {
      const formatTransactionItem = (transactionDate) => {
        return {
          date: transactionDate,
          transactions: this.transactionsGroupedByDate[transactionDate],
        }
      }

      return Object.keys(this.transactionsGroupedByDate)
        .sort()
        .reverse()
        .map(formatTransactionItem)
    },
    transactionsGroupedByDate() {
      return groupArrayByProp('date', this.filteredTransactions)
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
