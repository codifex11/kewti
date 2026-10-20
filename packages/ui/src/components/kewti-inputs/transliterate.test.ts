import { describe, it, expect } from "vitest"
import { transliterate, parseSyllables, abugida } from "./transliterate"

describe("Amharic Phonetic Transliteration Engine", () => {
  describe("Basic & Edge Cases", () => {
    it("returns empty array for empty input", () => {
      expect(transliterate("")).toEqual([])
    })

    it("handles whitespace, numbers, and symbols gracefully as passthrough", () => {
      expect(transliterate(" ")).toEqual([" "])
      expect(transliterate("123")).toEqual(["123"])
      expect(transliterate("!")).toEqual(["!"])
    })

    it("preserves already typed Ethiopic characters", () => {
      expect(transliterate("ሰላም")).toContain("ሰላም")
    })
  })

  describe("Single Consonants and Vowel Orders", () => {
    it("transliterates standalone consonant to 6th order (ሳድስ) with 1st order in options", () => {
      const results = transliterate("s")
      expect(results[0]).toBe("ስ")
      expect(results).toContain("ሰ")
      expect(results).toContain("ሸ")
    })

    it("transliterates consonant + 'e' to 1st order (ግዕዝ)", () => {
      const results = transliterate("se")
      expect(results[0]).toBe("ሰ")
      expect(results).toContain("ሠ")
    })

    it("transliterates consonant + 'a' to 4th order (ራብዕ)", () => {
      expect(transliterate("sa")[0]).toBe("ሳ")
    })

    it("transliterates consonant + 'u' to 2nd order (ካዕብ)", () => {
      expect(transliterate("su")[0]).toBe("ሱ")
    })

    it("transliterates consonant + 'i' to 3rd order (ሣልስ)", () => {
      expect(transliterate("si")[0]).toBe("ሲ")
    })

    it("transliterates consonant + 'ee' or 'ie' to 5th order (ኃምስ)", () => {
      expect(transliterate("see")[0]).toBe("ሴ")
      expect(transliterate("sie")[0]).toBe("ሴ")
      expect(transliterate("bee")[0]).toBe("ቤ")
    })

    it("transliterates consonant + 'o' to 7th order (ሳብዕ)", () => {
      expect(transliterate("so")[0]).toBe("ሶ")
    })

    it("correctly produces 7th order for ገ as ጎ (not ጐ)", () => {
      expect(transliterate("go")[0]).toBe("ጎ")
    })
  })

  describe("Standalone Vowels", () => {
    it("transliterates standalone vowels to glottal-stop Fidel characters (a -> አ, u -> ኡ, i -> ኢ, e -> እ, o -> ኦ)", () => {
      expect(transliterate("a")[0]).toBe("አ")
      expect(transliterate("u")[0]).toBe("ኡ")
      expect(transliterate("i")[0]).toBe("ኢ")
      expect(transliterate("e")[0]).toBe("እ")
      expect(transliterate("e")).toContain("አ")
      expect(transliterate("o")[0]).toBe("ኦ")
      expect(transliterate("aa")[0]).toBe("ኣ")
      expect(transliterate("ee")[0]).toBe("ኤ")
      expect(transliterate("oo")[0]).toBe("ኦ")
    })
  })

  describe("Digraphs & Syllable Escape Hatch", () => {
    it("transliterates 'sh' to ሸ", () => {
      expect(transliterate("sh")[0]).toBe("ሽ")
      expect(transliterate("she")[0]).toBe("ሸ")
      expect(transliterate("sha")[0]).toBe("ሻ")
    })

    it("transliterates 'ch' to ቸ and word-initial 'Ch' to ቸ (with ጨ in suggestions), while Chwa keeps ጯ and mid-word C keeps ጨ", () => {
      // Lowercase ch maps to ቸ
      expect(transliterate("ch")[0]).toBe("ች")
      expect(transliterate("ch")).toContain("ጭ")
      expect(transliterate("che")[0]).toBe("ቸ")
      expect(transliterate("che")).toContain("ጨ")
      expect(transliterate("cha")[0]).toBe("ቻ")
      expect(transliterate("cha")).toContain("ጫ")

      // Word-initial Ch maps to ቸ (same as ch), with ጨ in suggestion list
      expect(transliterate("Ch")[0]).toBe("ች")
      expect(transliterate("Ch")).toContain("ጭ")
      expect(transliterate("Che")[0]).toBe("ቸ")
      expect(transliterate("Che")).toContain("ጨ")
      expect(transliterate("Cha")[0]).toBe("ቻ")
      expect(transliterate("Cha")).toContain("ጫ")

      // Word-initial Chwa follows initial-capital base rule (ቿ with ጯ in suggestions)
      expect(transliterate("Chwa")[0]).toBe("ቿ")
      expect(transliterate("Chwa")).toContain("ጯ")

      // Mid-word C and Chwa preserve emphatic ጨ / ጯ
      expect(transliterate("aCa")[0]).toBe("አጫ")
      expect(transliterate("aCa")).toContain("አቻ")
      expect(transliterate("aChwa")[0]).toBe("አጯ")
    })

    it("transliterates title-case digraphs Sh, Ts, Kh, Ph, Zh, Ny on non-dictionary words", () => {
      const tokenize = (input: string) =>
        parseSyllables(input).map((s) => s.primary).join("")
      expect(tokenize("Shano")).toBe("ሻኖ")
      expect(tokenize("Tsedal")).toBe("ጸዳል")
      expect(tokenize("Khartum")).toBe("ኻርቱም")
      expect(tokenize("Pha")).toBe("ጳ")
      expect(tokenize("Zhan")).toBe("ዣን")
      expect(tokenize("Nyala")).toBe("ኛላ")
    })

    it("transliterates 'zh', 'ny', 'gn', 'ts', 'kh', 'ph', 'hh'", () => {
      expect(transliterate("zhe")[0]).toBe("ዠ")
      expect(transliterate("nya")[0]).toBe("ኛ")
      expect(transliterate("gna")[0]).toBe("ኛ")
      expect(transliterate("tse")[0]).toBe("ጸ")
      expect(transliterate("kha")[0]).toBe("ኻ")
      expect(transliterate("pha")[0]).toBe("ጳ")
      expect(transliterate("hhe")[0]).toBe("ሐ")
    })

    it("supports escape hatch with apostrophe or underscore to prevent digraph merging (e.g. s'he -> ስሀ, s'h -> ስህ)", () => {
      const escaped1 = parseSyllables("s'h").map((s) => s.primary).join("")
      const escaped2 = parseSyllables("s'he").map((s) => s.primary).join("")
      const escaped3 = parseSyllables("s_h").map((s) => s.primary).join("")
      const escaped4 = parseSyllables("s_he").map((s) => s.primary).join("")
      expect(escaped1).toBe("ስህ")
      expect(escaped2).toBe("ስሀ")
      expect(escaped3).toBe("ስህ")
      expect(escaped4).toBe("ስሀ")
    })
  })

  describe("Capitalization & Name Handling", () => {
    it("maps word-initial capitals to standard base consonants to protect capitalized names", () => {
      // In casual typing and mobile auto-capitalization, initial capitals should not produce emphatics
      expect(transliterate("Selam")[0]).toBe("ሰላም")
      expect(transliterate("Solomon")[0]).toBe("ሶሎሞን")
      expect(transliterate("Tadesse")[0]).toBe("ታደሰ")
      expect(transliterate("Helen")[0]).toBe("ሀለን")
    })

    it("merges English double-consonant gemination (e.g. 'ss' in Tadesse, 'dd' in Addis)", () => {
      expect(transliterate("Tadesse")[0]).toBe("ታደሰ")
      expect(transliterate("Addis")[0]).toBe("አዲስ")
      expect(transliterate("sse")[0]).toBe("ሰ")
      expect(transliterate("lle")[0]).toBe("ለ")
      expect(transliterate("nne")[0]).toBe("ነ")
      expect(transliterate("tte")[0]).toBe("ተ")
    })

    it("handles double-consonants without vowels as separate 6th-order syllables (ss, ll, nn, tt)", () => {
      expect(transliterate("ss")[0]).toBe("ስስ")
      expect(transliterate("ll")[0]).toBe("ልል")
      expect(transliterate("nn")[0]).toBe("ንን")
      expect(transliterate("tt")[0]).toBe("ትት")
    })

    it("supports the escape hatch to prevent gemination merging (e.g. s'se -> ስሰ, l'le -> ልለ)", () => {
      expect(transliterate("s'se")[0]).toBe("ስሰ")
      expect(transliterate("l'le")[0]).toBe("ልለ")
      expect(transliterate("n'ne")[0]).toBe("ንነ")
      expect(transliterate("t'te")[0]).toBe("ትተ")
    })

    it("preserves mid-word SERA emphatics (e.g. aTee -> አጤ, aTe -> አጠ)", () => {
      expect(transliterate("aTee")[0]).toBe("አጤ")
      expect(transliterate("aTe")[0]).toBe("አጠ")
    })

    it("treats fully uppercase words as Caps Lock (lowercased) while keeping SERA emphatics for mixed case", () => {
      expect(transliterate("SELAM")[0]).toBe("ሰላም")
      expect(transliterate("TESFAYE")[0]).toBe("ተስፋዬ")

      // Non-dictionary tokenization (SPECIAL_WORDS bypassed):
      // "tesfaye" tokenizes to "ተስፋየ" (1st-order 'ye' = የ; 'ዬ' 5th-order is in alts)
      const tokenize = (input: string) =>
        parseSyllables(input).map((s) => s.primary).join("")
      expect(tokenize("tesfaye")).toBe("ተስፋየ")
      expect(parseSyllables("tesfaye")[3]?.alts).toContain("ዬ")

      // With Caps Lock lowercasing (effectiveText), TESFAYE bypass produces ተስፋየ, avoiding mid-word ጽ
      const tokenizeCaps = (input: string) => {
        const isAllCaps = !/[a-z]/.test(input) && /[A-Z]/.test(input)
        const effective = isAllCaps ? input.toLowerCase() : input
        return parseSyllables(effective).map((s) => s.primary).join("")
      }
      expect(tokenizeCaps("TESFAYE")).toBe("ተስፋየ")
      expect(tokenizeCaps("SELAM")).toBe("ሰላም")

      // Raw unlowercased parseSyllables("TESFAYE") would treat mid-word 'S' as emphatic ጽ
      expect(tokenize("TESFAYE")).toBe("ተጽፋየ")

      // Non-dictionary words: all-caps matches lowercase output
      expect(transliterate("GEMED")).toEqual(transliterate("gemed"))
      expect(transliterate("FERES")).toEqual(transliterate("feres"))
      expect(transliterate("GEMED")[0]).toBe("ገመድ")
      expect(transliterate("FERES")[0]).toBe("ፈረስ")

      // Mixed-case retains SERA emphatics
      expect(transliterate("aTe")[0]).toBe("አጠ")
      expect(transliterate("aCa")[0]).toBe("አጫ")
    })
  })

  describe("8th-Order Labialized Characters (ዲቃላ ፊደላት)", () => {
    it("transliterates consonant + 'wa' to labialized glyphs", () => {
      expect(transliterate("kwa")[0]).toBe("ኳ")
      expect(transliterate("qwa")[0]).toBe("ቋ")
      expect(transliterate("gwa")[0]).toBe("ጓ")
      expect(transliterate("twa")[0]).toBe("ቷ")
      expect(transliterate("twa")).toContain("ጧ")
      expect(transliterate("Twa")[0]).toBe("ቷ")
      expect(transliterate("Twa")).toContain("ጧ")
      expect(transliterate("aTwa")[0]).toBe("አጧ")
      expect(transliterate("bwa")[0]).toBe("ቧ")
      expect(transliterate("mwa")[0]).toBe("ሟ")
      expect(transliterate("lwa")[0]).toBe("ሏ")
      expect(transliterate("rwa")[0]).toBe("ሯ")
      expect(transliterate("swa")[0]).toBe("ሷ")
      expect(transliterate("shwa")[0]).toBe("ሿ")
      expect(transliterate("chwa")[0]).toBe("ቿ")
      expect(transliterate("chwa")).toContain("ጯ")
      expect(transliterate("Chwa")[0]).toBe("ቿ")
      expect(transliterate("Chwa")).toContain("ጯ")
      expect(transliterate("aChwa")[0]).toBe("አጯ")
      expect(transliterate("zwa")[0]).toBe("ዟ")
      expect(transliterate("dwa")[0]).toBe("ዷ")
      expect(transliterate("jwa")[0]).toBe("ጇ")
      expect(transliterate("pwa")[0]).toBe("ፗ")
      expect(transliterate("pwa")).toContain("ጷ")
      expect(transliterate("Pwa")[0]).toBe("ፗ")
      expect(transliterate("Pwa")).toContain("ጷ")
      expect(transliterate("phwa")[0]).toBe("ጷ")
      expect(transliterate("aPwa")[0]).toBe("አጷ")
      expect(transliterate("tswa")[0]).toBe("ጿ")
      expect(transliterate("fwa")[0]).toBe("ፏ")
    })

    it("ensures every labialized glyph in abugida is reachable from some input as primary or alt", () => {
      const allLabialized: { root: string; glyph: string }[] = []
      for (const [root, forms] of Object.entries(abugida)) {
        if (forms.length > 7 && forms[7]) {
          allLabialized.push({ root, glyph: forms[7] })
        }
      }

      // Input mappings designed to test reachability of each family
      const testInputs = [
        "hwa",
        "hhwa",
        "lwa",
        "mwa",
        "swa",
        "rwa",
        "shwa",
        "qwa",
        "bwa",
        "twa",
        "Twa",
        "aTwa",
        "chwa",
        "Chwa",
        "aChwa",
        "nwa",
        "nywa",
        "gnwa",
        "kwa",
        "khwa",
        "zwa",
        "zhwa",
        "dwa",
        "jwa",
        "gwa",
        "Pwa",
        "pwa",
        "phwa",
        "aPwa",
        "tswa",
        "fwa",
        "vwa",
      ]

      const reachableGlyphs = new Set<string>()
      for (const input of testInputs) {
        const results = transliterate(input)
        for (const res of results) {
          for (const char of res) {
            reachableGlyphs.add(char)
          }
        }
      }

      const unreachable: string[] = []
      for (const { root, glyph } of allLabialized) {
        if (!reachableGlyphs.has(glyph)) {
          unreachable.push(`${root} -> ${glyph}`)
        }
      }

      expect(unreachable).toEqual([])
    })

    it("deterministically handles consonants with no labialized glyph (wwa -> ውዋ, ywa -> ይዋ)", () => {
      expect(transliterate("wwa")[0]).toBe("ውዋ")
      expect(transliterate("ywa")[0]).toBe("ይዋ")
    })
  })

  describe("Tokenizer Verification (SPECIAL_WORDS Bypassed)", () => {
    it("correctly tokenizes words using parseSyllables directly without dictionary shortcut", () => {
      const tokenize = (input: string) =>
        parseSyllables(input).map((s) => s.primary).join("")

      expect(tokenize("selam")).toBe("ሰላም")
      expect(tokenize("sheger")).toBe("ሸገር")
      expect(tokenize("chaw")).toBe("ቻው")
      expect(tokenize("buna")).toBe("ቡና")
      expect(tokenize("dabo")).toBe("ዳቦ")
      expect(tokenize("injera")).toBe("ኢንጀራ")
      expect(tokenize("kwankwa")).toBe("ኳንኳ")
      expect(tokenize("qwanqwa")).toBe("ቋንቋ")
      expect(transliterate("kwankwa")[0]).toBe("ቋንቋ")
      expect(tokenize("gemed")).toBe("ገመድ")
      expect(tokenize("feres")).toBe("ፈረስ")
      expect(tokenize("debter")).toBe("ደብተር")
    })
  })

  describe("Punctuation Conversion", () => {
    it("converts standard punctuation marks to Ethiopic punctuation (. , ; :) and preserves ASCII ? matching main", () => {
      expect(transliterate(".")[0]).toBe("።")
      expect(transliterate(",")[0]).toBe("፣")
      expect(transliterate(";")[0]).toBe("፤")
      expect(transliterate(":")[0]).toBe("፥")
      expect(transliterate("?")[0]).toBe("?")
      expect(transliterate("10.5")[0]).toBe("10።5")
      expect(transliterate("10:30")[0]).toBe("10፥30")
      expect(transliterate("...")[0]).toBe("።።።")
      expect(transliterate("site.com")[0]).toBe("ሲተ።ቾም")
    })
  })

  describe("Bounded Suggestions", () => {
    it("caps permutation results to 7 options maximum", () => {
      const results = transliterate("ameseginalehu")
      expect(results.length).toBeLessThanOrEqual(7)
    })
  })
})
