import TransactionHistory from './TransactionHistory'
import TransactionHistoryPlaceholder from './TransactionHistoryPlaceholder'

export default {
  functional: true,
  props: {
    isLoading: { type: Boolean, default: false },
    transactions: { type: Array, required: true },
  },
  render(createElement, { props }) {
    const { transactions, isLoading } = props

    if (isLoading) {
      return createElement(TransactionHistoryPlaceholder)
    }

    return createElement(TransactionHistory, { props: { transactions } })
  },
}
