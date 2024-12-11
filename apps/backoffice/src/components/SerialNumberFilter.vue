<template>
  <div class="serial-filter">
    <label for="serial-filter-input" class="label">Serial Number</label>
    <div class="input-wrapper">
      <input
        id="serial-filter-input"
        type="text"
        v-model="serial"
        class="input"
        placeholder="Search by Serial Number..."
        @input="emitFilter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const serial = ref('')
const emit = defineEmits(['filter'])

const emitFilter = () => {
  emit('filter', serial.value)
}
</script>

<style lang="postcss" scoped>
.serial-filter {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--grey-600);
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 30%;
  height: 45px;
  padding: 8px 16px;
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  font-size: 14px;
  color: var(--black);
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary-500);
  }

  &::placeholder {
    color: var(--grey-400);
  }
}
</style>
