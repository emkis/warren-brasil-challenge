<template>
  <li class="TransactionHistoryItem" v-on="$listeners">
    <div tabindex="-1">
      <div class="TransactionHistoryItem__row">
        <StatusTag :status="transaction.status" />
        <h4 class="TransactionHistoryItem__amount">
          {{ formatAmount(transaction.amount) }}
        </h4>
      </div>

      <h3 class="TransactionHistoryItem__title">{{ transaction.title }}</h3>
      <p class="TransactionHistoryItem__description">
        {{ transaction.description }}
      </p>
    </div>
  </li>
</template>

<script>
import { formatCurrencyBRL } from '@/utilities/formatters'
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
  cursor: pointer;

  &:focus,
  &:focus-within {
    outline: none;
  }

  &:focus > div {
    border-color: var(--element-focus);
  }

  > div {
    padding: 24px 20px;
    border-radius: $radius-box;
    background: var(--element-bg);
    color: var(--primary-text);
    border: 2px solid transparent;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $default-gutter;
  }

  &__amount,
  &__title,
  &__description {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
  }

  &__description {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 400;
    color: var(--secondary-text);
  }
}
</style>
