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
import { IconMoon, IconSun } from '@/components/icons'

export default {
  name: 'ThemeSwitcher',
  components: { IconMoon, IconSun },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggleActiveState() {
      this.isActive = !this.isActive
    },
  },
}
</script>

<style lang="scss" scoped>
.ThemeSwitcher {
  border: 0;
  padding: 0;
  background: none;
  $this: &;
  $circle-size: 17px;

  &__circle {
    position: relative;
    width: 45px;
    height: 24px;
    border-radius: 50px;
    background: rgb(18, 18, 20);
    transition: background $default-transition;

    &::after,
    #{$this}__icon-wrapper {
      content: '';
      position: absolute;
      width: $circle-size;
      height: $circle-size;
      top: 50%;
      transform: translateY(-50%);
      background: $color-white;
      border-radius: 50%;
      left: 4px;
      transition: all $default-transition;
    }
  }

  &__icon-wrapper {
    display: grid;
    place-content: center;
    color: $color-black;
    background: none !important;
    z-index: 2;
  }

  &--active {
    #{$this}__circle::after,
    #{$this}__icon-wrapper {
      left: calc(50% + 1px);
      background: $color-warren;
    }

    #{$this}__icon-wrapper {
      color: $color-white;
    }
  }
}
</style>
