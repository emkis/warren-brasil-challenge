<template>
  <div class="TransactionDetails">
    <h2>{{ transaction.title }}</h2>
    <br /><br />

    <TransactionProgressBar status="processed" />

    <h3>Transferido de:</h3>
    <p>{{ transaction.from }}</p>
    <p>{{ formatAmount(transaction.amount) }}</p>

    <br /><br />

    <h3>Para:</h3>
    <p>{{ transaction.to }}</p>
    <p>{{ formatAmount(transaction.amount) }}</p>
    <p>{{ formatDate(transaction.date) }}</p>
  </div>
</template>

<script>
import { formatCurrencyBRL, formatDateString } from '@/utilities'
import TransactionProgressBar from '@/components/TransactionProgressBar'

export default {
  name: 'TransactionDetails',
  props: {
    transaction: { type: Object, required: true },
  },
  components: { TransactionProgressBar },
  methods: {
    formatAmount: formatCurrencyBRL,
    formatDate: formatDateString,
  },
}
</script>

<style lang="scss" scoped>
.TransactionDetails {
  padding: 60px;
  background: white;
  min-width: 500px;
  min-height: 300px;
}
</style>
