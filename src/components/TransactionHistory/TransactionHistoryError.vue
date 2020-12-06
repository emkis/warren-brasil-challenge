<template>
  <div class="TransactionHistoryError">
    <h3>Aconteceu algum problema de conexão, tente novamente.</h3>

    <AppButton @click="tryToFetchTransactionsAgain">
      Buscar transações
    </AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'TransactionHistoryError',
  components: { AppButton },
  methods: {
    tryToFetchTransactionsAgain() {
      this.$emit('on-fetch')
    },
  },
}
</script>

<style lang="scss" scoped>
.TransactionHistoryError {
  display: flex;
  align-items: center;
  flex-direction: column;
  line-height: 1.5;
  text-align: center;

  * + * {
    margin-top: ($default-gutter * 2);
  }
}
</style>
