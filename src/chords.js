const notes = {
  C: { s: "C", next: {} },
  D: { s: "D", next: {} },
  E: { s: "E", next: {} },
  F: { s: "F", next: {} },
  G: { s: "G", next: {} },
  A: { s: "A", next: {} },
  B: { s: "B", next: {} },
};

notes.C.next = { note: notes.D, distance: 2 /* semitones */ };
notes.D.next = { note: notes.E, distance: 2 /* semitones */ };
notes.E.next = { note: notes.F, distance: 1 /* semitones */ };
notes.F.next = { note: notes.G, distance: 2 /* semitones */ };
notes.G.next = { note: notes.A, distance: 2 /* semitones */ };
notes.A.next = { note: notes.B, distance: 2 /* semitones */ };
notes.B.next = { note: notes.C, distance: 1 /* semitones */ };

const accidentals = {
  doubleflat: { s: "♭♭", distance: -2 /* semitones */ },
  flat: { s: "♭", distance: -1 /* semitones */ },
  natural: { s: "", distance: 0 /* semitones */ },
  sharp: { s: "♯", distance: 1 /* semitones */ },
  doublesharp: { s: "𝄪", distance: 2 /* semitones */ },
};

const accidentalMap = {};
for (let idx in accidentals) {
  accidentalMap[accidentals[idx].distance] = accidentals[idx];
}

// eslint-disable-next-line no-unused-vars
function BuildChord(start_note, start_accidental, intervals) {
  let cur_degree = 1;
  let cur_distance = -start_accidental.distance;
  let cur_note = start_note;

  let chord = [];

  for (let interval of intervals) {
    while (cur_degree != interval.degree) {
      cur_distance += cur_note.next.distance;
      cur_degree += 1;
      cur_note = cur_note.next.note;
    }
    // output *note*
    let accidental = accidentalMap[interval.distance - cur_distance];
    if (accidental == undefined) {
      throw "Unsupported chord configuration: " + arguments;
    }
    chord.push({
      note: cur_note,
      accidental: accidental,
    });
  }

  return chord;
}

// eslint-disable-next-line no-unused-vars
function PrintChord(chord) {
  let notes = [];
  for (let n of chord) {
    notes.push(n.note.s + n.accidental.s);
  }
  return notes.join(" ");
}

const intervals = {
  P1: { distance: 0 /* semitones */, degree: 1 },
  d2: { distance: 0 /* semitones */, degree: 2 },

  A1: { distance: 1 /* semitones */, degree: 1 },
  m2: { distance: 1 /* semitones */, degree: 2 },

  M2: { distance: 2 /* semitones */, degree: 2 },
  d3: { distance: 2 /* semitones */, degree: 3 },

  A2: { distance: 3 /* semitones */, degree: 2 },
  m3: { distance: 3 /* semitones */, degree: 3 },

  M3: { distance: 4 /* semitones */, degree: 3 },
  d4: { distance: 4 /* semitones */, degree: 4 },

  A3: { distance: 5 /* semitones */, degree: 3 },
  P4: { distance: 5 /* semitones */, degree: 4 },

  A4: { distance: 6 /* semitones */, degree: 4 },
  d5: { distance: 6 /* semitones */, degree: 5 },

  P5: { distance: 7 /* semitones */, degree: 5 },
  d6: { distance: 7 /* semitones */, degree: 6 },

  A5: { distance: 8 /* semitones */, degree: 5 },
  m6: { distance: 8 /* semitones */, degree: 6 },

  M6: { distance: 9 /* semitones */, degree: 6 },
  d7: { distance: 9 /* semitones */, degree: 7 },

  A6: { distance: 10 /* semitones */, degree: 6 },
  m7: { distance: 10 /* semitones */, degree: 7 },

  M7: { distance: 11 /* semitones */, degree: 7 },
  d8: { distance: 11 /* semitones */, degree: 8 },

  A7: { distance: 12 /* semitones */, degree: 7 },
  P8: { distance: 12 /* semitones */, degree: 8 },

  // TODO: add intervals larger than one octave
};

export const chord_type_ids = {
  major_triad: "major_triad",
  minor_triad: "minor_triad",
  augmented_triad: "augmented_triad",
  diminished_triad: "diminished_triad",

  diminished_seventh: "diminished_seventh",
  half_diminished_seventh: "half_diminished_seventh",
  minor_seventh: "minor_seventh",
  minor_major_seventh: "minor_major_seventh",
  dominant_seventh: "dominant_seventh",
  major_seventh: "major_seventh",
  augmented_seventh: "augmented_seventh",
  augmented_major_seventh: "augmented_major_seventh",
}


// eslint-disable-next-line no-unused-vars
const chord_types = {
  // Triads
  [chord_type_ids.major_triad]: {
    s_variants: ["", "M", "Δ", "ma"],
    intervals: [intervals.P1, intervals.M3, intervals.P5],
  },
  [chord_type_ids.minor_triad]: {
    s_variants: ["m", "min", "-", "mi"],
    intervals: [intervals.P1, intervals.m3, intervals.P5],
  },
  [chord_type_ids.augmented_triad]: {
    s_variants: ["⁺", "+", "aug"],
    intervals: [intervals.P1, intervals.M3, intervals.A5],
  },
  [chord_type_ids.diminished_triad]: {
    // TODO: move to superscript (♭5)
    s_variants: ["ᵒ", "dim", "⁽ᵇ⁵⁾"],
    intervals: [intervals.P1, intervals.m3, intervals.d5],
  },

  // Seventh
  [chord_type_ids.diminished_seventh]: {
    s_variants: ["ᵒ⁷", "dim⁷"],
    intervals: [intervals.P1, intervals.m3, intervals.d5, intervals.d7],
  },
  [chord_type_ids.half_diminished_seventh]: {
    // TODO: change to superscript 'ø⁷'
    s_variants: ["ø⁷", "m⁷ᵇ⁵", "-⁽ᵇ⁵⁾"],
    intervals: [intervals.P1, intervals.m3, intervals.d5, intervals.m7],
  },
  [chord_type_ids.minor_seventh]: {
    s_variants: ["m⁷", "min⁷", "-⁷"],
    intervals: [intervals.P1, intervals.m3, intervals.P5, intervals.m7],
  },
  [chord_type_ids.minor_major_seventh]: {
    s_variants: ["mᴹ⁷", "mᵐᵃʲ⁷", "-⁽ʲ⁷⁾", "-ᐞ⁷", "-ᴹ⁷"],
    intervals: [intervals.P1, intervals.m3, intervals.P5, intervals.M7],
  },
  [chord_type_ids.dominant_seventh]: {
    s_variants: ["⁷", "dom⁷"],
    intervals: [intervals.P1, intervals.M3, intervals.P5, intervals.m7],
  },
  [chord_type_ids.major_seventh]: {
    s_variants: ["M⁷", "ᴹ⁷", "ᵐᵃʲ⁷", "ᐞ⁷", "ʲ⁷"],
    intervals: [intervals.P1, intervals.M3, intervals.P5, intervals.M7],
  },
  [chord_type_ids.augmented_seventh]: {
    // TODO: proper subscript ♯
    s_variants: ["+⁷", "aug⁷", "⁷⁺", "⁷⁺⁵", "⁷♯⁵"],
    intervals: [intervals.P1, intervals.M3, intervals.A5, intervals.m7],
  },
  [chord_type_ids.augmented_major_seventh]: {
    // TODO: proper subscript ♯
    s_variants: ["+ᴹ⁷", "ᴹ⁷⁺⁵", "ᴹ⁷♯⁵", "+ʲ⁷", "+ᐞ⁷"],
    intervals: [intervals.P1, intervals.M3, intervals.A5, intervals.M7],
  },
};