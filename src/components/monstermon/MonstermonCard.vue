<template>
  <section>
    <div class="header">
      <h1>{{ monstermon.name }}</h1>
      <h2>{{ monstermon.type }}</h2>
    </div>

    <div class="image"></div>

    <div class="info">
      <div class="stat">
        <div class="stat-value">{{ monstermon.attack.cost }}</div>
        <p>{{ monstermon.attack.description }}</p>
      </div>
      <div class="stat">
        <div class="stat-value">{{ monstermon.defence.cost }}</div>
        <p>{{ monstermon.defence.description }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MonstermonCard',
  props: {
    monstermon: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

section {
  border: 2px solid purple;
  padding: 8px;
  margin: 12px 24px;
  width: 280px;
  height: 420px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr 2fr;
  gap: 0px 0px;
}

.stat {
  display: flex;
  justify-content: flex-start;
  align-items:  center;
  margin-top: 16px;
  text-align: left;
}

.stat-value {
  border: 8px solid rgb(51, 105, 255);
  padding: 8px;
  margin-right: 16px;
}
</style>
