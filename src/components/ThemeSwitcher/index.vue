<template>
  <button
    class="ThemeSwitcher"
    :class="{ 'ThemeSwitcher--active': isActive }"
    aria-label="Altera o tema"
    @click="toggleActiveState"
  >
    <div class="ThemeSwitcher__circle">
      <span class="ThemeSwitcher__icon-wrapper">
        <IconSun v-if="isActive" size="11" />
        <IconMoon v-else size="11" />
      </span>
    </div>
  </button>
</template>

<script>
import { getCurrentTheme, themesEnum, setTheme } from '@/theme'
import { IconMoon, IconSun } from '@/components/Icons'

export default {
  name: 'ThemeSwitcher',
  components: { IconMoon, IconSun },
  data() {
    return {
      isActive: true,
    }
  },
  mounted() {
    this.checkAppTheme()
  },
  methods: {
    toggleActiveState() {
      this.isActive = !this.isActive
    },
    checkAppTheme() {
      const isLightMode = getCurrentTheme() === themesEnum.LIGHT
      this.isActive = isLightMode
    },
  },
  watch: {
    isActive(isActive) {
      if (isActive) setTheme(themesEnum.LIGHT)
      else setTheme(themesEnum.DARK)
    },
  },
}
</script>

<style lang="scss" scoped>
.ThemeSwitcher {
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  $this: &;
  $circle-size: 17px;

  &__circle {
    position: relative;
    width: 45px;
    height: 24px;
    border-radius: 50px;
    background: var(--app-bg);

    &::after,
    #{$this}__icon-wrapper {
      content: '';
      position: absolute;
      width: $circle-size;
      height: $circle-size;
      top: 50%;
      left: 4px;
      transform: translate(0, -50%);
      border-radius: 50%;
      background: var(--switcher-circle);
      transition: transform $default-transition;
    }
  }

  &__icon-wrapper {
    display: grid;
    place-content: center;
    color: var(--app-bg);
    z-index: 1;
  }

  &--active {
    #{$this}__circle::after,
    #{$this}__icon-wrapper {
      transform: translate(125%, -50%);
    }

    #{$this}__icon-wrapper {
      color: var(--app-bg);
    }
  }
}
</style>
