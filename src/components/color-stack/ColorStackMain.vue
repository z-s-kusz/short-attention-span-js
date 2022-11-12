<template>
  <div class="box-group-container" :style="boxHeight">
    <transition name="fade" active>
      <p class="round-message" v-show="showRoundMessage">{{ roundMessage }}</p>
    </transition>

    <div class="box margin-right start-stack"
      :class="{ winStart: gameWon}">
      <color-stack-box-vue v-for="(colorBox, i) in startStack" :key="colorBox.index"
        :index="i" :hsl="colorBox.hsl"
        :isAnchor="colorBox.isAnchor" :active="colorBox.active"
        :onBoxClick="onStartBoxClick" :emptyColorString="emptyColorString"
        :gameWon="gameWon" />
    </div>
    <div class="box margin-left final-stack"
      :class="{ winFinal: gameWon, roundChange: roundChange}">
      <color-stack-box-vue v-for="(colorBox, i) in finalStack" :key="colorBox.index"
        :index="i" :hsl="colorBox.hsl"
        :isAnchor="colorBox.isAnchor" :active="colorBox.active"
        :onBoxClick="onEndBoxClick" :emptyColorString="emptyColorString"
        :gameWon="gameWon" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ColorStackBoxVue from '@/components/color-stack/ColorStackBox.vue';
import ColorStackBoxModel from '@/models/ColorStackBoxModel';

// generic array type implementation of https://stackoverflow.com/a/2450976
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function cloneBox(box: ColorStackBoxModel): ColorStackBoxModel {
  return {
    hsl: box.hsl,
    isAnchor: box.isAnchor,
    active: box.active,
    index: box.index,
  };
}

const emptyColorString = 'hsl(0, 100%, 100%)';
const testWin = false; // set true to get to win condition faster for testing

export default Vue.extend({
  name: 'ColorStackMain',
  components: {
    ColorStackBoxVue,
  },
  props: {
    winningStack: {
      type: Array as PropType<ColorStackBoxModel[]>,
      // no idea why this needs to be a function that returns the default value
      // typescript yells at me for `default: []`
      default: () => [],
    },
    allowStartBoxClicks: {
      type: Boolean,
      default: false,
    },
    handleWin: Function,
  },
  data() {
    return {
      emptyColorString, // declared again here to use im template
      startStack: [] as ColorStackBoxModel[],
      finalStack: [] as ColorStackBoxModel[],
      transitionStack: [] as ColorStackBoxModel[],
      selectedBoxIndex: 0,
      roundIndex: 0,
      showRoundMessage: true,
      gameWon: false, // used for animation
      roundChange: false, // used for animation
    };
  },
  computed: {
    roundMessage(): string {
      return `Stack #${this.roundIndex + 1}`;
    },
    boxHeight() {
      // oof i hate this... consequence of all children being position:absolute (for animations)
      // each box height is 2rem with 4px of margin (+3 covers margins but not perfectly)
      return {
        height: `${this.winningStack.length * 2 + 3}rem`,
      };
    },
  },
  mounted() {
    this.showRoundMessage = true;
    /// must be done in order :/ sorry
    this.setInitialStartStack();
    this.setInitialSelectedBoxIndex();
    this.setFinalAndTransitionStack();
    ///

    this.fadeMessageInOut();
  },
  methods: {
    onStartBoxClick(index: number) {
      if (this.allowStartBoxClicks) {
        this.startStack[this.selectedBoxIndex].active = false;
        this.selectedBoxIndex = index;
        this.startStack[index].active = true;
      }
    },
    onEndBoxClick(targetIndex: number, hsl: string) {
      if (hsl === emptyColorString) {
        this.finalStack[targetIndex].hsl = this.startStack[this.selectedBoxIndex].hsl;
        this.incrementSelectedBoxIndex();
      }
    },
    incrementSelectedBoxIndex() {
      this.startStack[this.selectedBoxIndex].active = false;

      if (this.selectedBoxIndex < this.startStack.length - 1) {
        this.selectedBoxIndex++;
      } else if (!this.allowStartBoxClicks) {
        return this.advanceRound();
      } else {
        this.selectedBoxIndex = 0;
      }

      if (this.startStack[this.selectedBoxIndex].isAnchor) {
        this.incrementSelectedBoxIndex();
        return;
      }
      this.startStack[this.selectedBoxIndex].active = true;
    },
    setInitialSelectedBoxIndex() {
      // set start to first non-anchor box
      let startIndex = -1;
      this.winningStack.forEach((box, index) => {
        if (startIndex === -1 && !box.isAnchor) {
          startIndex = index;
          this.startStack[index].active = true;
        }
      });
      this.selectedBoxIndex = startIndex;
    },
    setFinalAndTransitionStack() {
      this.winningStack.forEach((box, index) => {
        if (box.isAnchor) {
          const boxClone = cloneBox(box);
          this.finalStack[index] = boxClone;
          this.transitionStack[index] = boxClone;
        } else {
          const plainBox = {
            index,
            isAnchor: false,
            active: false,
            hsl: emptyColorString,
          };
          this.finalStack[index] = plainBox;
          this.transitionStack[index] = cloneBox(plainBox);
        }
      });
    },
    setInitialStartStack() {
      // shuffle all, remove anchors, add anchors in correct spots
      const winningStackClone = this.winningStack.map((box) => {
        return cloneBox(box);
      });
      const shuffledStack = shuffle(winningStackClone)
        .filter((box) => {
          return !box.isAnchor;
        });

      this.winningStack.forEach((box, index) => {
        if (box.isAnchor) {
          const boxClone = cloneBox(box);
          shuffledStack.splice(index, 0, boxClone);
        }
      });

      this.startStack = shuffledStack;
    },
    async advanceRound() {
      if (this.checkGameWon()) {
        this.gameWon = true; // for animation
        setTimeout(() => {
          this.handleWin();
        }, 4000);
      } else {
        await this.animateRoundChange();
        // need to move things over and keep playing
        this.startStack = this.finalStack.map((box) => {
          return cloneBox(box);
        });
        this.finalStack = this.transitionStack.map((box) => {
          return cloneBox(box);
        });
        this.setInitialSelectedBoxIndex();
        this.roundIndex++;
        this.fadeMessageInOut();
      }
    },
    checkGameWon(): boolean {
      let win = true;
      this.winningStack.forEach((winningBox, index) => {
        if (winningBox.hsl !== this.finalStack[index].hsl) {
          win = false;
        }
      });
      if (testWin) win = true; // for fast testing
      return win;
    },
    fadeMessageInOut() {
      this.showRoundMessage = true;
      setTimeout(() => {
        this.showRoundMessage = false;
      }, 2000);
    },
    animateRoundChange() {
      this.roundChange = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          this.roundChange = false;
          resolve(true);
        }, 800);
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.box-group-container {
  position: relative;
}

.box {
  flex: 0 1 auto;
}
.margin-right {
  margin-right: 4rem;
}
.margin-left {
  margin-left: 4rem;
}

.start-stack {
  position: absolute;
  left: 0;
  transition: opacity 800ms ease-in;
}
.winStart {
  opacity: 0;
}

.final-stack {
  position: absolute;
  right: 0;
  transition: all 400ms ease-in-out;
}
.winFinal {
  animation: winFinal 4s;
  animation-fill-mode: forwards;
  margin: 0;
}
@keyframes winFinal {
  33% {
    right: calc(50% - 16vw); // boxes are 32vw wide
    transform: scaleX(100%);
  }
  100% {
    right: calc(50% - 16vw);
    transform: scaleX(300%);
  }
}
.roundChange {
  right: calc(100% - 32vw);
}

.round-message {
  position: absolute;
  top: 40%;
  right: calc(50% - 4rem);
  width: 8rem;
}

// hooks into built in vue styles
.fade-leave-active {
  transition: opacity .5s ease-in-out;
}

.fade-enter-active {
  transition: opacity 350ms;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
