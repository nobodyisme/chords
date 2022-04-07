<template>
  <v-app>
    <div class="app">
      <play-box :chord="chord" />
      <chords-selector-box
        @chords-setup="onChordsSetup"
        :init_chord_types="chord_types"
        :init_inversions="inversions"
        :init_enharmonic_notes_chords="enharmonic_notes_chords"
      />
      <play-conf-box
        @change-chord="onChangeChord"
        @update-chord-change-interval="onUpdateChordChangeInterval"
        :init_chord_change_interval="chord_change_interval"
      />
    </div>
  </v-app>
</template>

<script>
import PlayBox from "./components/PlayBox.vue";
import PlayConfBox from "./components/PlayConfBox.vue";
import ChordsSelectorBox from "./components/ChordsSelectorBox.vue";

import { chord_type_ids, randomChord, renderChord } from "./chords";

export default {
  name: "App",

  components: {
    ChordsSelectorBox,
    PlayBox,
    PlayConfBox,
  },

  data: () => ({
    chord: "",
    chord_types: [],
    chord_change_interval: 5,
    inversions: false,
    enharmonic_notes_chords: false,
    current_chord: null,
  }),

  methods: {
    onChangeChord() {
      if (this.chord_types.length == 0) {
        return;
      }
      this.current_chord = randomChord(
        this.chord_types,
        this.current_chord,
        this.inversions,
        this.enharmonic_notes_chords
      );
      this.chord = renderChord(this.current_chord);
    },
    onUpdateChordChangeInterval(val) {
      localStorage.setItem("chord_change_interval", JSON.stringify(val));
    },
    onChordsSetup(chord_types, inversions, enharmonic_notes_chords) {
      this.chord_types = chord_types;
      this.inversions = inversions;
      this.enharmonic_notes_chords = enharmonic_notes_chords;
    },
    parseLocalStorageValue(key, default_val) {
      let raw_val = localStorage.getItem(key);
      if (raw_val == null) {
        return default_val;
      }
      let val = null;
      try {
        val = JSON.parse(raw_val);
      } catch (e) {
        console.warn(
          "unexpected value in localstorage for key '" + key + "', resetting"
        );
        localStorage.setItem(key, JSON.stringify(default_val));
        return default_val;
      }
      return val;
    },
  },

  watch: {
    chord_types(val) {
      localStorage.setItem("chord_types", JSON.stringify(val));
    },
    inversions(val) {
      localStorage.setItem("inversions", JSON.stringify(val));
    },
    enharmonic_notes_chords(val) {
      localStorage.setItem("enharmonic_notes_chords", JSON.stringify(val));
    },
  },

  created: function () {
    let default_chord_types = [
      chord_type_ids.major_triad,
      chord_type_ids.minor_triad,
    ];
    this.chord_types = this.parseLocalStorageValue(
      "chord_types",
      default_chord_types
    );
    if (this.chord_types.length == 0) {
      this.chord_types = default_chord_types;
    }
    this.inversions = this.parseLocalStorageValue("inversions", false);
    this.enharmonic_notes_chords = this.parseLocalStorageValue(
      "enharmonic_notes_chords",
      false
    );
    this.chord_change_interval = this.parseLocalStorageValue(
      "chord_change_interval",
      10
    );
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
  gap: 1rem;
}

@media (max-width: 1000px) {
  .app {
    grid-template-rows: auto 20rem;
    grid-template-areas:
      "main main"
      "conf1 conf2";
  }
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