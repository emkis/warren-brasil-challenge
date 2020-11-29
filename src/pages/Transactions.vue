<template>
  <div class="Transactions container">
    <h2 class="Transactions__title">Suas transações</h2>

    <div class="Transactions__search-group">
      <AppInput
        placeholder="Busque transações aqui"
        label="Busque transações aqui"
        :value="searchQuery"
        ref="searchInput"
        @input="handleInputChange"
        autofocus
      />

      <AppButton
        :theme="isFiltersVisible ? 'selected' : null"
        class="Transactions__filter-button"
        @click="toggleFiltersVisibility"
      >
        <IconFilter size="14" />
        Filtros
      </AppButton>
    </div>

    <div v-show="isFiltersVisible" class="Transactions__filter-group">
      <label
        class="Transactions__filter-label"
        aria-label="Status das transações"
      >
        Status
      </label>

      <FilterOptions
        aria-label="Opções de filtro"
        :options="filterOptions"
        :value="statusFilter"
        @on-select="handleSelectedFilter"
      />
    </div>

    <TransactionHistory
      class="Transactions__history"
      aria-label="Lista de transações"
      :isLoading="isLoading"
      :transactions="transactions"
    />
  </div>
</template>

<script>
import { debounce } from 'debounce'

import {
  filterStatusTypes,
  filterStatusTypesTexts,
  transactionStatusTexts,
} from '@/constants'
import { removeAccent, groupArrayByProp, asyncDelay } from '@/utilities'
import { TransactionService } from '@/services/TransactionService'

import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import FilterOptions from '@/components/FilterOptions'
import TransactionHistory from '@/components/TransactionHistory'
import { IconFilter } from '@/components/icons'

export default {
  name: 'TransactionsPage',
  components: {
    AppInput,
    AppButton,
    FilterOptions,
    TransactionHistory,
    IconFilter,
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      isFiltersVisible: false,
      originalTransactions: [],
      searchQuery: '',
      statusFilter: filterStatusTypes.ALL,
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
      this.searchQuery = inputValue
    }, 200),
    handleSelectedFilter(filterName = '') {
      this.statusFilter = filterName
      this.$refs.searchInput.focus()
    },
    toggleFiltersVisibility() {
      this.isFiltersVisible = !this.isFiltersVisible
    },
    parseTransactions(transactions) {
      const formatTransactionStatus = (transaction) => {
        const statusValue = transaction.status
        const formattedStatus = transactionStatusTexts[statusValue]

        return {
          ...transaction,
          status: {
            value: statusValue,
            formatted: formattedStatus,
          },
        }
      }

      return transactions.map(formatTransactionStatus)
    },
    filterTransactionStatus(transactions) {
      return transactions.filter((transaction) => {
        const currentStatus = this.statusFilter
        const targetStatus = transaction.status.value

        return targetStatus.includes(currentStatus)
      })
    },
    filterTransactionTitles(transactions) {
      return transactions.filter((transaction) => {
        const { title } = transaction

        const normalizedTitle = removeAccent(title).toLowerCase()
        const normalizedQuery = removeAccent(this.searchQuery.toLowerCase())

        return normalizedTitle.includes(normalizedQuery)
      })
    },
    groupTransactionsByDate(transactions) {
      return groupArrayByProp('date', transactions)
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
    filterOptions() {
      const filters = Object.values(filterStatusTypes)

      const formatFilter = (filterValue) => {
        const filterName = filterStatusTypesTexts[filterValue]
        return { name: filterName, value: filterValue }
      }

      return filters.map(formatFilter)
    },
    transactions() {
      const {
        originalTransactions,
        parseTransactions,
        filterTransactionStatus,
        filterTransactionTitles,
        groupTransactionsByDate,
        sortTransactions,
      } = this

      const parsedTransactions = parseTransactions(originalTransactions)
      const filteredStatusTransactions = filterTransactionStatus(
        parsedTransactions
      )
      const filteredTransactions = filterTransactionTitles(
        filteredStatusTransactions
      )
      const groupedTransactions = groupTransactionsByDate(filteredTransactions)
      const sortedTransactions = sortTransactions(groupedTransactions)

      return sortedTransactions
    },
  },
}
</script>

<style lang="scss" scoped>
.Transactions {
  padding: ($default-gutter * 3) ($default-gutter);

  > * + * {
    margin-top: $default-gutter;
  }

  &__title {
    margin-bottom: $default-gutter * 2;
    font-size: 24px;
  }

  &__filter-button svg {
    margin: 2px 6px 0 0;
  }

  &__search-group {
    display: flex;
    gap: 6px;

    :first-child {
      flex: 1;
    }
  }

  &__filter-label {
    display: block;
    font-size: 14px;
    font-family: $font-title;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: $default-gutter;
  }

  ::v-deep &__history {
    margin-top: $default-gutter * 4;
  }
}
</style>
