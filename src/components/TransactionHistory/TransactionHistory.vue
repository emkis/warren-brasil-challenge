<template>
  <div class="TransactionHistory">
    <TransactionHistoryGroup
      :key="dateGroup.date"
      v-for="dateGroup in transactions"
      :title="dateGroup.date"
    >
      <TransactionHistoryItem
        :key="transaction.id"
        v-for="transaction in dateGroup.transactions"
        :transaction="transaction"
        @click="handleTransactionClick(transaction)"
      />
    </TransactionHistoryGroup>
  </div>
</template>

<script>
import { openModal } from '../Modal/busEvents'
import TransactionHistoryGroup from './TransactionHistoryGroup'
import TransactionHistoryItem from './TransactionHistoryItem'

const TransactionDetails = () => {
  return import(
    /* webpackChunkName: "TransactionDetails" */ '@/components/TransactionDetails'
  )
}

export default {
  name: 'TransactionHistory',
  components: { TransactionHistoryGroup, TransactionHistoryItem },
  props: {
    transactions: { type: Array, required: true },
  },
  methods: {
    handleTransactionClick(transaction) {
      openModal({
        component: TransactionDetails,
        props: { transaction },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$gutter: 13px;

.TransactionHistoryItem + .TransactionHistoryItem {
  margin-top: $gutter;
}

.TransactionHistoryGroup + .TransactionHistoryGroup {
  margin-top: ($gutter * 2);
}
</style>
