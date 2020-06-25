<template>
  <div id="app">
    <div id="nav">
      <router-link to="/color-golf">Color Golf</router-link>
      <span @click="showModal = true">How to Play</span>
    </div>
    <default-modal v-if="showModal" :body="modalBody" :header="modalHeader"
      v-on:close-modal="showModal = false" />
    <router-view/>
  </div>
</template>

<script>
import DefaultModal from '@/components/DefaultModal.vue';

export default {
  components: {
    DefaultModal,
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
};
</script>
<style>
body {
  background-color: #333;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #333;
}

#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active, #nav span {
  color: #9aecc7;
  cursor: pointer;
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
}
</style>
