<template>
  <v-app>
    <div class="app">
      <play-box :chord="chord" />
      <chords-selector-box @chords-setup="onChordsSetup" />
      <play-conf-box @change-chord="onChangeChord" />
    </div>
  </v-app>
</template>

<script>
import PlayBox from "./components/PlayBox.vue";
import PlayConfBox from "./components/PlayConfBox.vue";
import ChordsSelectorBox from "./components/ChordsSelectorBox.vue";

export default {
  name: "App",

  components: {
    ChordsSelectorBox,
    PlayBox,
    PlayConfBox,
  },

  data: () => ({
    chord: "some chord",
    chord_types: [],
    inversions: false,
  }),

  methods: {
    onChangeChord() {
      let chords = ["A", "B", "C"];
      console.log("change chord");

      var index = Math.floor(Math.random() * chords.length);

      console.log("emitting");
      this.chord = chords[index];
    },
    onChordsSetup(chord_types, inversions) {
      console.log(chord_types);
      console.log(inversions);
      this.chord_types = chord_types;
      this.inversions = inversions;
    },
  },
};
</script>

<style scoped>
* {
  border: 0;
  margin: 0;
}

body {
  font-family: "Helvetica", "Arial", serif;
}

.app {
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-areas:
    "main"
    "conf1"
    "conf2";
}

@media (min-width: 1000px) {
  .app {
    grid-template-columns: auto 20rem;
    grid-template-areas:
      "main conf1"
      "main conf2";
  }
}
</style>