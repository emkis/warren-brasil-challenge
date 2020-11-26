<template>
  <fieldset class="TheInput">
    <label class="sr-only">{{ label }}</label>

    <input
      type="text"
      v-bind="$attrs"
      v-on="$listeners"
      class="TheInput__field"
      :value="value"
    />
  </fieldset>
</template>

<script>
export default {
  name: 'TheInput',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
}
</script>

<style lang="scss" scoped>
.TheInput {
  border: 0;
  padding: 0;

  &__field {
    padding: 8px 16px;
  }
}
</style>
