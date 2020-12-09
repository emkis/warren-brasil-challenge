import { transactionStatusTexts } from '@/constants'
import { groupArrayByProp, removeAccent } from '@/utilities'

export function parseTransactions(transactions) {
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
}

export function isFilterMatchThisStatus(transaction, filter) {
  return transaction.status.value.includes(filter)
}

export function isTitleMatchQuery(transaction, searchQuery) {
  const { title } = transaction

  const normalizedTitle = removeAccent(title).toLowerCase()
  const normalizedQuery = removeAccent(searchQuery.toLowerCase())

  return normalizedTitle.includes(normalizedQuery)
}

export function filterTransactionsByStatusAndTitle({
  transactions,
  status,
  title,
}) {
  const { isFilterMatchThisStatus, isTitleMatchQuery } = this

  return transactions.filter((transaction) => {
    if (!isFilterMatchThisStatus(transaction, status)) return
    return isTitleMatchQuery(transaction, title)
  })
}

export function groupTransactionsByDate(transactions) {
  return groupArrayByProp('date', transactions)
}

export function sortTransactionsDate(transactions) {
  const formatTransactionItem = (transactionDate) => {
    const thisDayTransactions = transactions[transactionDate]
    return { date: transactionDate, transactions: thisDayTransactions }
  }

  return Object.keys(transactions).sort().reverse().map(formatTransactionItem)
}
