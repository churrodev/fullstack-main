<template>
  <div class="status-cards">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="status-card"
    >
      <div class="card-content">
        <p class="card-title">{{ card.title }}</p>
        <p class="card-value">{{ card.value }}</p>
      </div>
      <span class="card-indicator" :style="{ backgroundColor: card.color }"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Card {
  title: string;
  value: number;
  color: string;
}

defineProps<{
  cards: Card[];
}>();
</script>

<style lang="postcss" scoped>
.status-cards {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
}

.status-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-title {
  font-size: 20px;
  font-weight: 900;
  color: var(--black);
  margin: 0;
}

.card-value {
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}

.card-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  align-self: flex-start;
  margin-top: 7px;
}

@media (max-width: 768px) {
  .status-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .card-indicator {
    align-self: self-start;
  }
}
</style>
