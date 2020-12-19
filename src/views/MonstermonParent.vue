<template>
<main>
  <h1>monstermons!!!</h1>
  <monstermon-card v-for="card in store.player1.deck"
    :key="card.name" :monstermon="card">
  </monstermon-card>
</main>
</template>

<script lang="ts">
import Vue from 'vue';
import monstermonStore from '@/services/monstermon-store';
import MonstermonCard from '@/components/monstermon/MonstermonCard.vue';

export default Vue.extend({
  name: 'MonstermonView',
  components: {
    MonstermonCard,
  },
  created() {
    this.store.player1.deck = monstermonStore.tempDeckBuilder.makeGreenDeck();
    console.log(this.store.player1.deck);
  },
  data() {
    return {
      store: monstermonStore.store,
      author: '',
      title: '',
      lines: [] as string[],
      loading: false,
      showError: false,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';
</style>
