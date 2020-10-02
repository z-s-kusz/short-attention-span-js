<template>
  <main class="home">
    <section>
      <h3>The MGS1 Item Carousel</h3>
      <h4>Scroll to the bottom to try my web implementation of the item selector UI from the
        Playstation 1 game Metal Gear Solid 1(MGS1).</h4>
      <img src="../assets/mgs1-carousel-example.png"
        alt="Screenshot from Metal Gear Solid 1." />
      <p class="description">Screenshot with menu open.</p>

      <h3>Web Implementation</h3>
      <p>Each item box is made with a main div that has black borders of various sizes to get the
        effect of an image floating in the top right of a black box while preserving the opaque
        background. The text is positioned absolute to get the name and extra info aligned as seen
        in the screenshot.</p>
      <p>My initial attempt to position the boxes in the bottom left used css grid. The L shape
        created in the screenshot looks like a grid so I thought it would be a natural fit. That
        is until I started trying to animate it. I hadn't tried to animate grids before and I
        learned that animating grid items into new areas through css transition isn’t supported.
        I could have gotten around this by using animated transformations but then I would need
        to add classes based on the direction each item could go: left, right, up, and
        down.</p>
      <p>Instead, I abandoned the grid layout in favor of absolute positioning. Thanks to my
        class structure the change only took about 5 minutes. And rather than
        needing to create 4 custom transformations along with the logic of when to apply each I
        was able to get the computer to do the heavy lifting for me with 1 line of css:</p>

<!-- messed up formatting to make it work with <pre> tags -->
<pre>
<code>.item {
  transition: all 150ms ease-in;
}</code>
</pre>

      <p>A consequence of this is that you can get the items to fly around the corner if you
        page through fast enough. Give it a try by clicking 'w' and 'd' as fast as possible.
        This could be easily corrected with input throttling but the exercise was more about
        css and the results are amusing so I've left it as is.</p>

      <h3>Sound</h3>
      <p>Sound effects were later added with Howler.js. I have the volume set quite low, so
        you may need to turn it up if you don't hear anything.</p>

      <h3>(Im)practical Applications</h3>
      <p>I can’t imagine a practical application for this other than a web game that relies more
        on keyboard than mouse, but it was a fun exercise in creating a unique UI that has stuck
        with me for over 15 years.</p>

      <h3>Try It Out!</h3>
      <em>Keyboard input is required to use the carousel.</em>
      <p>Hold 'i' to open the selector menu. Use ‘wasd’ as arrow keys to move back and forth
        through the list. I find it easier to stick with ‘a’ and ‘d’ (left and right) or ‘w’
        and ‘s’ (up and down) instead of trying to use all four at once. You can find the
        original game's item select instructions on page 32 of&nbsp;
        <a href="https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/manual/Formated/Metal_Gear_Solid_-_1998_-_Konami.pdf"
          target="_blank">this pdf</a>.
      </p>
    </section>
    <mgs-carousel class="full-screen" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import MgsCarousel from '@/components/mgs-carousel/MgsCarousel.vue';

export default Vue.extend({
  name: 'MgsCarouselParent',
  components: {
    MgsCarousel,
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
section {
  width: 70%;
  background-color: #272727;
  border-radius: 10px;
  padding: 20px;
  padding-top: 8px;
  margin: 12px;
  align-self: center;
}
h3, em, a, .description {
  color: rgb(0, 162, 255);
}
pre code {
  background-color: black;
  border: 1px solid #999;
  display: block;
  padding: 8px;
  border-radius: 10px;
  text-align: left;
}
p {
  text-align: left;
  text-indent: 2em;
}
.description {
  margin: 0 0 24px 0;
  text-indent: 0;
}
img {
  margin-bottom: 0;
  max-width: 100%;
}
.full-screen {
  width: 100%;
}
@media only screen and (max-width: 899px) {
  section {
    width: 85%;
  }
}
</style>
