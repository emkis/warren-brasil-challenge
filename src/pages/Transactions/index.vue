<template>
  <div class="Transactions container">
    <h2 class="Transactions__title">Suas transações</h2>

    <div class="Transactions__search-group">
      <AppInput
        placeholder="Busque transações aqui"
        label="Busque transações aqui"
        :value="filters.title"
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
        :value="filters.status"
        @on-select="handleSelectedFilter"
      />
    </div>

    <TransactionHistoryContainer
      class="Transactions__history"
      :filters="filters"
    />
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { filterOptions, filterStatusTypes } from '@/constants'

import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import { IconFilter } from '@/components/Icons'
import FilterOptions from '@/components/FilterOptions'
import TransactionHistoryContainer from '@/components/TransactionHistory/TransactionHistoryContainer'

export default {
  name: 'TransactionsPage',
  components: {
    AppInput,
    AppButton,
    FilterOptions,
    TransactionHistoryContainer,
    IconFilter,
  },
  data() {
    return {
      isFiltersVisible: false,
      filters: {
        title: '',
        status: filterStatusTypes.ALL,
      },
    }
  },
  methods: {
    handleInputChange: debounce(function (event) {
      const inputValue = event.target.value.trim()
      this.filters.title = inputValue
    }, 200),
    handleSelectedFilter(filterName = '') {
      this.filters.status = filterName
    },
    toggleFiltersVisibility() {
      this.isFiltersVisible = !this.isFiltersVisible
    },
  },
  computed: {
    filterOptions() {
      return filterOptions()
    },
  },
}
</script>

<style lang="scss" scoped>
.Transactions {
  padding: ($default-gutter * 3) ($default-gutter);
  color: var(--primary-text);

  > * + * {
    margin-top: $default-gutter;
  }

  &__title {
    margin-bottom: $default-gutter * 2;
    font-size: 24px;
    color: var(--primary-text);
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

  &__filter-group {
    margin-top: $default-gutter * 2;
  }

  &__filter-label {
    display: block;
    font-size: 16px;
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
