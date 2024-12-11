<template>
  <div class="modal">
    <div class="title-wrapper">
      <h3 class="title">
        Charger Detail
      </h3>
      <button
        class="button-close"
        @click="emit('close')"
      >
        <span class="material-icons">
          close
        </span>
      </button>
    </div>

    <div class="modal-grid">
      <div class="area-text">
        <p class="modal-title">
          {{ compute.charger.name }}
        </p>
        <p class="modal-title">
          {{ compute.charger.serialNumber }}
        </p>
        <p class="modal-subtitle">
          Time {{ compute.charger.time }}
        </p>
      </div>

      <div class="area-connectivity">
        <ChargerConnectivity
          :type="compute.charger.connectivityType"
          :signal="compute.charger.wifiSignal"
        />
      </div>

      <div class="area-img ">
        <img width="70" :src="compute.charger.image" alt="pulsar">
      </div>

      <div class="area-status ">
        <ChargerStatus :status="compute.charger.status" />
      </div>
    </div>

    <ProgressBar
      :to="85"
      :current="compute.charger.energySupplied"
    >
      <template #fromLabel>
        0 kWh
      </template>

      <template #currentLabel>
        {{ compute.charger.energySupplied }} kWh
      </template>

      <template #toLabel>
        85 kWh
      </template>

      <template #explainLeft>
        Energy Supplied
      </template>

      <template #explainTo>
        Max Capacity
      </template>
    </ProgressBar>

    <ProgressBar
      :to="32"
      :current="compute.charger.currentCharging"
    >
      <template #fromLabel>
        0 A
      </template>

      <template #currentLabel>
        {{ compute.charger.currentCharging }} A
      </template>

      <template #toLabel>
        32 A
      </template>

      <template #explainLeft>
        Charging Current
      </template>

      <template #explainTo>
        Max Charging
      </template>
    </ProgressBar>
  </div>

  <div class="modal-bg" />
</template>

<script setup lang="ts">
import ChargerStatus from '@/components/ChargerStatus.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import ChargerConnectivity from '@/components/ChargerConnectivity.vue'
import { computed, reactive } from 'vue'
import { useTime } from '@/hooks'
import type { Charger } from '@/types'

interface Props {
  charger: Charger.Detail | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const time = useTime()

const compute = reactive({
  charger: computed(() => {
    return {
      ...props.charger,
      image: String(new URL(`../assets/${props.charger?.type.toLowerCase()}.png`, import.meta.url)),
      time: props.charger ? time.getTime(props.charger) : ''
    }
  })
})
</script>

<style lang="postcss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  z-index: 100; /* Mayor al fondo */
  padding: 24px;
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: auto;

  @media (min-width: 768px) {
    width: 50vw;
    height: 50vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }
}

.modal-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: var(--black);
  opacity: 0.5;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title {
  font-size: 18px;
  font-weight: 500;
}

.button-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
}

.modal-subtitle,
.modal-title {
  margin: 0;
  font-size: 14px;
}

.modal-title {
  color: var(--grey-500);
}

.modal-grid {
  display: grid;
  grid-template-columns: auto max-content max-content;
  gap: 8px;
  grid-template-areas:
    "text connectivity img"
    "status status status";

  @media (max-width: 768px) {
    grid-template-columns: auto auto auto;
    grid-template-areas:
      "text connectivity img"
      "status status status";
    align-items: center;
    gap: 16px;
  }
}

.area-text {
  grid-area: text;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    text-align: left; /* Mantén el texto alineado a la izquierda */
  }
}

.area-connectivity {
  grid-area: connectivity;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.area-img {
  grid-area: img;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }

  img {
    max-width: 60px;
    height: auto;
  }
}

.area-status {
  grid-area: status;
  display: flex;
  justify-content: center;
  align-items: center; /* Asegura el centrado vertical y horizontal */

  @media (max-width: 768px) {
    justify-content: center; /* Centra el badge también en mobile */
    margin-top: 16px;
  }
}
</style>
