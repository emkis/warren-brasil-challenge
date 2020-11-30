<template>
  <div class="TransactionDetails">
    <TransactionProgressBar
      class="TransactionDetails__progress"
      :status="transaction.status.value"
    />

    <div class="TransactionDetails__group">
      <h3 class="TransactionDetails__title">Transferido de:</h3>
      <p class="TransactionDetails__description">{{ transaction.from }}</p>
    </div>

    <div class="TransactionDetails__group">
      <h3 class="TransactionDetails__title">Para:</h3>
      <p class="TransactionDetails__description">{{ transaction.to }}</p>
    </div>

    <div class="TransactionDetails__group">
      <h3 class="TransactionDetails__title">Valor:</h3>
      <p class="TransactionDetails__description">
        {{ formatAmount(transaction.amount) }}
      </p>
    </div>
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
  min-width: 318px;
  padding: ($default-gutter * 3);
  background: $color-background;
  line-height: 1.5;

  &__progress {
    margin: 0 25px 50px;
  }

  &__title {
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 700;
    color: $color-black;
  }

  &__description {
    font-size: 16px;
    color: $color-black;
  }

  &__group + &__group {
    margin-top: $default-gutter * 1.4375;
  }

  @media (min-width: 600px) {
    min-width: 521px;
  }
}
</style>
