<template>
  <div id="app">
    <TheHeader />
    <TransactionsPage />
    <ModalContainer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TransactionsPage from '@/pages/Transactions'
import { ModalContainer } from '@/components/Modal'

export default {
  name: 'App',
  components: { TheHeader, TransactionsPage, ModalContainer },
}
</script>
