<template>
<div class="flex-container">
  <main class="container">
    <h1 class="main-theme">The Site</h1>
    <p>I love coding but I hate setting up projects. Even with cli tools allowing you to
      `creat-react-app newApp` there is still a lot that goes into starting up a web project.
      "How do I want to host it? Do I want to do the styles or just use a component library?
      Should I set up a CMS for the writing work? Should I fight the node_modules size
      or just accept the bloat and get to MVP faster?"
    </p>
    <p>In contrast, one of my favorite things about coding at work
      is that the infrastructure is just there. I can simply open the project and
      code - when everything else is out of the way at least :).
      To replicate that setting, I created this catch all site.
    </p>
    <p>If you've navigated here through
      <a href="https://github.com/z-s-kusz" target="_blank">github</a>
      you will have seen that I called this project short attention span JS. It's home
      for any small idea I want to implement without thinking about set up.
      To that end, it could also be called "decision fatigue
      remover JS." So here it is, a random mish mash of web projects to
      browse through quickly. Thanks for viewing and I hope you find
      some of my small distraction pages entertaining!
    </p>
    <div class="spacer"></div>

    <h1 class="poetry" :style="poetryStyle">Poetry</h1>
    <p><em :style="poetryEm">DISCLAIMER:</em>&nbsp;
      The available poems and poets were not selected by me.
      I have not reviewed all available poems.
    </p>
    <p>The 'poetry' page started with 2 ideas:</p>
    <p>1. Create a quick way to access lots of poems.</p>
    <p>2. Create pill-like color palettes that I had seen on reddit.</p>
    <p>Because this site is set up to do quick front end experiments, I didn't want
      to write a web scraper or make a database. I found a pretty cool open source poetry
      api to use <a href="https://github.com/thundercomb/poetrydb" target="_blank">here</a>.
      I did have to set up a quick back end (using Heroku) to get around
      CORS but it will be good to have, should any other projects here require back end code. * **
    </p>
    <p>So, go read some poems! If you find depressing poetry, brighten it up with a lovely
      theme like
      <span class="folk-secondary">"</span>
      <span class="folk-primary">Royal Folk</span>.<span class="folk-secondary">"</span>
    </p>
    <p>* Edit 1: Now that netlify functions have been improved I might migrate over to it in
      a future update.
    </p>
    <p>** Edit 2: Migration successful! Not only was I able to convert my node/express api
      to netlify functions in less than 2 hours, I was able to remove the heroku specific
      "wakeup" server code. The netlify functions docs could use some work but I will definitely
      be using netlify functions again.
      Here's hoping netlify stays free (or at least cheap).
    </p>
    <div class="spacer"></div>

    <h1 class="mgs1">MGS1 Carousel</h1>
    <p>I wanted to challenge myself to recreate an iconic UI element from one of my favorite games.
      I have a detailed write up on that page, so I'll cut this one here.
    </p>
    <p>Note that the demo requires a large screen and keyboard but the
      writeup is accessible on mobile.
    </p>
    <div class="spacer"></div>

    <color-golf-title></color-golf-title>
    <p>I often find myself thinking of how to recreate css for sites I visit around the web.
      One part of that is coming up with what I think the rgb colors are for various themes and
      backgrounds. I thought I was pretty good at it until I actually made the color golf game,
      which tasks you with getting as close as you can to a random color with the 256 color range
      for red, green, and blue.
    </p>
    <p>Give it a try and see how good you are at blending colors!</p>
    <div class="spacer"></div>

    <h1 class="color-stack">Color Stack</h1>
    <p>Yet another reddit inspired project.
      "<a
        href="https://www.reddit.com/r/oddlysatisfying/comments/wlkbpv/oc_ive_made_a_game_about_sorting_colors/"
        target="_blank">Game about sorting colors</a>"
      looked like a great front-end only project to recreate, with simple interactivity
      and plentiful smooth animations.
    </p>

    <p>Creating the gradients was made easy with the help of
      <a href="https://colordesigner.io/gradient-generator" target="_blank">colordesigner.io</a>.
    </p>
    <div class="spacer"></div>

    <h1 class="z468">&lt;&lt;The Z468&gt;&gt;</h1>
    <p>An emulator for a non-existent chip. I enjoyed the fake assembly from
      <a href="https://www.zachtronics.com/tis-100" target="_blank">TIS-100</a>
      and wanted to try to make my own assembly and style up a classic terminal interface.
    </p>
    <div class="spacer"></div>

    <div class="tng-component-root">
      <tng-button class="trek-button" color="orange" roundSides="all" textPosition="tl" >
        TNG Panel
      </tng-button>
      <tng-border-wrap-around class="trek-main" :accentX="true">
      <p>The TNG Panel is my first attempt at making a styled components library.
        The design is based on the computer interfaces from Star Trek: The Next Generation.
      </p>
      <p>There are 3 components. The first is the "tng-button" that has a prop for positioning
        text and a prop for rounded or straight edges, allowing composable design where
        lots of buttons together can make entire UI layouts like those seen on the show.
        A tng-button is used as the header above.
      </p>
      <p>The second component is a huge "tng-banner" intended to go across the top of a page.
        It doesn't fit for this small section so it's only demoed on the TNG page.
      </p>
      <p>And finally there is my favorite, the "tng-border-wrapper" which surrounds this
        section! It takes props allowing you to place the borders on any side
        and add "accent" pieces with carved out sections. This panel uses an accent on the bottom.
      </p>
      <p>All components can use 8 trek-panel colors and you can use a free
        <a href="https://www.st-minutiae.com/resources/fonts/index.html" target="_blank" class="trek-link">trek font</a>
        I found online. I'm not using it here because it's actually pretty rough on the eyes.
      </p>
      <p>I spent a lot more time than I should have working on the component api, making it
        composable and adjustable, since it will likely <i>never</i> be used outside of this writeup
        and the main page. And yes, I know the title is off center. My research showed that in the
        future we will not have centered buttons, text will always be left or right justified.
      </p>
      </tng-border-wrap-around>
    </div>

    <div class="spacer"></div>

    <h1 class="fail">Failed Projects</h1>
    <h3 class="hades-button">Hades Buttons</h3>
    <p>My attempt to make animated SVG button borders that support any sized content.
      I consider it a failure since (as far as I know) you MUST use javascript to find the
      element's size for setting the size and shape of the border. None of the CSS and SVG
      percentage based calculations I tried were able to support large, small, and oblong shapes.
      I was so disappointed that after I had an MVP I moved on without styling more or making
      all button behavior work.
    </p>
    <p>Quite a while later I found a few
      <a href="https://web.dev/css-border-animations/" target="_blank">blogs</a>
      showing animated borders demos with only CSS. Not 100% what I wanted but close enough!
      I tried to get it working but, again, could not get one-size-fits-all figured out. The demos
      I followed relied on having known dimensions. Testing with various sizes, the borders moved
      around the wrong axis or left gaps or were so big only one color would appear. Even with the
      tutorial's techniques I would need to use javascript to make it work for all sizes.
      If I needed to do something like this for work I would probably make a gif of the
      border so I could just wrap that around an element and have it stretch to any size needed.
    </p>

    <h3 class="sandboxes">Sandboxes</h3>
    <p>With the Hades Button I forced myself to get something resembling my intended result on
      screen. Sandboxes - not at all. I found a blog demonstrating how to make a sand physics toy
      with js that looked fun. I made a page for it here with the intent to get coding on it the
      next day. The author made the tutorial agnostic of any graphics library, which seemed like
      a plus at first. But when I went to try to implement it from the walk through it turned
      out to be a 'rest of the f---ing owl' situation. "Make the sand by making sand. Add
      physics with the physics and make sand fall on click." I abandoned the project and decided
      to remove the page later.
    </p>
    <p>'Sandboxes' remains as a published example of one of the many, many projects I left
      incomplete or never started. It wasn't all a loss, one thing I learned was a
      way to quickly access points on a 2D graph by flattening them into a single array.
      That will come in handy next time I use the unicorn hat on my Raspberry Pi.
    </p>

    <div class="spacer"></div>
    <h3>Zach Kusz</h3>
    <h4><a href="https://github.com/z-s-kusz" target="_blank">github.com/z-s-kusz</a></h4>
    <h4>
      <a href="https://trello.com/b/oGoAIsZA/sas-js" target="_blank">sas.js Trello Board</a>
    </h4>
  </main>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorGolfTitle from '@/components/color-golf/ColorGolfTitle.vue';
import PaletteHelper from '@/services/palette-helper';
import TngButton from '@/components/tng-panel/TngButton.vue';
import TngBorderWrapAround from '@/components/tng-panel/TngBorderWrapAround.vue';

export default Vue.extend({
  name: 'About',
  components: {
    ColorGolfTitle,
    TngButton,
    TngBorderWrapAround,
  },
  computed: {
    poetryStyle() {
      return {
        color: PaletteHelper.store.colors[1],
        'background-color': PaletteHelper.store.colors[2],
      };
    },
    poetryEm() {
      return {
        color: PaletteHelper.store.colors[1],
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.container {
  max-width: 70%;
  background-color: #272727;
  border-radius: 10px;
  padding: 36px;
  padding-top: 18px;
  margin: 12px;
}
@media only screen and (max-width: 899px) {
  .container {
    max-width: 85%;
    padding-right: 18px;
    padding-left: 18px;
  }
}
.spacer {
  border-bottom: 2px solid #f9f7f786;
  margin: 36px;
}
p {
  text-align: start;
  text-indent: 2em;
  &:last-of-type {
    margin-bottom: 42px;
  }
}
li {
  text-align: start;
}
h3, h4 {
  margin-bottom: 0;
}
.main-theme {
  color: $vue-green;
}
.poetry {
  border-radius: 8px;
}
.folk-primary {
  color: rgb(201, 72, 91);
}
.folk-secondary {
  color: rgb(232, 157, 162);
}
.mgs1 {
  color: rgb(0, 162, 255);
}
.z468 {
  background-color: black;
  color: #4DB7C2;
}

.color-stack {
  background: linear-gradient(
    25deg,
    hsl(70.74, 100%, 62.75%) 25%,
    hsl(2.9, 62.77%, 54.71%) 60%
    );
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.trek-main {
  height: 22rem;

  @media only screen and (max-width: 899px) {
    height: 30rem;
  }

  margin-top: 0.5rem;

  p {
    padding: 0 1rem;
  }
}
.trek-button {
  height: 3rem;
  width: 18rem;
  margin-right: auto;
  margin-left: auto;
}
.trek-link {
  color: rgb(232, 141, 52)
}

.fail {
  color: #cd2525;
}
.hades-button {
  position: relative;
  z-index: 0;
  width: 175px;
  height: 30px;
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
  margin-right: auto;
  margin-left: auto;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -6%;
    top: -145%;
    width: 120%;
    height: 430%;
    background-color: #aeaa7d;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image:
      linear-gradient(#a7dc66, #a7dc66),
      linear-gradient(#f1f3b2, #f1f3b2),
      linear-gradient(#e0c1e1, #e0c1e1),
      linear-gradient(#5dd9cf, #5dd9cf);
    animation: rotate 4s linear infinite;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: rgb(0, 0, 0);
    border-radius: 5px;
  }
}
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.sandboxes {
  background-image: linear-gradient(#645e08, #f1ad1a);
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
