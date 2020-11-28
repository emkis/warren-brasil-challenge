<template>
  <div class="TransactionHistory">
    <template v-if="isTransactionListEmpty">
      <h2 class="TransactionHistory__message">Nenhuma transação encontrada</h2>
    </template>

    <template v-else>
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
    </template>
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
  computed: {
    isTransactionListEmpty() {
      return this.transactions.length === 0
    },
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
.TransactionHistory__message {
  font-size: 16px;
}

.TransactionHistoryItem + .TransactionHistoryItem {
  margin-top: $default-gutter;
}

.TransactionHistoryGroup + .TransactionHistoryGroup {
  margin-top: $default-gutter * 2;
}
</style>
