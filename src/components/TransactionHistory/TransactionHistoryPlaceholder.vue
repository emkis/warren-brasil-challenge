<template>
  <div
    class="TransactionHistoryPlaceholder"
    aria-label="Carregando a lista de transações"
  >
    <div
      class="TransactionHistoryPlaceholder__block TransactionHistoryPlaceholder__title"
    />

    <div
      :key="blockItem"
      v-for="blockItem in 10"
      class="TransactionHistoryPlaceholder__block TransactionHistoryPlaceholder__block--grid"
    >
      <div
        :key="innerSquare"
        v-for="innerSquare in 4"
        class="TransactionHistoryPlaceholder__inner-square"
      />
    </div>
  </div>
</template>

<script>
export default { name: 'TransactionHistoryPlaceholder' }
</script>

<style lang="scss" scoped>
.TransactionHistoryPlaceholder {
  $square-height: 17px;
  display: grid;
  gap: $default-gutter;

  &__title {
    width: 100px;
  }

  &__block {
    min-height: $square-height;
    border-radius: $radius-box;
    background: var(--element-bg);
    animation: pulse 1s ease-in-out alternate infinite;
  }

  &__block--grid {
    display: grid;
    gap: $default-gutter;
    grid-template-rows: repeat(3, $square-height);
    grid-template-columns: repeat(12, 1fr);
    place-content: center;
    min-height: 139px;
    padding: 24px 20px;

    :nth-child(1) {
      grid-row: 1 / 2;
      grid-column: 1 / 4;
    }

    :nth-child(2) {
      grid-row: 1 / 2;
      grid-column: 10 / 13;
    }

    :nth-child(3) {
      grid-row: 2 / 3;
      grid-column: 1 / 5;
    }

    :nth-child(4) {
      grid-row: 3 / 4;
      grid-column: 1 / 8;
    }
  }

  &__inner-square {
    border-radius: 50px;
    background: var(--placeholder-square);
  }

  @keyframes pulse {
    from {
      opacity: 0.6;
    }

    to {
      opacity: 10;
    }
  }
}
</style>
