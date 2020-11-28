<template>
  <div class="TransactionHistoryPlaceholder">
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
  --square-height: 16px;
  --gap: 13px;

  display: grid;
  gap: var(--gap);
  margin: 0;
  padding: 0;
  list-style: none;

  &__title {
    width: 100px;
  }

  &__block {
    min-height: var(--square-height);
    background: #909090;
    border-radius: $radius-box;
    animation: pulse 1s ease-in-out alternate infinite;
  }

  &__block--grid {
    display: grid;
    gap: var(--gap);
    grid-template-rows: repeat(2, var(--square-height));
    grid-template-columns: repeat(12, 1fr);
    padding: 23px 30px;

    :nth-child(1) {
      grid-row: 1 / 2;
      grid-column: 1 / 5;
    }

    :nth-child(2) {
      grid-row: 1 / 2;
      grid-column: 10 / 13;
    }

    :nth-child(3) {
      grid-row: 2 / 3;
      grid-column: 1 / 7;
    }

    :nth-child(4) {
      grid-row: 2 / 3;
      grid-column: 11 / 13;
    }
  }

  &__inner-square {
    border-radius: 50px;
    min-height: var(--square-height);
    background: #000;
  }

  @keyframes pulse {
    from {
      opacity: 0.1;
    }

    to {
      opacity: 0.3;
    }
  }

  @media (min-width: 768px) {
    --square-height: 20px;
  }
}
</style>
