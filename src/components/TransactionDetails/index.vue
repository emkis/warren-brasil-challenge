<template>
  <div class="TransactionDetails">
    <h2>{{ transaction.title }}</h2>
    <TransactionProgressBar :status="transaction.status.value" />

    <br /><br />
    <h3>Transferido de:</h3>
    <p>{{ transaction.from }}</p>
    <p>{{ formatAmount(transaction.amount) }}</p>

    <br /><br />

    <h3>Para:</h3>
    <p>{{ transaction.to }}</p>
    <p>{{ formatAmount(transaction.amount) }}</p>
  </div>
</template>

<script>
import { formatCurrencyBRL } from '@/utilities/formatters'
import TransactionProgressBar from './TransactionProgressBar'

export default {
  name: 'TransactionDetails',
  components: { TransactionProgressBar },
  props: {
    transaction: { type: Object, required: true },
  },
  methods: {
    formatAmount: formatCurrencyBRL,
  },
}
</script>

<style lang="scss" scoped>
.TransactionDetails {
  padding: 60px;
  background: white;
  min-width: 500px;

  .TransactionProgressBar {
    margin: 26px 0;
  }
}
</style>
