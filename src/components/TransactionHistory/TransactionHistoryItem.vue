<template>
  <li class="TransactionHistoryItem" v-on="$listeners">
    <div>
      <h3>{{ transaction.title }}</h3>
      <h4>{{ formatAmount(transaction.amount) }}</h4>
    </div>
    <small>{{ transaction.status }}</small>
    <p>{{ transaction.description }}</p>
  </li>
</template>

<script>
import { formatCurrencyBRL } from '@/utilities'

export default {
  name: 'TransactionHistoryItem',
  props: {
    transaction: { type: Object, required: true },
  },
  methods: {
    formatAmount: formatCurrencyBRL,
  },
}
</script>

<style lang="scss" scoped>
.TransactionHistoryItem {
  padding: 20px;
  border-radius: $radius-box;
  background: #ddd;
  cursor: pointer;

  > div {
    display: flex;
    justify-content: space-between;
  }

  & + .TransactionHistoryItem {
    margin-top: 13px;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
