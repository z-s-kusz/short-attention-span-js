<template>
  <div class="container">
    <div v-for="(item, i) in items" :key="i"
      class="item" :class="`class${i}`">
      <div class="black-box-left"></div>
      <div v-html="item.img" class="item-image"></div>
      <div class="black-box-right"></div>
      <span class="item-description">{{ item.description }}</span>
      <span class="item-name">{{ item.name }}</span>
      </div>
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
  { name: 'Phone', description: 'Call Me', img: '&phone;' },
];
export default {
  name: 'MgsCarousel',
  data() {
    return {
      items,
      previous3: items.length - 3,
      previous2: items.length - 2,
      previous1: items.length - 1,
      selectedItemIndex: 0,
      next1: 1, // todo dynamicly set these...
      next2: 2,
      next3: 3,
    };
  },
  methods: {
    getPreviousItems(index) {
      return index;
    },
  },
};
</script>

<style scoped>
.item {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 78% 22%;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(255, 255, 255, 0.4);
  position: relative;
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
  position: initial;
  display: grid;
  grid-template-rows: repeat(5, 100px);
  grid-template-columns: repeat(5, 160px);
  grid-gap: 20px 20px;
  padding: 20px;
  /* Keep boxes in lower left */
  justify-content: left;
  align-content: end;
}
.class0 .item-image, .class0 .item-name, .class0 .item-description {
  color: rgb(255, 68, 0);
}


.selected, .class0 {
  grid-row: 5 / 6;
  grid-column: 1 / 2;
}

.previous1, .class6 {
  grid-row: 4 / 5;
  grid-column: 1 / 2;
}
.previous2, .class7 {
  grid-row: 3 / 4;
  grid-column: 1 / 2;
}
.previous3, .class8 {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

.next1, .class1 {
  grid-row: 5 / 6;
  grid-auto-columns: 2 / 3;
}
.next2, .class2 {
  grid-row: 5 / 6;
  grid-auto-columns: 3 / 4;
}
.next3, .class3 {
  grid-row: 5 / 6;
  grid-auto-columns: 4 / 5;
}

.hide, .class4, .class5 {
  display: none;
}
</style>
