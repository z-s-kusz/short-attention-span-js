<template>
  <div>
    <h1>Poetry app page here!</h1>
  </div>
</template>

<script>
export default {
  name: 'PoetryParent',
  data() {
    return {
      sideNavOpen: false,
    };
  },
  methods: {
    toggleSideNav() {
      this.sideNavOpen = !this.sideNavOpen;
    },
  },
};
</script>

<style>

</style>
