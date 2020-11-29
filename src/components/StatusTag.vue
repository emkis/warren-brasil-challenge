<template>
  <span class="StatusTag" :class="[statusClass && `StatusTag--${statusClass}`]">
    {{ status.formatted }}
  </span>
</template>

<script>
import { transactionStatusEnum } from '@/constants'

export default {
  name: 'StatusTag',
  props: {
    status: { type: Object, required: true },
  },
  computed: {
    statusClass() {
      const cssClasses = {
        [transactionStatusEnum.CREATED]: 'created',
        [transactionStatusEnum.PROCESSING]: 'processing',
        [transactionStatusEnum.PROCESSED]: 'processed',
      }

      return cssClasses[this.status.value]
    },
  },
}
</script>

<style lang="scss" scoped>
.StatusTag {
  --bg: #333;
  display: grid;
  place-items: center;
  width: fit-content;
  max-width: 150px;
  min-height: 24px;
  padding: 0 13px;
  border-radius: 20px;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
  background: var(--bg);

  &--created {
    --bg: #3599ff;
  }

  &--processing {
    --bg: #f5710c;
  }

  &--processed {
    --bg: #00b563;
  }
}
</style>
