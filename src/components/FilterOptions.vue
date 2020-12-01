<template>
  <div class="FilterOptions">
    <button
      :key="option.value"
      v-for="option in options"
      class="FilterOptions__option theme-transition"
      :class="{
        'FilterOptions__option--active': option.value === activeOption,
      }"
      @click="setActiveOption(option)"
    >
      {{ option.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterOptions',
  props: {
    options: { type: Array, required: true },
    value: { type: String, required: false },
  },
  data() {
    return {
      activeOption: this.value,
    }
  },
  computed: {
    uuid() {
      return Math.random().toString(16).slice(10)
    },
  },
  methods: {
    setActiveOption(option) {
      const isActiveOptionTheSame = this.activeOption === option.value
      if (isActiveOptionTheSame) return

      this.activeOption = option.value
      this.$emit('on-select', option.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.FilterOptions {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  &__option {
    --color: var(--secondary-text);
    --bg: var(--element-bg);
    --border: transparent;

    padding: 5px 20px;
    font-size: 14px;
    font-family: $font-title;
    font-weight: 500;
    line-height: 1.5;
    color: var(--color);
    border-radius: 50px;
    border: 1px solid var(--border);
    background: var(--bg);
    cursor: pointer;

    &--active {
      --color: var(--button-selected-text);
      --bg: var(--accent-20);
      --border: var(--button-selected-border);
    }
  }
}
</style>
