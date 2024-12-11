<template>
  <div class="signal">
    <span class="material-icons">
      {{ compute.icon }}
    </span>
    {{ props.type }}
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

interface Props {
  type?: string,
  signal?: number
}

const props = withDefaults(defineProps<Props>(), {
  signal: 0
})

const compute = reactive({
  icon: computed(() => {
    if (props.type === 'ethernet') {
      return 'settings_input_hdmi'
    } else if (props.signal && props.signal < 25) {
      return 'network_wifi_1_bar'
    } else if (props.signal && props.signal < 50) {
      return 'network_wifi_2_bar'
    } else if (props.signal && props.signal < 75) {
      return 'network_wifi_3_bar'
    } else {
      return 'signal_wifi_4_bar'
    }
  })
})

</script>

<style lang="postcss" scoped>
.signal {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  color: var(--black);
}
</style>
