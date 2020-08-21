<template>
    <svg width="300" viewBox="0 0 19 7">
      <rect v-for="(color, i) in colors" :key="i"
        :x="i * 3 + 0.5" y="0.5" width="9" height="6" :fill="color"
        :stroke="color" stroke-width="0" ry="3" rx="3" />
      <rect x="0.5" y="0.5" width="18" height="6" fill-opacity="0"
        stroke="white" stroke-width="1" ry="3" rx="3" />
    </svg>
</template>

<script>
// TODO thiner border
export default {
  name: 'PalleteDisplay',
  // props: {
  //   colors: Array,
  // },
  data() { // replace with props
    return {
      colors: [
        '#febf63',
        '#ede682',
        '#ade498',
        '#7fdbda',
      ],
    };
  },
  created() {
    // this.colors = this.colors.map((color) => {
    //   return {
    //     'background-color': color,
    //   };
    // });
  },
};
</script>

<style scoped>
.pill, .container {
  border-radius: 100%;
  height: 60px;
}
.container {
  width: 320px;
  border: 2px solid white;
}
.pill {
  min-width: 80px;
  display: inline-block;
}
.two {
  margin-left: 20px;
}
.three {
  margin-left: 40px;
}
.four {
  margin-left: 60px;
}
</style>
