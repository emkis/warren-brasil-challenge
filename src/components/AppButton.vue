<template>
  <button
    :type="type"
    v-on="$listeners"
    class="AppButton"
    :class="[`AppButton--${theme}`]"
  >
    <slot />
  </button>
</template>

<script>
const themesEnum = Object.freeze({
  DEFAULT: 'default',
  SELECTED: 'selected',
})

export default {
  name: 'AppButton',
  props: {
    type: { type: String, default: 'button' },
    theme: {
      type: String,
      default: themesEnum.DEFAULT,
      validator(targetTheme) {
        if (!targetTheme) return true

        const themes = Object.values(themesEnum)
        return themes.includes(targetTheme)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.AppButton {
  display: flex;
  place-content: center;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: $radius-box;
  font-family: $font-title;
  font-weight: 400;
  transition: background $default-transition, color $default-transition,
    border $default-transition;
  cursor: pointer;

  &--default {
    color: $color-black;
    background: $color-gray-element;
  }

  &--selected {
    color: $color-warren;
    background: rgba($color-warren, 0.2);
  }
}
</style>
