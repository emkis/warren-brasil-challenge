import {
  transactionStatusFormattedTexts,
  filterStatusTypes,
  filterStatusTypesFormattedTexts,
} from '@/constants'
import { groupArrayByProp, removeAccent } from '@/utilities'

export const filters = {
  parseTransactions(transactions) {
    const formatTransactionStatus = (transaction) => {
      const statusValue = transaction.status
      const formattedStatus = transactionStatusFormattedTexts[statusValue]

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
  isFilterMatchThisStatus(transaction, filter) {
    return transaction.status.value.includes(filter)
  },
  isTitleMatchQuery(transaction, searchQuery) {
    const { title } = transaction

    const normalizedTitle = removeAccent(title).toLowerCase()
    const normalizedQuery = removeAccent(searchQuery.toLowerCase())

    return normalizedTitle.includes(normalizedQuery)
  },
  filterTransactionsByStatusAndTitle({ transactions, status, title }) {
    const { isFilterMatchThisStatus, isTitleMatchQuery } = this

    return transactions.filter((transaction) => {
      if (!isFilterMatchThisStatus(transaction, status)) return
      return isTitleMatchQuery(transaction, title)
    })
  },
  groupTransactionsByDate(transactions) {
    return groupArrayByProp('date', transactions)
  },
  sortTransactionsDate(transactions) {
    const formatTransactionItem = (transactionDate) => {
      const thisDayTransactions = transactions[transactionDate]
      return { date: transactionDate, transactions: thisDayTransactions }
    }

    return Object.keys(transactions).sort().reverse().map(formatTransactionItem)
  },
  getFilteredTransactions({ transactions, searchQuery, statusFilter }) {
    const parsedTransactions = this.parseTransactions(transactions)

    const filteredTransactions = this.filterTransactionsByStatusAndTitle({
      transactions: parsedTransactions,
      status: statusFilter,
      title: searchQuery,
    })

    const groupedTransactions = this.groupTransactionsByDate(
      filteredTransactions
    )

    const sortedTransactions = this.sortTransactionsDate(groupedTransactions)

    return sortedTransactions
  },
  getOptions() {
    const filters = Object.values(filterStatusTypes)

    const formatFilter = (filterValue) => {
      const filterName = filterStatusTypesFormattedTexts[filterValue]
      return { name: filterName, value: filterValue }
    }

    return filters.map(formatFilter)
  },
}
