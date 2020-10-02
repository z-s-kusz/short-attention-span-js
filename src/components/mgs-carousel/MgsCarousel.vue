<template>
  <div>
    <div class="controls">
      <h3>Carousel Demo: Hold 'i' to open menu, use 'wasd' keys to page</h3>
      <label>Volume
        <input type="range" min="0" max="1" step="0.01"
        class="slider" v-model="volumeControl"/>
      </label>
    </div>
    <div class="container">
      <div v-for="(item, i) in items" :key="i"
        class="item" :class="getItemClass(i)">
        <div v-html="item.img" class="item-image"></div>
        <span class="item-description">{{ item.description }}</span>
        <span class="item-name">{{ item.name }}</span>
      </div>
    </div>
    <h3 class="show-sm-only">
      Sorry mobile, this demo is modeled after
      TV game content so it only works at desktop screen sizes (900px +).
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Howl,
  Howler,
} from 'howler';
import soundStore from '@/services/sound-store';

const items = [
  { name: 'Star', description: '', img: '&#10029;' },
  { name: 'Shamrock', description: 'Lucky', img: '&#9752;' },
  { name: 'Peace', description: '', img: '&#9774;' },
  { name: 'Sun', description: '5,778 K', img: '&#9728;' },
  { name: 'Pawns', description: '5/8', img: '&#9823;' },
  { name: 'Notes', description: '4/4', img: '&#9835;' },
  { name: 'Snow', description: '', img: '&#10053;' },
  { name: 'No Item', description: '', img: '' },
  { name: 'Phone', description: 'Telephone', img: '&phone;' },
  { name: 'Dice', description: '3/6', img: '&#9858;' },
];

export default Vue.extend({
  name: 'MgsCarousel',
  data() {
    return {
      items,
      menuIsOpen: false,
      previousItemIndicies: [9, 8, 7, 6],
      selectedItemIndex: 0,
      nextItemIndicies: [1, 2, 3, 4],
      openSFX: new Howl({
        src: [require('@/assets/coin-4.wav')],
      }),
      shiftSFX: new Howl({
        src: [require('@/assets/ok-1.wav')],
      }),
      closeSFX: new Howl({
        src: [require('@/assets/collect-5.wav')],
      }),
      volumeControl: `${soundStore.store.globalVolume}`, // uses range input which returns string
    };
  },
  mounted() {
    window.addEventListener('keypress', this.onKeyPress);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    Howler.volume(soundStore.store.globalVolume);
  },
  destroyed() {
    window.removeEventListener('keypress', this.onKeyPress);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },
  methods: {
    changeItemIndex(next: boolean, index: number): number {
      if (next) {
        return index + 1 === this.items.length ? 0 : index + 1;
      }
      return index - 1 < 0 ? this.items.length - 1 : index - 1;
    },
    onKeyPress(event: KeyboardEvent): void {
      if (!this.menuIsOpen) return;

      const key = String.fromCharCode(event.keyCode);
      if (key === 'd' || key === 's') {
        this.selectedItemIndex = this.changeItemIndex(true, this.selectedItemIndex);
        this.previousItemIndicies.forEach((previousItem, i) => {
          this.previousItemIndicies[i] = this.changeItemIndex(true, previousItem);
        });
        this.nextItemIndicies.forEach((nextItem, i) => {
          this.nextItemIndicies[i] = this.changeItemIndex(true, nextItem);
        });
        this.shiftSFX.play();
      } else if (key === 'a' || key === 'w') {
        this.selectedItemIndex = this.changeItemIndex(false, this.selectedItemIndex);
        this.previousItemIndicies.forEach((previousItem, i) => {
          this.previousItemIndicies[i] = this.changeItemIndex(false, previousItem);
        });
        this.nextItemIndicies.forEach((nextItem, i) => {
          this.nextItemIndicies[i] = this.changeItemIndex(false, nextItem);
        });
        this.shiftSFX.play();
      }
    },
    onKeyDown(event: KeyboardEvent): void {
      if (event.keyCode === 73 && !this.menuIsOpen) {
        this.menuIsOpen = true;
        this.closeSFX.stop();
        this.openSFX.play();
      }
    },
    onKeyUp(event: KeyboardEvent): void {
      if (event.keyCode === 73 && this.menuIsOpen) {
        this.menuIsOpen = false;
        this.openSFX.stop();
        this.closeSFX.play();
      }
    },
    getItemClass(i: number): string {
      if (i === this.selectedItemIndex) return 'selected';
      else if (!this.menuIsOpen) return 'hide';

      let classIndex;
      if (this.previousItemIndicies.indexOf(i) !== -1) {
        classIndex = this.previousItemIndicies.indexOf(i);
        return `previous${classIndex}`;
      } else if (this.nextItemIndicies.indexOf(i) !== -1) {
        classIndex = this.nextItemIndicies.indexOf(i);
        return `next${classIndex}`;
      }
      return 'hide';
    },
  },
  watch: {
    volumeControl(volume: string): void {
      const floatVolume = parseFloat(volume);
      soundStore.store.setGlobalVolume(floatVolume);
      Howler.volume(floatVolume);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

.item {
  height: 100px;
  width: 160px;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  transition: all 150ms ease-in;
}
.item-image {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  border-top: 2px solid black;
  border-right: 8px solid black;
  border-bottom: 22px solid black;
  border-left: 40px solid black;
  font-size: 54px;
  color: rgba(0, 162, 255, 0.8);
}
.item-description {
  position: absolute;
  bottom: 20px;
  left: 0;
  box-sizing: border-box;
  padding: 0 8px 0 18px;
  font-size: 24px;
  text-shadow: 2px 2px black;
}
.item-name {
  position: absolute;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0 8px 0 18px;
  text-align: right;
  font-size: 16px;
}
.container {
  background-image: url('https://www.marylandzoo.org/wp-content/uploads/2019/10/penguinslider2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: calc(100vh - 118px);
  position: relative;
}
.controls {
  padding: 24px 36px 8px 36px;
  text-align: start;
}
h3 {
  text-align: start;
  margin: 0;
}
.selected .item-image, h3 {
  color: rgb(0, 136, 214);
}

.slider {
  -webkit-appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}
.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
}
.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
}

.selected {
  bottom: 20px;
  left: 20px;
}
.previous0 {
  bottom: 140px; /* (20px gap * 2 + 100px height) */
  left: 20px;
}
.previous1 {
  bottom: 260px;
  left: 20px;
}
.previous2 {
  bottom: 380px;
  left: 20px;
}
.previous3 {
  bottom: 500px;
  left: 20px;
}
.next0 {
  bottom: 20px;
  left: 200px; /* (20px gap * 2 + 160px width) */
}
.next1 {
  bottom: 20px;
  left: 380px;
}
.next2 {
  bottom: 20px;
  left: 560px;
}
.next3 {
  bottom: 20px;
  left: 740px;
}
.hide {
  display: none;
}

.show-sm-only {
  padding: 18px;
  display: none;
}
@media only screen and (max-width: 899px) {
  .container {
    display: none;
  }
  .show-sm-only {
    display: block;
  }
}
</style>
