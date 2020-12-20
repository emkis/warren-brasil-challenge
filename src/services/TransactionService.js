import { ApiService } from '@/services/ApiService'

export const createTransactionService = (httpClient = ApiService) => ({
  fetchTransactions() {
    return httpClient.get('transactions')
  },
})

export const TransactionService = createTransactionService()
