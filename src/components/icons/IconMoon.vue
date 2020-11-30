<template>
  <svg
    :height="size"
    :width="size"
    viewBox="0 0 7 9"
    :fill="color"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <path
      d="M2.5625 0.307678C1.76625 0.307678 1.01812 0.51537 0.375 0.868447C1.68312 1.58706 2.5625 2.9246 2.5625 4.46152C2.5625 5.99845 1.68312 7.33598 0.375 8.0546C1.01812 8.40768 1.76625 8.61537 2.5625 8.61537C4.9775 8.61537 6.9375 6.75445 6.9375 4.46152C6.9375 2.1686 4.9775 0.307678 2.5625 0.307678Z"
    />
  </svg>
</template>

<script>
import { iconMixin } from '@/mixins/iconMixin'

export default {
  name: 'IconMoon',
  ...iconMixin,
}
</script>
