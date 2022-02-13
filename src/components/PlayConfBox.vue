<template>
  <div class="play-conf-box">
    <v-card-text>
      <v-row class="mb-2 mt-1" justify="space-between">
        <v-col class="text-left pb-1 pt-1">
          <span class="text-overline">Chord change interval</span>
        </v-col>
      </v-row>

      <v-row class="mb-1 mt-3" justify="space-between">
        <v-col class="pb-1 pt-3">
          <v-slider
            v-model="interval"
            :color="color"
            track-color="grey"
            always-dirty
            thumb-label="always"
            :thumb-size="28"
            :thumb-color="thumbcolor"
            min="1"
            max="60"
          >
            <template v-slot:thumb-label="{ value }"> {{ value }}s </template>

            <template v-slot:prepend>
              <v-icon :color="color" @click="decrement"> mdi-minus </v-icon>
            </template>

            <template v-slot:append>
              <v-icon :color="color" @click="increment"> mdi-plus </v-icon>
            </template>
          </v-slider>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "PlayConfBox",
  emits: ["change-chord", "update-chord-change-interval"],
  mounted: function () {
    this.$nextTick(function () {
      this.change_scheduler = setInterval(this.change_chord_task, 200);
    });
  },
  props: ["init_chord_change_interval"],
  data: function () {
    return {
      interval: this.init_chord_change_interval,
      change_scheduler: undefined,
      last_chord_change_ts: undefined,
    };
  },
  watch: {
    interval(val) {
      this.$emit("update-chord-change-interval", val);
    },
  },
  computed: {
    color() {
      return "indigo";
    },
    thumbcolor() {
      return "#3E497A";
    },
  },
  methods: {
    change_chord_task() {
      let cur_time = Date.now();

      let early =
        this.last_chord_change_ts != undefined &&
        cur_time - this.last_chord_change_ts < this.interval * 1000;

      if (early) {
        return;
      }

      this.change_chord();
      this.last_chord_change_ts = cur_time;
    },
    change_chord() {
      this.$emit("change-chord");
    },
    decrement() {
      this.interval--;
    },
    increment() {
      this.interval++;
    },
  },
};
</script>

<style lang="scss" scoped>
.play-conf-box {
  grid-area: conf2;
}
</style>