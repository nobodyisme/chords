<template>
  <div class="chords-conf-box">
    <v-card-text>
      <v-row class="mb-1 mt-1" justify="space-between">
        <v-col class="text-left pb-1 pt-1">
          <span class="text-overline">Triads</span>
          <v-chip-group
            multiple
            column
            active-class="primary--text"
            v-model="selected_triads"
            @change="updateChordTypes"
          >
            <v-chip
              v-for="triad in chord_types.triads"
              :key="triad.id"
              :value="triad.id"
              filter
              small
              filter-icon="mdi-check-bold"
            >
              {{ triad.label }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row class="mb-1 mt-1" justify="space-between">
        <v-col class="pb-1 pt-1">
          <span class="text-overline">Sevenths</span>
          <v-chip-group
            multiple
            column
            active-class="primary--text"
            v-model="selected_sevenths"
            @change="updateChordTypes"
          >
            <v-chip
              v-for="seventh in chord_types.sevenths"
              :key="seventh.id"
              :value="seventh.id"
              filter
              small
              filter-icon="mdi-check-bold"
            >
              {{ seventh.label }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row class="mb-1 mt-1" justify="space-between">
        <v-col class="pb-1 pt-1">
          <span class="text-overline">Options</span>
          <v-chip-group
            multiple
            column
            active-class="primary--text"
            v-model="selected_options"
            @change="updateChordTypes"
          >
            <v-chip
              filter
              small
              :value="inversions_id"
              filter-icon="mdi-check-bold"
            >
              inversions
            </v-chip>

            <v-chip
              filter
              small
              :value="enharmonic_notes_chords_id"
              filter-icon="mdi-check-bold"
            >
              enharmonic notes chords
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
import { chord_type_ids } from "../chords";

export default {
  name: "ChordsSelector",
  methods: {
    updateChordTypes: function () {
      let chord_type_ids = [];
      for (let name in this.chord_types) {
        for (let chord_type of this.chord_types[name])
          if (chord_type.selected) {
            chord_type_ids.push(chord_type.id);
          }
      }
      this.$emit(
        "chords-setup",
        chord_type_ids,
        this.inversions,
        this.enharmonic_notes_chords
      );
    },
    getSelectedChordTypes(chord_family) {
      let res = [];
      for (let chord_type of chord_family) {
        if (chord_type.selected) {
          res.push(chord_type.id);
        }
      }
      return res;
    },
    setSelectedChordTypes(chord_family, chord_type_ids) {
      let selected = {};
      for (let cti of chord_type_ids) {
        selected[cti] = true;
      }

      for (let chord_type of chord_family) {
        let exp_value = selected[chord_type.id] === true;
        if (chord_type.selected != exp_value) {
          chord_type.selected = exp_value;
        }
      }
    },
  },
  props: [
    "init_chord_types",
    "init_inversions",
    "init_enharmonic_notes_chords",
  ],
  mounted: function () {
    this.$nextTick(function () {
      for (let name in this.chord_types) {
        for (let chord_type of this.chord_types[name])
          if (this.init_chord_types.indexOf(chord_type.id) != -1) {
            chord_type.selected = true;
          }
      }
      this.inversions = this.init_inversions;
      this.enharmonic_notes_chords = this.init_enharmonic_notes_chords;
    });
  },
  data: function () {
    return {
      inversions_id: "inversions",
      enharmonic_notes_chords_id: "enharmonic_notes_chords",
      inversions: false,
      enharmonic_notes_chords: false,
      chord_types: {
        triads: [
          { id: chord_type_ids.major_triad, label: "M", selected: false },
          { id: chord_type_ids.minor_triad, label: "m", selected: false },
          { id: chord_type_ids.diminished_triad, label: "o", selected: false },
          { id: chord_type_ids.augmented_triad, label: "+", selected: false },
        ],
        sevenths: [
          { id: chord_type_ids.major_seventh, label: "M7", selected: false },
          { id: chord_type_ids.minor_seventh, label: "m7", selected: false },
          { id: chord_type_ids.dominant_seventh, label: "7", selected: false },
          {
            id: chord_type_ids.diminished_seventh,
            label: "o7",
            selected: false,
          },
          {
            id: chord_type_ids.half_diminished_seventh,
            label: "ø7",
            selected: false,
          },
          {
            id: chord_type_ids.minor_major_seventh,
            label: "mM7",
            selected: false,
          },
          {
            id: chord_type_ids.augmented_seventh,
            label: "+7",
            selected: false,
          },
          {
            id: chord_type_ids.augmented_major_seventh,
            label: "+M7",
            selected: false,
          },
        ],
      },
    };
  },
  computed: {
    selected_triads: {
      get: function () {
        return this.getSelectedChordTypes(this.chord_types.triads);
      },
      set: function (selected) {
        return this.setSelectedChordTypes(this.chord_types.triads, selected);
      },
    },

    selected_sevenths: {
      get: function () {
        return this.getSelectedChordTypes(this.chord_types.sevenths);
      },
      set: function (selected) {
        return this.setSelectedChordTypes(this.chord_types.sevenths, selected);
      },
    },

    selected_options: {
      get: function () {
        let options = [];
        if (this.inversions) {
          options.push(this.inversions_id);
        }
        if (this.enharmonic_notes_chords) {
          options.push(this.enharmonic_notes_chords_id);
        }
        return options;
      },
      set: function (selected) {
        // toggle inversions
        let found = selected.indexOf(this.inversions_id) != -1;
        if (found && !this.inversions) {
          this.inversions = true;
        } else if (!found && this.inversions) {
          this.inversions = false;
        }

        // toggle enharmonic notes chords
        found = selected.indexOf(this.enharmonic_notes_chords_id) != -1;
        if (found && !this.enharmonic_notes_chords) {
          this.enharmonic_notes_chords = true;
        } else if (!found && this.enharmonic_notes_chords) {
          this.enharmonic_notes_chords = false;
        }
      },
    },
  },
};
</script>

<style lang="scss">
@use "~vuetify/src/components/VChip/variables";
@each $name, $size in variables.$icon-sizes {
  .v-chip.v-size--#{$name} .v-icon {
    font-size: #{map-get($size, "font-size") - 3}px;
    height: #{map-get($size, "font-size") - 3}px;
    width: #{map-get($size, "font-size") - 3}px;
  }
}

.chords-conf-box {
  grid-area: conf1;
}
</style>
