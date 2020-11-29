<template>
  <fieldset class="AppInput">
    <label :for="uuid" class="sr-only">{{ label }}</label>

    <input
      :id="uuid"
      :type="type"
      ref="input"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      class="AppInput__field"
    />
  </fieldset>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, default: 'text' },
  },
  computed: {
    uuid() {
      return Math.random().toString(16).slice(10)
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.AppInput {
  border: 0;
  padding: 0;

  &__field {
    $border-size: 2px;
    border: $border-size solid transparent;
    width: 100%;
    max-width: 300px;
    min-height: 40px;
    padding: 0 23px;
    border-radius: $radius-box;
    font-family: $font-title;
    font-weight: 400;
    background: $color-gray-element;
    transition: border $default-transition;
    outline: none;

    &:focus {
      border: $border-size solid $color-gray-text;
    }

    &::placeholder {
      color: $color-gray-text;
    }
  }
}
</style>
