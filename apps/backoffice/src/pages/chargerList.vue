<template>
  <MainLayout>
    <StatusCards :cards="statusCards" />
    <SerialNumberFilter @filter="methods.applySerialFilter" />
    <div class="table-wrapper">
      <tabs-container
        v-model="data.selectedTab"
        :options="data.options"
        @update:model-value="data.page = 1"
      />

      <div class="table-scroll">
        <table class="table">
          <thead>
            <tr>
              <th class="cell" />
              <th class="cell">
                Serial Number
              </th>
              <th class="cell">
                Connectivity
              </th>
              <th class="cell">
                Status
              </th>
              <th class="cell">
                Charging Time
              </th>
              <th class="cell">
                Energy Supplied
              </th>
              <th class="cell">
                Charging Current
              </th>
              <th class="cell">
                Manufactured Date
              </th>
              <th class="cell">
                Actions
              </th>
              <th class="cell" />
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(charger, index) in compute.chargersParsed"
              :key="index"
              class="row"
            >
              <td class="cell">
                <img width="48" :src="charger.img">
              </td>
              <td class="cell">
                <p class="charger-name">
                  {{ charger.serialNumber }}
                </p>
              </td>
              <td class="cell">
                <ChargerConnectivity
                  :type="charger.connectivityType"
                  :signal="charger.wifiSignal"
                />
              </td>
              <td class="cell">
                <div>
                  <ChargerStatus :status="charger.status" />
                </div>
              </td>
              <td class="cell">
                {{ charger.chargingTimeParsed }}
              </td>
              <td class="cell">
                {{ charger.energySuppliedParsed }}
              </td>
              <td class="cell">
                {{ charger.currentChargingParsed }}
              </td>
              <td class="cell">
                {{ charger.manufacturedDateParsed }}
              </td>
              <td class="cell">
                <button
                  class="button info"
                  @click="methods.openModal(charger)"
                >
                  Detail
                </button>
              </td>
              <td>
                <button
                  class="button danger"
                  @click="methods.deleteCharger(index)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p class="total-elements">
          Total: {{ compute.chargersParsed.length || 0 }}
        </p>
        <button
          v-if="compute.chargersParsed.length > 0 && (data.page * data.dataPerLoad) < data.chargers.length"
          class="footer-button"
          @click="data.page++"
        >
          Load more
        </button>
      </div>
    </div>
  </MainLayout>

  <ChargerDetail
    v-if="data.isChargerDetailOpen"
    :charger="data.currentCharger"
    @close="data.isChargerDetailOpen = false"
  />
</template>

<script setup lang="ts">
import MainLayout from '@/layout/MainLayout.vue'
import TabsContainer from '@/components/TabsContainer.vue'
import ChargerDetail from '@/components/ChargerDetail.vue'
import ChargerStatus from '@/components/ChargerStatus.vue'
import ChargerConnectivity from '@/components/ChargerConnectivity.vue'
import SerialNumberFilter from '@/components/SerialNumberFilter.vue'
import StatusCards from '@/components/StatusCards.vue';
import { chargersApi } from '@/api'
import { computed, reactive } from 'vue'
import { useTime, useChargerStatus } from '@/hooks'
import type { Charger } from '@/types'
import type { Tab } from '@/components/TabsContainer.vue'

interface Data {
  selectedTab: string,
  isChargerDetailOpen: boolean,
  currentCharger: null | Charger.Detail,
  dataPerLoad: number,
  page: number,
  chargers: Charger.Detail[],
  serialFilter: string,
  options: Tab[]
}

const time = useTime()
const chargerStatus = useChargerStatus()

const data: Data = reactive({
  selectedTab: 'all',
  isChargerDetailOpen: false,
  currentCharger: null,
  dataPerLoad: 10,
  page: 1,
  chargers: [],
  serialFilter: '',
  options: [
    { key: 'all', name: 'all' },
    { key: 'ready', name: 'ready' },
    { key: 'charging', name: 'charging' },
    { key: 'error', name: 'error' }
  ]
})

const statusCards = computed(() => [
  {
    title: 'Total Chargers',
    value: data.chargers.length,
    color: '#000', // Negro para el total
  },
  {
    title: 'Ready',
    value: data.chargers.filter(charger => chargerStatus.getStatus(charger.status).text === 'ready').length,
    color: 'var(--success-700)', // Verde para ready
  },
  {
    title: 'Charging',
    value: data.chargers.filter(charger => chargerStatus.getStatus(charger.status).text === 'charging').length,
    color: 'var(--info-700)', // Azul para charging
  },
  {
    title: 'Error',
    value: data.chargers.filter(charger => chargerStatus.getStatus(charger.status).text === 'error').length,
    color: 'var(--danger-700)', // Rojo para error
  },
]);



const compute = reactive({
  chargersParsed: computed(() => data.chargers
    .filter((charger) =>
      (data.selectedTab === 'all' || chargerStatus.getStatus(charger.status).text === data.selectedTab) &&
      (charger.serialNumber.toLowerCase().includes(data.serialFilter.toLowerCase()))
    )
    .slice(0, data.dataPerLoad * data.page)
    .map((charger) => ({
      ...charger,
      img: String(new URL(`../assets/${charger.type.toLowerCase()}.png`, import.meta.url)),
      chargingTimeParsed: time.getTime(charger),
      energySuppliedParsed: charger.energySupplied ? `${charger.energySupplied} kWh` : '-',
      currentChargingParsed: charger.currentCharging ? `${charger.currentCharging} A` : '-',
      manufacturedDateParsed: new Date(charger.manufacturedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })))
})

const methods = {
  async loadChargers () {
    const { chargers } = await chargersApi.getChargers()
    data.chargers = chargers
    // Chequeo para confirmar qué valores se están calculando
    console.log('Status Cards:', data.chargers);
  },

  deleteCharger (position: number) {
    data.chargers.splice(position, 1)
  },

  openModal (charger: Charger.Detail) {
    data.currentCharger = charger
    data.isChargerDetailOpen = true
  },

  applySerialFilter (serial: string) {
    data.serialFilter = serial
  }
}

methods.loadChargers()
</script>

<style lang="postcss">
.table-wrapper {
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(166 166 166 / 50%);
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background: var(--white);
  padding: 0 24px;
}

.table-scroll {
  overflow: auto;
  width: 100%;
  padding: 0 24px;
}

.cell {
  color: var(--black);
  padding: 16px;
  text-align: left;
}

.row {
  background: var(--grey-100);

  &:nth-child(2n) {
    background: var(--white);
  }
}

.footer {
  position: relative;
  display: flex;
  place-items: center;
  height: 50px;

  & .total-elements {
    position: absolute;
    left: 24px;
    color: var(--grey-500);
    font-size: 14px;
  }
}

.charger-name {
  margin: 0;
}

.footer-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  height: 100%;
  color: var(--grey-500);
}

.button {
  color: var(--white);
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.button:active {
  transform: translateY(2px);
}

.button.danger {
  background-color: var(--danger-700);
}

.button.info {
  background-color: var(--info-500);
}
</style>
