<template>
  <div class="tabs">
    <button
      v-for="tab in props.options"
      :key="tab.key"
      data-test-id="tab"
      class="tab"
      :class="{ selected: tab.key === compute.currentTab }"
      @click="compute.currentTab = tab.key"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

export type Tab = {
  key: string,
  name: string
}

interface Props {
  options: Tab[],
  modelValue: string
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const compute = reactive({
  currentTab: computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })
})
</script>

<style lang="postcss" scoped>
.tabs {
  display: flex;
  padding: 16px 24px;
}

.tab {
  position: relative;
  color: var(--grey-500);
  background: var(--white);
  text-transform: uppercase;
  border: 0;
  padding: 16px;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  &.selected {
    color: var(--black);
  }

  &.selected::after {
    background: var(--black);
  }
}
</style>
