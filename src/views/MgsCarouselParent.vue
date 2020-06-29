<template>
  <main class="home">
    <section>
      <h3>The MGS1 Item Carousel</h3>
      <h4>Scroll to the bottom to see my web implementation of the item selector UI from the
        Playstation 1 game Metal Gear Solid 1(MGS1).</h4>
      <img src="../assets/mgs1-carousel-example.png"
        alt="Screenshot from Metal Gear Solid 1." />
      <p class="description">Screenshot from Metal Gear Solid 1.</p>
      <div class="flex-image">
        <div>
          <p>I created this demo to emulate one of the coolest item select screens I’ve
            seen in software, the MGS1 item select. The screenshot above shows the item selector
            in action.</p>
          <p>Many games center item lists or use a radial menu, moving the select UI away from
            the space the equiped item occupies. The MGS1 interface keeps the
            selected item in one place and displays the list around it. This is
            similar to user interfaces I've seen in some date and time selectors, like the one
            pictured to the right.</p>
          <p>However, because the item display in MGS1 is in the left corner there is no room to
            show preceding items further left. So those items are rotated and placed above. I was
            thrown for a loop the first time I used it. I wasn’t sure where items were going as I
            paged through a simple list in what appeared to be four directions. But after a few
            moments of testing the controls it began to feel natural. Part of the reason the
            carousel cemented in my mind as an iconic element of the game is because it
            creates a moment of dissonance before becoming familiar.</p>
        </div>
        <img src="../assets/time-pick-ui.jpg"
          alt="A sample time selection UI showig static selection location." />
      </div>

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
      <p>Instead, I abandoned the grid layout in favor of more absolute positioning. Thanks to my
        pre-existing class structure the change only took about 10 minutes. And rather than
        needing to create 4 custom transformations along with the logic of when to apply each I
        was able to get the computer to do the heavy lifting for me with 1 line of css:</p>
      <code>
        <pre>
        .item {
          transition: all 150ms ease-in;
        }</pre>
      </code>

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

<script>
// @ is an alias to /src
import MgsCarousel from '@/components/mgs-carousel/MgsCarousel.vue';

export default {
  name: 'MgsCarouselParent',
  components: {
    MgsCarousel,
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
section {
  max-width: 70%;
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
code pre {
  text-align: start;
  background-color: black;
  padding: 8px;
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
.flex-image {
  display: flex;
  flex-wrap: wrap;
}
.flex-image div {
  flex: 1 1 50%;
}
.flex-image img {
  flex: 0 1 auto;
  height: 400px;
  margin-left: 1.5em;
}
.full-screen {
  width: 100%;
}
</style>
