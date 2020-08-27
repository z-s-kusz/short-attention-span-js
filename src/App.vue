<template>
  <div id="app">
    <div id="nav">
      <router-link to="/mgs-carousel">MGS1 Carousel Demo</router-link>
      <router-link to="/poetry">Poetry</router-link>
      <router-link to="/color-golf">Color Golf</router-link>
      <span @click="showModal = true" v-show="showColorGolf">How to Play</span>
    </div>
    <div class="pallete-picker-menu" v-show="showPoetry">
      <pallete-picker></pallete-picker>
    </div>
    <default-modal v-if="showModal" :body="modalBody" :header="modalHeader"
      v-on:close-modal="showModal = false" />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import DefaultModal from '@/components/DefaultModal.vue';
import PalletePicker from '@/components/pallets/PalletePicker.vue';

export default {
  components: {
    DefaultModal,
    PalletePicker,
  },
  data() {
    return {
      modalHeader: 'How To Play Color Golf',
      modalBody: `<p>Adjust your three color levels to create the color shown.</p>
                  <p>The color you create will appear on the right
                  of the main window after you hit 'enter.'</p>
                  <p>Use your color and the 'distance' to help your next guess.</p>
                  <p>The goal is to get your distance as close to 0 as possible.
                  0 distance means you got a perfect match.</p>
                  <p>Getting within the winning range or exceeding 8 attempts
                  ends your turn.</p>`,
      showModal: false,
    };
  },
  computed: {
    showColorGolf() {
      return this.$route.fullPath.includes('/color-golf');
    },
    showPoetry() {
      return this.$route.fullPath.includes('/poetry');
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap');

body {
  background-color: #333;
}
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #333;
}
h1, h2, h3, h4, h5, h6 {
  /* override chrome default weights */
  font-weight: normal;
}
#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#nav a {
  color: white;
  padding: 0 20px;
}

#nav a.router-link-exact-active, #nav span {
  color: #9aecc7;
  cursor: pointer;
  padding: 0 20px;
}
button:hover {
  cursor: pointer;
}
body {
  margin: 0;
}
button {
  border-radius: 8px;
  background-color: black;
  padding: 12px 32px;
  font-family: 'Roboto Mono', monospace;
}
.pallet-picker-menu {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
