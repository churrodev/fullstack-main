<template>
  <div class="badge">
    {{ compute.statusInfo.text }}
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useChargerStatus } from '@/hooks'

interface Props {
  status?: number
}

const props = defineProps<Props>()
const chargerStatus = useChargerStatus()
const compute = reactive({
  statusInfo: computed(() => chargerStatus.getStatus(props.status || 0))
})
</script>

<style>
.badge {
  width: 80px;
  border-radius: 999px;
  padding: 4px 16px;
  font-size: 14px;
  text-align: center;
  background: v-bind('compute.statusInfo.bgColor');
  color: v-bind('compute.statusInfo.color');
}
</style>
