<template>
  <div class="box-group-container">
    <div>
      <color-stack-box-vue v-for="(colorBox, i) in startStack" :key="colorBox.index"
        :index="i" :hsl="colorBox.hsl"
        :isAnchor="colorBox.isAnchor" :active="colorBox.active"
        :onBoxClick="onStartBoxClick" />
    </div>
    <div>
      <color-stack-box-vue v-for="(colorBox, i) in finalStack" :key="colorBox.index"
        :index="i" :hsl="colorBox.hsl"
        :isAnchor="colorBox.isAnchor" :active="colorBox.active"
        :onBoxClick="onEndBoxClick" />
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
      startStack: [
        {
          hsl: emptyColorString, index: 0, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 1, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 2, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 3, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 4, isAnchor: false, active: false,
        },
      ] as ColorStackBoxModel[],
      finalStack: [
        {
          hsl: emptyColorString, index: 0, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 1, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 2, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 3, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 4, isAnchor: false, active: false,
        },
      ] as ColorStackBoxModel[],
      transitionStack: [
        {
          hsl: emptyColorString, index: 0, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 1, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 2, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 3, isAnchor: false, active: false,
        },
        {
          hsl: emptyColorString, index: 4, isAnchor: false, active: false,
        },
      ] as ColorStackBoxModel[],
      selectedBoxIndex: 0,
    };
  },
  mounted() {
    /// setInitialStartStack and setInitialSelectedBoxIndex must be done in order :/ sorry
    this.setInitialStartStack();
    this.setInitialSelectedBoxIndex();
    ///
    this.setAnchorsInFinalAndTransitionStack();
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
        this.advanceRound();
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
    setAnchorsInFinalAndTransitionStack() {
      this.winningStack.forEach((box, index) => {
        if (box.isAnchor) {
          const boxClone = cloneBox(box);
          this.finalStack[index] = boxClone;
          this.transitionStack[index] = boxClone;
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
    advanceRound() {
      if (this.gameWon()) {
        this.handleWin();
      } else {
        // need to move things over and keep playing
        this.startStack = this.finalStack.map((box) => {
          return cloneBox(box);
        });
        this.finalStack = this.transitionStack.map((box) => {
          return cloneBox(box);
        });
        this.setInitialSelectedBoxIndex();
      }
    },
    gameWon(): boolean {
      let win = true;
      this.winningStack.forEach((winningBox, index) => {
        if (winningBox.hsl !== this.finalStack[index].hsl) {
          win = false;
        }
      });
      return win;
    },
  },
});
</script>

<style lang="scss" scoped>
.box-group-container {
  display: flex;
  justify-content: space-between;
}
</style>
