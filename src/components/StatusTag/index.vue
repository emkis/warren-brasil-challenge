<template>
  <span class="StatusTag" :class="[`StatusTag--${status.value}`]">
    {{ status.formatted }}
  </span>
</template>

<script>
export default {
  name: 'StatusTag',
  props: {
    status: {
      type: Object,
      required: true,
      validator(prop) {
        const hasRequiredProps = 'value' in prop && 'formatted' in prop
        if (hasRequiredProps) return true
      },
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
