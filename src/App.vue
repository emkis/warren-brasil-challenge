<template>
  <div id="app">
    <TransactionsPage />
    <ModalContainer />
  </div>
</template>

<script>
import TransactionsPage from '@/pages/Transactions'
import ModalContainer from '@/components/Modal/ModalContainer'

export default {
  name: 'App',
  components: { TransactionsPage, ModalContainer },
}
</script>
