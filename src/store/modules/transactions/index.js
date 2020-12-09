import { TransactionService } from '@/services/TransactionService'

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
