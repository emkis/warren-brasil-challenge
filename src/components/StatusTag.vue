<template>
  <span class="StatusTag" :class="[statusClass && `StatusTag--${statusClass}`]">
    {{ statusText }}
  </span>
</template>

<script>
import { transactionStatusEnum, transactionStatusTexts } from '@/constants'

export default {
  name: 'StatusTag',
  props: {
    status: { type: String, required: true },
  },
  computed: {
    statusText() {
      return transactionStatusTexts[this.status]
    },
    statusClass() {
      const cssClasses = {
        [transactionStatusEnum.CREATED]: 'created',
        [transactionStatusEnum.PROCESSING]: 'processing',
        [transactionStatusEnum.PROCESSED]: 'processed',
      }

      return cssClasses[this.status]
    },
  },
}
</script>

<style lang="scss" scoped>
.StatusTag {
  --bg: #333;
  display: inline-block;
  height: 20px;
  width: fit-content;
  max-width: 150px;
  padding: 3px 13px;
  border-radius: 20px;
  font-size: 13px;
  line-height: 1;
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
