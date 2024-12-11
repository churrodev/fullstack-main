<template>
  <div class="label-wrapper">
    <p class="label">
      <slot name="fromLabel" />
    </p>

    <p class="label">
      <slot name="toLabel" />
    </p>

    <p class="current-label">
      <slot name="currentLabel" />
    </p>
  </div>

  <div class="bar" />

  <div class="label-wrapper">
    <p class="label">
      <slot name="explainLeft" />
    </p>

    <p class="label">
      <slot name="explainTo" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

interface Props {
  to: number,
  current?: number,
}

const props = withDefaults(defineProps<Props>(), {
  current: 0
})

const compute = reactive({
  width: computed(() => `${props.current * 100 / props.to}%`)
})

</script>

<style lang="postcss" scoped>
.bar {
  position: relative;
  height: 8px;
  width: 100%;
  border-radius: 8px;
  background: var(--grey-300);

  &::after {
    content: "";
    position: absolute;
    border-radius: 8px;
    left: 0;
    width: v-bind('compute.width');
    height: 100%;
    background: var(--black);
  }
}

.label-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.current-label,
.label {
  font-size: 14px;
  font-weight: 500;
}

.label {
  color: var(--grey-500);
}

.current-label {
  position: absolute;
  left: v-bind('compute.width');
}
</style>
