<template>
  <svg
    :height="size"
    :width="size"
    viewBox="0 0 17 17"
    fill="none"
    :stroke="color"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    stroke-width="2"
  >
    <path d="M1 1L16 16" />
    <path d="M1 16L16 1" />
  </svg>
</template>

<script>
import { iconMixin } from '@/mixins/iconMixin'

export default {
  name: 'IconClose',
  ...iconMixin,
}
</script>
