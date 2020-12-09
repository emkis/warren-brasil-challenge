<template>
  <div class="TransactionProgressBar">
    <div class="TransactionProgressBar__bar">
      <div class="TransactionProgressBar__progress" :style="progressStyle" />
    </div>

    <div class="TransactionProgressBar__context">
      <div
        :key="step.status"
        v-for="(step, stepIndex) in transactionSteps"
        class="TransactionProgressBar__progress-point"
        :class="[
          { active: step.status === status },
          { complete: stepIndex <= currentStepIndex },
        ]"
      >
        <div class="TransactionProgressBar__small-circle" />
        <h5 class="TransactionProgressBar__label">{{ step.text }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { transactionStatusEnum, transactionStatusTexts } from '@/constants'

export default {
  name: 'TransactionProgressBar',
  props: {
    status: { type: String, required: true },
  },
  computed: {
    transactionSteps() {
      const totalSteps = Object.keys(transactionStatusEnum).length

      return Object.values(transactionStatusEnum).map((status, statusIndex) => {
        return {
          progress: (statusIndex / (totalSteps - 1)) * 100,
          status,
          text: transactionStatusTexts[status],
        }
      })
    },
    currentStepIndex() {
      return this.transactionSteps.indexOf(this.currentStep)
    },
    currentStep() {
      return this.transactionSteps.find(({ status }) => status === this.status)
    },
    progressStyle() {
      const { progress } = this.currentStep
      return `transform: translateX(${progress}%)`
    },
  },
}
</script>

<style lang="scss" scoped>
.TransactionProgressBar {
  position: relative;
  padding: 30px 0;
  $this: &;

  &__bar {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 6px;
    border-radius: 12px;
    background: var(--accent);
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  &__progress {
    height: 100%;
    background: var(--progress-bar);
    transition: transform 200ms ease-in;
  }

  &__context {
    display: flex;
    justify-content: space-between;
  }

  &__progress-point {
    position: relative;

    &.complete #{$this}__small-circle {
      background: var(--color-white);
      box-shadow: 0 0 0 6px var(--accent);
    }

    &.complete #{$this}__label,
    &.active #{$this}__label {
      color: var(--primary-text);
    }

    &.active #{$this}__small-circle {
      background: var(--color-white);
      box-shadow: 0 0 0 8px var(--accent), 0 0 0 13px var(--accent-50);
    }
  }

  &__small-circle {
    $circleSize: 12px;
    position: relative;
    background: var(--progress-bar);
    width: $circleSize;
    height: $circleSize;
    border-radius: 100%;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
    z-index: 1;
  }

  &__label {
    position: absolute;
    top: 100%;
    left: 50%;
    margin: 20px 0 0 0;
    font-size: 13px;
    color: var(--secondary-text);
    transform: translate(-50%, 0);
  }
}
</style>
