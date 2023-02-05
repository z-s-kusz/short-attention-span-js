<template>
<main class="container">
  <h1 id="tesst-id">Hades Style Buttons</h1>
  <p>Based off of the colorful borders with shimmering flairs found in the
    boon selection screen of Hades.
  </p>
  <!--
    grid used becuase the buttons don't seem to like flex ???
    which is a very clear sign that this is bad -->
  <div class="grid-container">
    <colorful-button :buttonId="'defaultButton'" class="btn1">
      Default Button
    </colorful-button>
    <colorful-button class="btn2" :buttonId="'hadesColors'"
      :color0="'#a7dc66'" :color1="'#f1f3b2'" :color2="'#e0c1e1'"
      :color3="'#5dd9cf'" :color4="'#aeaa7d'">
      Custom Color
    </colorful-button>

    <colorful-button :buttonId="'longName'" class=" btn3">
      What Happens With A Really Long Name
    </colorful-button>

  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorfulButton from '@/components/ColorfulButton.vue';

export default Vue.extend({
  components: {
    ColorfulButton,
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 1rem 1rem 1rem;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 18px;
  grid-row-gap: 18px;
  align-items: center;
  justify-items: center;
}
.btn1 {
  grid-area: 1 / 2 / 2 / 3;
}
.btn2 {
  grid-area: 2 / 2 / 3 / 3;
}
.btn3 {
  grid-area: 3 / 2 / 4 / 3;
}
</style>
