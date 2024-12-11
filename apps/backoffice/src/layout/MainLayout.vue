<template>
  <div class="layout">
    <header class="header">
      <div>
        <h1 class="title">
          Knowledge Frontend Test
        </h1>
        <p class="candidate">Richard A. Aguirre</p>
      </div>
      <img src="@/assets/wallbox-logo.svg">
    </header>

    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--grey-200);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--black);
  color: var(--white);
  padding: 16px 24px;
  position: sticky;
  z-index: 10;
  top: 0;
}

.title {
  font-size: 18px;
  margin: 0;
  font-weight: 500;
}

.candidate {
  margin: 0;
  padding-top: 8px;
  font-size: 14px;
}

.body {
  flex: 1;
  padding: 16px;
  overflow: auto;
}

@media (min-width: 768px) {
  .header {
    padding: 16px 48px;
  }

  .title {
    font-size: 20px;
  }

  .body {
    padding: 48px;
  }
}
</style>
