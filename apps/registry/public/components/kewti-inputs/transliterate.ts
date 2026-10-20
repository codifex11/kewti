/**
 * Kewti Components - Amharic Phonetic Transliteration Engine
 * Converts Latin / SERA phonetic input into Ethiopic / Ge'ez Fidel script:
 * - 8-order Abugida support including labialized glyphs (ዲቃላ ፊደላት: ኳ, ቋ, ጓ, etc.)
 * - Multi-character lookahead digraph tokenization (sh, ch, ts, ny, gn, zh, kh, ph, hh)
 * - Syllable break escape hatch (' or _) to prevent digraph merging (e.g. s'h -> ስሀ)
 * - Safe capitalization handling for names and sentence starts (e.g. Selam -> ሰላም)
 * - Consonant gemination merging for English double letters (e.g. Addis -> አዲስ, Tadesse -> ታደሰ)
 * - Bounded homophone suggestions across the word token (capped at 7 options)
 */

export const abugida: Record<string, string[]> = {
  ሀ: ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ", "ኋ"],
  ለ: ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ", "ሏ"],
  ሐ: ["ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ", "ሗ"],
  መ: ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ", "ሟ"],
  ሠ: ["ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ", "ሧ"],
  ረ: ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ", "ሯ"],
  ሰ: ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ", "ሷ"],
  ሸ: ["ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ", "ሿ"],
  ቀ: ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ", "ቋ"],
  በ: ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ", "ቧ"],
  ተ: ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ", "ቷ"],
  ቸ: ["ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ", "ቿ"],
  ኅ: ["ኅ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ", "ኋ"],
  ነ: ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ", "ኗ"],
  ኘ: ["ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ", "ኟ"],
  አ: ["አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ"],
  ከ: ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ", "ኳ"],
  ኸ: ["ኸ", "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ", "ዃ"],
  ወ: ["ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ"],
  ዐ: ["ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ"],
  ዘ: ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ", "ዟ"],
  ዠ: ["ዠ", "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ", "ዧ"],
  የ: ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"],
  ደ: ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ", "ዷ"],
  ጀ: ["ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ", "ጇ"],
  ገ: ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ", "ጓ"],
  ጠ: ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ", "ጧ"],
  ጨ: ["ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ", "ጯ"],
  ጰ: ["ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ", "ጷ"],
  ጸ: ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ", "ጿ"],
  ፀ: ["ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ", "ፇ"],
  ፈ: ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ", "ፏ"],
  ፐ: ["ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ", "ፗ"],
  ቨ: ["ቨ", "ቩ", "ቪ", "ቫ", "ቬ", "ቭ", "ቮ", "ቯ"],
  "።": ["።"],
  "፣": ["፣"],
  "፤": ["፤"],
  "፥": ["፥"],
  "፧": ["፧"],
}

export const PUNCTUATION: Record<string, string> = {
  ".": "።",
  ",": "፣",
  ";": "፤",
  ":": "፥",
}

export const same: Record<string, string[]> = {
  ሀ: ["ሐ", "ኀ", "ኸ"],
  ሐ: ["ኅ", "ሀ", "ኀ"],
  ኀ: ["ሐ", "ሀ"],
  ሰ: ["ሠ", "ሸ"],
  ሠ: ["ሰ"],
  ፀ: ["ጸ"],
  ጸ: ["ፀ"],
  አ: ["ዐ"],
  ዐ: ["አ"],
  ተ: ["ጠ"],
  ጠ: ["ተ"],
  ቸ: ["ጨ"],
  ጨ: ["ቸ"],
  ፐ: ["ጰ"],
  ጰ: ["ፐ"],
}

export interface ConsonantRule {
  root: string
  alts: string[]
}

// Digraph and compound consonant rules
export const DIGRAPH_RULES: Record<string, ConsonantRule> = {
  sh: { root: "ሸ", alts: ["ሰ"] },
  Sh: { root: "ሸ", alts: ["ሰ"] },
  SH: { root: "ሸ", alts: ["ሰ"] },
  ch: { root: "ቸ", alts: ["ጨ"] },
  Ch: { root: "ቸ", alts: ["ጨ"] },
  CH: { root: "ጨ", alts: ["ቸ"] },
  zh: { root: "ዠ", alts: ["ዘ"] },
  Zh: { root: "ዠ", alts: ["ዘ"] },
  ny: { root: "ኘ", alts: ["ነ"] },
  Ny: { root: "ኘ", alts: ["ነ"] },
  gn: { root: "ኘ", alts: ["ነ"] },
  Gn: { root: "ኘ", alts: ["ነ"] },
  ts: { root: "ጸ", alts: ["ፀ"] },
  Ts: { root: "ጸ", alts: ["ፀ"] },
  tz: { root: "ጸ", alts: ["ፀ"] },
  TS: { root: "ፀ", alts: ["ጸ"] },
  kh: { root: "ኸ", alts: ["ከ"] },
  Kh: { root: "ኸ", alts: ["ከ"] },
  ph: { root: "ጰ", alts: ["ፐ"] },
  Ph: { root: "ጰ", alts: ["ፐ"] },
  hh: { root: "ሐ", alts: ["ኀ", "ሀ"] },
  Hh: { root: "ሐ", alts: ["ኀ", "ሀ"] },
}

// Single consonant rules
export const SINGLE_CONSONANT_RULES: Record<string, ConsonantRule> = {
  b: { root: "በ", alts: [] },
  B: { root: "በ", alts: [] },
  c: { root: "ቸ", alts: ["ጨ"] },
  d: { root: "ደ", alts: [] },
  D: { root: "ደ", alts: [] },
  f: { root: "ፈ", alts: [] },
  F: { root: "ፈ", alts: [] },
  g: { root: "ገ", alts: [] },
  G: { root: "ገ", alts: [] },
  h: { root: "ሀ", alts: ["ሐ", "ኀ", "ኸ"] },
  j: { root: "ጀ", alts: [] },
  J: { root: "ጀ", alts: [] },
  k: { root: "ከ", alts: ["ቀ", "ኸ"] },
  l: { root: "ለ", alts: [] },
  L: { root: "ለ", alts: [] },
  m: { root: "መ", alts: [] },
  M: { root: "መ", alts: [] },
  n: { root: "ነ", alts: ["ኘ"] },
  p: { root: "ፐ", alts: ["ጰ"] },
  q: { root: "ቀ", alts: [] },
  r: { root: "ረ", alts: [] },
  R: { root: "ረ", alts: [] },
  s: { root: "ሰ", alts: ["ሠ", "ሸ"] },
  t: { root: "ተ", alts: ["ጠ"] },
  v: { root: "ቨ", alts: [] },
  V: { root: "ቨ", alts: [] },
  w: { root: "ወ", alts: [] },
  W: { root: "ወ", alts: [] },
  y: { root: "የ", alts: [] },
  Y: { root: "የ", alts: [] },
  z: { root: "ዘ", alts: ["ዠ"] },
  x: { root: "አ", alts: ["ዐ"] },
  X: { root: "አ", alts: ["ዐ"] },

  // Word-initial capital letters default to standard base consonants to preserve
  // proper names and auto-capitalized sentence starts (e.g., Selam -> ሰላም, Tadesse -> ታደሰ).
  // Mid-word capitals evaluate to SERA emphatics in parseSyllables.
  S: { root: "ሰ", alts: ["ጸ", "ሠ", "ፀ"] },
  T: { root: "ተ", alts: ["ጠ"] },
  H: { root: "ሀ", alts: ["ሐ", "ኀ", "ኸ"] },
  C: { root: "ቸ", alts: ["ጨ"] },
  P: { root: "ፐ", alts: ["ጰ"] },
  N: { root: "ነ", alts: ["ኘ"] },
  Z: { root: "ዘ", alts: ["ዠ"] },
  K: { root: "ከ", alts: ["ኸ", "ቀ"] },
  Q: { root: "ቀ", alts: [] },
}

// Mid-word SERA emphatic consonants
export const MIDWORD_EMPHATIC_RULES: Record<string, ConsonantRule> = {
  T: { root: "ጠ", alts: ["ተ"] },
  C: { root: "ጨ", alts: ["ቸ"] },
  P: { root: "ጰ", alts: ["ፐ"] },
  S: { root: "ጸ", alts: ["ሠ", "ፀ"] },
  H: { root: "ሐ", alts: ["ኀ", "ሀ"] },
  N: { root: "ኘ", alts: ["ነ"] },
  Z: { root: "ዠ", alts: ["ዘ"] },
  K: { root: "ኸ", alts: ["ከ"] },
}

export const VOWEL_RULES: [string, number][] = [
  ["wa", 7],
  ["ee", 4],
  ["ie", 4],
  ["aa", 3],
  ["oo", 1],
  ["a", 3],
  ["u", 1],
  ["i", 2],
  ["o", 6],
  ["e", 0],
]

export const STANDALONE_VOWELS: [
  string,
  { root: string; order: number; alts?: [string, number][] }
][] = [
  ["aa", { root: "አ", order: 3, alts: [["ዐ", 3]] }],
  ["ee", { root: "አ", order: 4, alts: [["ዐ", 4]] }],
  ["ie", { root: "አ", order: 4, alts: [["ዐ", 4]] }],
  ["oo", { root: "አ", order: 6, alts: [["ዐ", 6]] }],
  ["a", { root: "አ", order: 0, alts: [["ዐ", 0], ["አ", 3], ["ዐ", 3]] }],
  ["u", { root: "አ", order: 1, alts: [["ዐ", 1]] }],
  ["i", { root: "አ", order: 2, alts: [["ዐ", 2]] }],
  ["e", { root: "አ", order: 5, alts: [["አ", 0], ["አ", 4], ["ዐ", 5]] }],
  ["o", { root: "አ", order: 6, alts: [["ዐ", 6]] }],
  ["A", { root: "ዐ", order: 0, alts: [["አ", 0], ["ዐ", 3]] }],
  ["E", { root: "አ", order: 4, alts: [["ዐ", 4]] }],
  ["I", { root: "አ", order: 2, alts: [["ዐ", 2]] }],
  ["O", { root: "አ", order: 6, alts: [["ዐ", 6]] }],
  ["U", { root: "አ", order: 1, alts: [["ዐ", 1]] }],
]

export const SPECIAL_WORDS: Record<string, string[]> = {
  selam: ["ሰላም", "ሠላም"],
  sheger: ["ሸገር"],
  chaw: ["ቻው"],
  buna: ["ቡና"],
  ethiopia: ["ኢትዮጵያ"],
  ityopya: ["ኢትዮጵያ"],
  kaleb: ["ካሌብ", "ካለብ"],
  tsehay: ["ፀሐይ", "ጸሀይ", "ፀሃይ"],
  sehay: ["ፀሐይ", "ጸሀይ", "ሰሃይ"],
  alem: ["ዓለም", "አለም"],
  kwan: ["ቋን", "ኳን"],
  kwankwa: ["ቋንቋ", "ኳንኳ"],
  qwankwa: ["ቋንቋ"],
  ameseginalehu: ["አመሰግናለሁ", "አመሰግናለው", "ዐመሰግናለሁ"],
  amesegnalo: ["አመሰግናለሁ"],
  gobez: ["ጎበዝ"],
  bet: ["ቤት", "በት"],
  beet: ["ቤት"],
  biet: ["ቤት"],
  debre: ["ደብረ", "ደብሬ"],
  woreda: ["ወረዳ", "ዎረዳ"],
  wereda: ["ወረዳ"],
  kebele: ["ቀበሌ", "ከበሌ"],
  qebele: ["ቀበሌ"],
  addis: ["አዲስ", "ዐዲስ"],
  adis: ["አዲስ", "ዐዲስ"],
  ababa: ["አበባ", "አባባ"],
  habesha: ["ሐበሻ", "ሀበሻ"],
  tena: ["ጤና", "ጠና"],
  tenayistillign: ["ጤናይስጥልኝ", "ጤና ይስጥልኝ"],
  oromia: ["ኦሮሚያ", "ኦሮሚአ"],
  amhara: ["አማራ", "አምሐራ"],
  tigray: ["ትግራይ"],
  konjo: ["ቆንጆ", "ኮንጆ"],
  qonjo: ["ቆንጆ"],
  injera: ["እንጀራ"],
  enjera: ["እንጀራ"],
  tiru: ["ጥሩ", "ቲሩ"],
  Tiru: ["ጥሩ"],
  dabo: ["ዳቦ"],
  doro: ["ዶሮ"],
  berbere: ["በርበሬ"],
  shinte: ["ሽንት"],
  wetet: ["ወተት"],
  siga: ["ስጋ", "ሥጋ"],
  shiro: ["ሽሮ"],
  teff: ["ጤፍ"],
  tibs: ["ጥብስ"],
  kitfo: ["ክትፎ"],
  genfo: ["ገንፎ"],
  firfir: ["ፍርፍር"],
  ayib: ["አይብ"],
  birr: ["ብር"],
  santim: ["ሳንቲም"],
  telebirr: ["ቴሌብር"],
  cbe: ["ሲቢኢ"],
  chapa: ["ቻፓ"],
  tesfaye: ["ተስፋዬ", "ተስፋየ"],
}

export interface ParsedSyllable {
  primary: string
  alts: string[]
  isConsonant?: boolean
  root?: string
  hasExplicitVowel?: boolean
}

/**
 * Tokenizes Latin syllables into Ethiopic Fidel syllables.
 * Exported to allow direct testing with SPECIAL_WORDS bypassed.
 */
export function parseSyllables(text: string): ParsedSyllable[] {
  const syllables: ParsedSyllable[] = []
  let i = 0
  let hasEscapeBreak = false

  while (i < text.length) {
    // 1. Syllable break / escape hatch (apostrophe or underscore, e.g. s'h -> ስሀ, s'se -> ስሰ)
    if (text[i] === "'" || text[i] === "_") {
      hasEscapeBreak = true
      i += 1
      continue
    }

    // 2. Check for Punctuation (., ,, ;, :, ? -> Ethiopic punctuation matching main)
    if (text[i]! in PUNCTUATION) {
      syllables.push({ primary: PUNCTUATION[text[i]!]!, alts: [] })
      i += 1
      continue
    }

    // 3. Check for Consonant (first 2-char digraphs, then single chars)
    let matchedConsonantKey: string | null = null
    let matchedConsonantRule: ConsonantRule | null = null

    if (i + 2 <= text.length && text.slice(i, i + 2) in DIGRAPH_RULES) {
      matchedConsonantKey = text.slice(i, i + 2)
      if (matchedConsonantKey === "Ch") {
        if (i === 0) {
          // Word-initial Ch maps to base ቸ (same as ch), with ጨ in suggestions
          matchedConsonantRule = { root: "ቸ", alts: ["ጨ"] }
        } else {
          // Mid-word Ch keeps SERA emphatic ጨ
          matchedConsonantRule = { root: "ጨ", alts: ["ቸ"] }
        }
      } else {
        matchedConsonantRule = DIGRAPH_RULES[matchedConsonantKey]!
      }
    } else if (text[i]! in SINGLE_CONSONANT_RULES) {
      matchedConsonantKey = text[i]!
      // If mid-word, check for SERA emphatic override;
      // at word-start, use base consonant rule to protect capitalized names and initial capitals (e.g. Selam -> ሰላም, Tadesse -> ታደሰ, Twa -> ቷ).
      if (i > 0 && matchedConsonantKey in MIDWORD_EMPHATIC_RULES) {
        matchedConsonantRule = MIDWORD_EMPHATIC_RULES[matchedConsonantKey]!
      } else {
        matchedConsonantRule = SINGLE_CONSONANT_RULES[matchedConsonantKey]!
      }
    }

    if (matchedConsonantRule) {
      i += matchedConsonantKey!.length

      // Check following vowel
      let matchedOrder = 5 // default 6th order (ሳድስ) when standalone/no vowel follows
      let matchedVowelLen = 0

      for (const [vKey, order] of VOWEL_RULES) {
        if (text.slice(i, i + vKey.length).toLowerCase() === vKey) {
          const rootForms = abugida[matchedConsonantRule.root]
          // If rule is for 8th-order labialized ("wa") but consonant has no 8th-order glyph in abugida, do not match it
          if (
            order === 7 &&
            (!rootForms || rootForms.length <= 7 || !rootForms[7])
          ) {
            continue
          }
          matchedOrder = order
          matchedVowelLen = vKey.length
          break
        }
      }

      i += matchedVowelLen

      const root = matchedConsonantRule.root
      const forms = abugida[root] || []
      const primaryChar = forms[matchedOrder] || root

      // Build alternatives
      const altChars: string[] = []
      for (const altRoot of matchedConsonantRule.alts) {
        const altForms = abugida[altRoot]
        if (altForms && altForms[matchedOrder]) {
          altChars.push(altForms[matchedOrder]!)
        }
      }

      // If standalone consonant with no vowel, also offer 1st order in alts (e.g. s -> ስ, ሰ, ሸ)
      if (matchedVowelLen === 0) {
        if (forms[0]) altChars.push(forms[0])
        for (const altRoot of matchedConsonantRule.alts) {
          const altForms = abugida[altRoot]
          if (altForms && altForms[0] && !altChars.includes(altForms[0])) {
            altChars.push(altForms[0])
          }
        }
      }

      // If vowel was 'e' (1st order), also offer 5th order in alts (e.g. bet -> በት, ቤት)
      if (
        matchedVowelLen === 1 &&
        text.slice(i - 1, i).toLowerCase() === "e" &&
        forms[4]
      ) {
        altChars.push(forms[4])
      }

      // Consonant gemination absorption:
      // In English transliteration, double consonants (e.g. 'dd' in Addis, 'ss' in Tadesse)
      // represent Amharic gemination (ማጥበቅ), not separate letters.
      // If the preceding syllable was a standalone consonant of the same root, merge them.
      // Does not merge across an explicit escape hatch (' or _) and excludes glides with no labialized form (wwa -> ውዋ).
      const prev = syllables[syllables.length - 1]
      if (
        !hasEscapeBreak &&
        prev &&
        prev.isConsonant &&
        prev.root === root &&
        root !== "ወ" &&
        !prev.hasExplicitVowel &&
        matchedVowelLen > 0
      ) {
        syllables[syllables.length - 1] = {
          primary: primaryChar,
          alts: altChars,
          isConsonant: true,
          root,
          hasExplicitVowel: true,
        }
        hasEscapeBreak = false
        continue
      }
      hasEscapeBreak = false

      syllables.push({
        primary: primaryChar,
        alts: altChars,
        isConsonant: true,
        root,
        hasExplicitVowel: matchedVowelLen > 0,
      })
      continue
    }

    // 3. Check for Standalone Vowel
    let matchedVowel: (typeof STANDALONE_VOWELS)[number][1] | null = null
    let matchedVLen = 0

    for (const [vKey, def] of STANDALONE_VOWELS) {
      if (
        text.slice(i, i + vKey.length) === vKey ||
        (vKey.length === 1 && text[i] === vKey)
      ) {
        matchedVowel = def
        matchedVLen = vKey.length
        break
      }
    }

    if (matchedVowel) {
      i += matchedVLen
      const forms = abugida[matchedVowel.root] || []
      const primary = forms[matchedVowel.order] || matchedVowel.root
      const alts: string[] = []

      if (matchedVowel.alts) {
        for (const [altRoot, altOrder] of matchedVowel.alts) {
          const aForms = abugida[altRoot]
          if (aForms && aForms[altOrder]) {
            alts.push(aForms[altOrder]!)
          }
        }
      }

      syllables.push({ primary, alts, isConsonant: false })
      continue
    }

    // 4. Fallback: preserve punctuation, numbers, spaces, and existing Ge'ez characters as ASCII
    syllables.push({ primary: text[i]!, alts: [] })
    i += 1
  }

  return syllables
}

/**
 * Main transliteration function for Kewti.
 * Returns an array of transliteration options, with the most likely match at index 0.
 */
export function transliterate(text: string): string[] {
  if (!text) return []

  const clean = text.trim()

  // 1. All-caps words: treat a fully uppercase word as Caps Lock (lowercase it)
  // while preserving SERA emphatics for mixed case (e.g. aTe -> አጠ)
  const isAllCaps = !/[a-z]/.test(clean) && /[A-Z]/.test(clean)
  const effectiveText = isAllCaps ? clean.toLowerCase() : clean

  const lower = effectiveText.toLowerCase()

  // 2. Direct word-level dictionary match for cultural vocabulary
  if (lower in SPECIAL_WORDS) {
    return SPECIAL_WORDS[lower]!
  }

  // 3. Parse into syllables
  const syllables = parseSyllables(effectiveText)
  if (syllables.length === 0) return [text]

  const primaryWord = syllables.map((s) => s.primary).join("")
  const results: string[] = [primaryWord]

  // 3. Bounded permutation generation across syllables with alternatives (capped at 7)
  for (let idx = syllables.length - 1; idx >= 0; idx--) {
    const s = syllables[idx]!
    for (const alt of s.alts) {
      const variant = syllables
        .map((syl, i) => (i === idx ? alt : syl.primary))
        .join("")
      if (!results.includes(variant)) {
        results.push(variant)
      }
      if (results.length >= 7) break
    }
    if (results.length >= 7) break
  }

  return results
}
