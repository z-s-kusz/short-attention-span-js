<template>
  <div>
    <h1>Color Golf Settings</h1>
    <main>
      <div class="half">
        <form class="">
          <label>Group Size
            <select v-model="playerCount">
              <option v-for="number in 4" v-bind:key="number">{{ number }}</option>
            </select>
          </label>
          <div v-for="index in 4" v-bind:key="index" v-show="playerCount >= index">
            <label>Player {{ index }} Name:&nbsp;
              <input type="text" v-model="playerNames[index - 1]"/>
            </label>
          </div>
          <div class="radio-group">
            <span>Game Mode: </span>
            <label>Standard
              <input type="radio" value="standard" v-model="gameMode"/>
            </label>
            <label>Closest to the Pin Challenge
              <input type="radio" value="pinChallenge" v-model="gameMode"/>
            </label>
          </div>
        </form>
      </div>

      <div class="half">
        <form class="">
          <label>Distance To Hole:&nbsp;
            <span v-show="disableHolesSelect">* Distance is always 0 for pin challenge</span>
            <select v-model="distance" v-bind:disabled="disableHolesSelect">
              <option v-for="option in distanceOptions" v-bind:key="option">{{ option }}</option>
            </select>
          </label>
          <label># Holes to Play
            <select v-model="numberOfHoles">
              <option v-for="option in numberOfHolesOptions"
                v-bind:key="option">{{ option }}</option>
            </select>
          </label>
        </form>
        <button id="start">start!</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'StartMenu',
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
  // computed: {
  //   showName() {
  //     return `1:${this.playerNames[0]} | 3:${this.playerNames[2]}`;
  //   },
  // },
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
main {
  background-color: #333;
  display: flex;
  flex-direction: row;
}
.half {
  flex: 1 1 100%;
}
form {
  width: 100%;
}

#start {
  height: 80px;
  width: 100%;
  margin: 12px;
  padding: 24px 36px;
  color: black;
  font-weight: 900;
  background-color: lawngreen;
}
</style>
