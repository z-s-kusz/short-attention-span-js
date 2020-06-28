<template>
  <div>
    <div class="container">
      <div v-for="(item, i) in items" :key="i"
        class="item" :class="getItemClass(i)">
        <div class="black-box-left"></div>
        <div v-html="item.img" class="item-image"></div>
        <div class="black-box-right"></div>
        <span class="item-description">{{ item.description }}</span>
        <span class="item-name">{{ item.name }}</span>
        </div>
    </div>
    <h5 class="show-sm-only">
      Sorry mobile, this demo is modeled after
      TV game content so it currently only works at desktop screen sizes (900px +).
      Responsive styles coming soon!
    </h5>
  </div>
</template>

<script>
const items = [
  { name: 'Star', description: '', img: '&#10029;' },
  { name: 'Shamrock', description: 'Lucky', img: '&#9752;' },
  { name: 'Peace', description: '', img: '&#9774;' },
  { name: 'Sun', description: '5,778 K', img: '&#9728;' },
  { name: 'Pawns', description: '5/8', img: '&#9823;' },
  { name: 'Notes', description: '4/4', img: '&#9835;' },
  { name: 'Snow', description: '', img: '&#10053;' },
  { name: 'Arrows', description: '3/10', img: '&#10163;' },
  { name: 'Phone', description: 'Telephone', img: '&phone;' },
];
export default {
  name: 'MgsCarousel',
  data() {
    return {
      items,
      previousItemIndicies: [8, 7, 6],
      selectedItemIndex: 0,
      nextItemIndicies: [1, 2, 3],
    };
  },
  computed: {
    // how many items should appear on the top given this.items.length
    // items only show up top when 3 or more are available
    previousItemsCount() {
      switch (this.items.length) {
        case 0:
        case 1:
        case 2:
          return 0;
        case 3:
        case 4:
          return 1;
        case 5:
        case 6:
          return 2;
        default:
          return 3;
      }
    },
    // how many items should appear to the right given this.items.length
    // items start to appear to the right first
    nextItemsCount() {
      switch (this.items.length) {
        case 0:
        case 1:
          return 0;
        case 2:
        case 3:
          return 1;
        case 4:
        case 5:
          return 2;
        default:
          return 3;
      }
    },
  },
  mounted() {
    window.addEventListener('keypress', this.onKeyPress);
  },
  destroyed() {
    window.removeEventListener('keypress', this.onKeyPress);
  },
  methods: {
    changeItemIndex(next, index) {
      if (next) {
        return index + 1 === this.items.length ? 0 : index + 1;
      }
      return index - 1 < 0 ? this.items.length - 1 : index - 1;
    },
    onKeyPress(event) {
      const key = String.fromCharCode(event.keyCode);
      if (key === 'd' || key === 's') {
        this.selectedItemIndex = this.changeItemIndex(true, this.selectedItemIndex);
        this.previousItemIndicies.forEach((previousItem, i) => {
          this.previousItemIndicies[i] = this.changeItemIndex(true, previousItem);
        });
        this.nextItemIndicies.forEach((nextItem, i) => {
          this.nextItemIndicies[i] = this.changeItemIndex(true, nextItem);
        });
      } else if (key === 'a' || key === 'w') {
        this.selectedItemIndex = this.changeItemIndex(false, this.selectedItemIndex);
        this.previousItemIndicies.forEach((previousItem, i) => {
          this.previousItemIndicies[i] = this.changeItemIndex(false, previousItem);
        });
        this.nextItemIndicies.forEach((nextItem, i) => {
          this.nextItemIndicies[i] = this.changeItemIndex(false, nextItem);
        });
      }
    },
    getItemClass(i) {
      if (i === this.selectedItemIndex) {
        return 'selected';
      }
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
};
</script>

<style scoped>
.item {
  height: 100px;
  width: 160px;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 78% 22%;
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
  border-right: 6px solid black;
  font-size: 54px;
  color: rgba(128, 0, 128, 0.65);
}
.black-box-left {
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  height: 100%;
  width: 100%;
  background-color: black;
}
.black-box-right {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  height: 100%;
  width: 100%;
  background-color: black;
}
.item-description {
  position: absolute;
  bottom: 20px;
  box-sizing: border-box;
  padding: 0 6px 0 18px;
  font-size: 24px;
  text-shadow: 2px 2px black;
}
.item-name {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px 0 18px;
  text-align: right;
  font-size: 16px;
  font-weight: 600;
  color: white;
}
.container {
  background-image: url('https://www.marylandzoo.org/wp-content/uploads/2019/10/penguinslider2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: calc(100vh - 118px);
  position: relative;
}
.selected .item-image, .selected .item-name, .selected .item-description {
  color: rgb(255, 68, 0);
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
.hide {
  display: none;
}


.show-sm-only {
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
