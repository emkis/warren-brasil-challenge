<template>
  <button :type="type" v-on="$listeners" class="AppButton" :class="themeClass">
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
  computed: {
    themeClass() {
      const theme = this.theme || themesEnum.DEFAULT
      return `AppButton--${theme}`
    },
  },
}
</script>

<style lang="scss" scoped>
.AppButton {
  display: flex;
  place-content: center;
  padding: 10px 20px;
  border: 1px solid var(--border, transparent);
  border-radius: $radius-box;
  font-family: $font-title;
  font-weight: 400;
  color: var(--color);
  background: var(--bg);
  transition: background $default-transition, color $default-transition,
    border $default-transition;
  cursor: pointer;

  &--default {
    --color: var(--primary-text);
    --bg: var(--element-bg);
  }

  &--selected {
    --color: var(--button-selected-text);
    --bg: var(--accent-20);
    --border: var(--button-selected-border);
  }
}
</style>
