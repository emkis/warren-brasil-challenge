<template>
  <li class="TransactionHistoryItem" v-on="$listeners">
    <div class="TransactionHistoryItem__row">
      <h3>{{ transaction.title }}</h3>
      <h4>{{ formatAmount(transaction.amount) }}</h4>
    </div>

    <div class="TransactionHistoryItem__row">
      <p>{{ transaction.description }}</p>
      <StatusTag :status="transaction.status" />
    </div>
  </li>
</template>

<script>
import { formatCurrencyBRL } from '@/utilities'
import StatusTag from '@/components/StatusTag'

export default {
  name: 'TransactionHistoryItem',
  components: { StatusTag },
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
  background: #e9e9e9;
  cursor: pointer;

  &__row {
    $safeSpace: 30px;
    display: grid;
    grid-template-columns: 4fr $safeSpace 1fr;

    :nth-child(2) {
      grid-column: 3 / 4;
      margin-left: auto;
    }
  }

  &__row + &__row {
    margin-top: 10px;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
