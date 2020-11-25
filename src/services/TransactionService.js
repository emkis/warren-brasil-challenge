import { ApiService } from '@/services/ApiService'

export const TransactionService = {
  fetchTransactions() {
    return ApiService.get('transactions')
  },
}
