import { TransactionService } from '@/services/TransactionService'
import * as Helpers from './helpers'

export const transactions = {
  namespaced: true,

  state: {
    transactions: [],
    isFetching: false,
    isFetchFailed: false,
  },

  mutations: {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
    FETCH_REQUEST(state) {
      state.isFetching = true
      state.isFetchFailed = false
    },
    FETCH_SUCCESS(state) {
      state.isFetching = false
    },
    FETCH_FAILURE(state) {
      state.isFetching = false
      state.isFetchFailed = true
    },
  },

  getters: {
    getFilteredTransactions: (state) => ({ searchQuery, statusFilter }) => {
      const parsedTransactions = Helpers.parseTransactions(state.transactions)

      const filteredTransactions = Helpers.filterTransactionsByStatusAndTitle({
        transactions: parsedTransactions,
        status: statusFilter,
        title: searchQuery,
      })

      const groupedTransactions = Helpers.groupTransactionsByDate(
        filteredTransactions
      )

      const sortedTransactions = Helpers.sortTransactionsDate(
        groupedTransactions
      )

      return sortedTransactions
    },
  },

  actions: {
    async fetchTransactions({ commit }) {
      try {
        commit('FETCH_REQUEST')

        const transactionsResponse = await TransactionService.fetchTransactions()
        const transactions = transactionsResponse.data

        commit('FETCH_SUCCESS')
        commit('SET_TRANSACTIONS', transactions)
      } catch (error) {
        commit('FETCH_FAILURE')
        throw new Error(error)
      }
    },
  },
}
