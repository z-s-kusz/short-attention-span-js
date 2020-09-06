<template>
  <div>
    <color-golf-title></color-golf-title>
    <form>
      <div class="menu-group">
        <label>Group Size:
          <select v-model="playerCount">
            <option v-for="number in 4"
              :key="number" :value="number">{{ number }}</option>
          </select>
        </label>
        <div v-for="index in 4" :key="index" v-show="playerCount >= index">
          <label>Player {{ index }} Name:&nbsp;
            <input type="text" v-model="playerNames[index - 1]"/>
          </label>
        </div>
      </div>

      <!-- TODO implement game mode -->
      <!-- <div class="menu-group">
        <span>Game Mode:</span>
        <div class="radio-group">
          <label>Standard
            <input type="radio" value="standard" v-model="gameMode"/>
          </label>
          <label>'Closest to the Pin' mode coming soon
          </label>
        </div>
      </div> -->

      <div class="menu-group">
        <label>Distance To Hole:&nbsp;
          <span v-show="disableHolesSelect">* Distance is always 0 for pin challenge</span>
          <select v-model="distance" v-bind:disabled="disableHolesSelect">
            <option v-for="option in distanceOptions"
            v-bind:key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </label>
        <label># Holes to Play:
          <select v-model="numberOfHoles">
            <option v-for="option in numberOfHolesOptions"
              v-bind:key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </label>
      </div>
      <button id="start" class="vertical-space-child"
        v-on:click.prevent="startClick">&#8594; start &#8592;</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorGolfTitle from '@/components/color-golf/ColorGolfTitle.vue';

export default Vue.extend({
  name: 'MenuSettings',
  components: {
    ColorGolfTitle,
  },
  data() {
    return {
      disableHolesSelect: false,
      distance: 60,
      distanceOptions: [
        30, 60, 90, 180,
      ],
      gameMode: 'standard',
      numberOfHoles: 3,
      numberOfHolesOptions: [
        1, 3, 6, 9,
      ],
      playerCount: 1,
      playerNames: [
        'Player 1', 'Player 2', 'Player 3', 'Player 4',
      ],
    };
  },
  methods: {
    startClick(): void {
      const data = {
        distance: this.distance,
        gameMode: this.gameMode,
        numberOfHoles: this.numberOfHoles,
        playerCount: this.playerCount,
        playerNames: this.playerNames,
      };
      this.$emit('start-click', data);
    },
  },
  watch: {
    gameMode(value): void { // using watch instead of computed to assign distance easier
      if (value === 'pinChallenge') {
        this.distance = 0;
        this.disableHolesSelect = true;
      } else {
        this.disableHolesSelect = false;
      }
    },
  },
});
</script>

<style>
* {
  color: white;
}
option, select, input {
  color: black;
  border-radius: 4px;
}
.white-text {
  color: white;
}
label {
  display: block;
  padding: 12px;
  padding-top: 0;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menu-group {
  padding: 20px;
  box-sizing: border-box;
  margin: 24px;
  margin-top: 0;
  border: 4px solid white;
  border-radius: 8px;
  width: 90%;
}
#start {
  height: 80px;
  width: 45%;
  margin: 12px;
  padding: 24px 36px;
  color: black;
  font-weight: 700;
  background-color: rgb(117, 211, 23);
}
@media only screen and (min-width: 900px) {
  .menu-group {
    width: 66%;
  }
  #start {
    width: 33%;
  }
}
</style>
