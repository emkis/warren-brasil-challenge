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

import { asyncDelay } from '@/utilities'
import { filterStatusTypes } from '@/constants'
import { TransactionService } from '@/services/TransactionService'
import { statusFilters } from './filters'

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
  },
  computed: {
    filterOptions() {
      return statusFilters.getOptions()
    },
    transactions() {
      return statusFilters.getFilteredTransactions({
        transactions: this.originalTransactions,
        searchQuery: this.searchQuery,
        statusFilter: this.statusFilter,
      })
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
