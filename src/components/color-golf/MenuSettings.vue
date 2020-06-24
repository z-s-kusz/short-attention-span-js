<template>
  <div>
    <h1>Color Golf Settings</h1>
    <form>
      <div class="menu-group">
        <label>Group Size:
          <select v-model="playerCount">
            <option v-for="number in 4"
              v-bind:key="number" v-bind:value="number">{{ number }}</option>
          </select>
        </label>
        <div v-for="index in 4" v-bind:key="index" v-show="playerCount >= index">
          <label>Player {{ index }} Name:&nbsp;
            <input type="text" v-model="playerNames[index - 1]"/>
          </label>
        </div>
      </div>

      <div class="menu-group">
        <span>Game Mode:</span>
        <div class="radio-group">
          <label>Standard
            <input type="radio" value="standard" v-model="gameMode"/>
          </label>
          <label>Closest to the Pin Challenge
            <input type="radio" value="pinChallenge" v-model="gameMode"/>
          </label>
        </div>
      </div>

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
        v-on:click.prevent="startClick">start!</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MenuSettings',
  data() {
    return {
      disableHolesSelect: false,
      distance: 60,
      distanceOptions: [
        0, 10, 30, 60, 90, 180,
      ],
      gameMode: 'standard',
      numberOfHoles: 3,
      numberOfHolesOptions: [
        1, 3, 6, 9, 18,
      ],
      playerCount: 1,
      playerNames: [
        'Player 1', 'Player 2', 'Player 3', 'Player 4',
      ],
    };
  },
  methods: {
    startClick() {
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
    gameMode(value) { // using watch instead of computed to assign distance easier
      if (value === 'pinChallenge') {
        this.distance = 0;
        this.disableHolesSelect = true;
      } else {
        this.disableHolesSelect = false;
      }
    },
  },
};
</script>

<style>
* {
  color: white;
  font-weight: 600;
}
option, select, input {
  color: black;
}
.white-text {
  color: white;
}
label {
  display: block;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menu-group {
  padding: 8px;
  box-sizing: border-box;
  margin: 12px;
  border: 4px solid white;
  width: 90%;
}
#start {
  height: 80px;
  width: 90%;
  margin: 12px;
  padding: 24px 36px;
  color: black;
  font-weight: 900;
  background-color: lawngreen;
}
@media only screen and (min-width: 900px) {
  .menu-group {
    width: 66%;
  }
  #start {
    width: 44%;
  }
}
</style>
