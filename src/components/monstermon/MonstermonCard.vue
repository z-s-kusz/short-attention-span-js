<template>
  <section>
    <h1>{{ monstermon.name }}</h1>
    <h2>{{ monstermon.description }}</h2>
    <div>
      <h3>{{ monstermon.attack.cost }}</h3>
      <p>{{ monstermon.attack.description }}</p>
    </div>
    <div>
      <h3>{{ monstermon.defence.cost }}</h3>
      <p>{{ monstermon.defence.description }}</p>
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
}
</style>
