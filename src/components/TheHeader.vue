<template>
  <header class="TheHeader">
    <div class="TheHeader__inner container">
      <WarrenLogo aria-label="Warren Challenge" class="TheHeader__logo" />

      <TheThemeSwitcher />
    </div>
  </header>
</template>

<script>
import WarrenLogo from '@/assets/warren-logo.svg'
import TheThemeSwitcher from '@/components/TheThemeSwitcher'

export default {
  name: 'TheHeader',
  components: { WarrenLogo, TheThemeSwitcher },
}
</script>

<style lang="scss" scoped>
.TheHeader {
  padding: 17px 0;
  color: $color-white;
  background: $color-warren;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    fill: $color-white;
  }
}
</style>
