import TransactionHistory from './TransactionHistory'
import TransactionHistoryPlaceholder from './TransactionHistoryPlaceholder'

export default {
  functional: true,
  props: {
    isLoading: { type: Boolean, default: false },
    transactions: { type: Array, required: true },
  },
  render(createElement, context) {
    const { props, data } = context
    const { transactions, isLoading } = props
    const { staticClass, attrs } = data

    if (isLoading) {
      return createElement(TransactionHistoryPlaceholder, {
        attrs,
        staticClass,
      })
    }

    return createElement(TransactionHistory, {
      attrs,
      staticClass,
      props: { transactions },
    })
  },
}
