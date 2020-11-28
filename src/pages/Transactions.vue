<template>
  <div id="Transactions">
    <h1>Warren Brasil Challenge</h1>
    <span>{{ new Date() }}</span>
    <br /><br />

    <TheInput
      placeholder="Busque aqui uma transação"
      label="Hello there.."
      :value="filterQuery"
      @input="handleInputChange"
    />

    <select name="types" v-model="filterType">
      <option
        :key="typeIndex"
        v-for="(type, typeIndex) in filters"
        :value="type"
      >
        {{ type }}
      </option>
    </select>

    <TransactionHistory
      :isLoading="isLoading"
      :transactions="normalizedTransactions"
    />
  </div>
</template>

<script>
import { debounce } from 'debounce'

import { filterTypesEnum } from '@/constants'
import { removeAccent, groupArrayByProp, asyncDelay } from '@/utilities'
import { TransactionService } from '@/services/TransactionService'

import TransactionHistory from '@/components/TransactionHistory'
import TheInput from '@/components/TheInput'

export default {
  name: 'TransactionsPage',
  components: { TheInput, TransactionHistory },
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
  },
  computed: {
    filters() {
      return Object.values(filterTypesEnum)
    },
    filteredTransactions() {
      return this.originalTransactions?.filter((transaction) => {
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
#Transactions {
  padding: 30px 13px;
}
</style>
