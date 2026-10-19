---
name: kewti
description: >-
  Use this skill whenever working with Kewti UI components, Ethiopian calendars,
  Ethiopian time pickers, Ge'ez numerals, Amharic transliteration inputs, Ethiopian
  geographic location selectors, creator tipping buttons (Gursha Plus), Ethiopic web fonts (Balderasu, Bela Bereka, Loga Comic, Selam),
  or Ethiopian brand/institutional vector logos. Provides component specifications, CLI commands,
  import paths, and patterns for Next.js and React.
---

# Kewti UI & Localization Skill

Kewti (**ቀውጢ**) is the premier UI component library and localization toolkit for Ethiopian and Ge'ez web applications. It brings localized date and time systems, phonetic typing, Ge'ez numerals, administrative region selectors, web fonts, and Ethiopian brand logos directly into React and Next.js applications with 100% code ownership.

---

## Quick Reference Table

| Component / Resource | CLI Add Command | Key Props / Exports | Primary Dependencies |
| :--- | :--- | :--- | :--- |
| **Ethiopian Calendar** | `npx kewti-cli add calendar` | `<KewtiCalendar>`, `<KewtiDatePicker>`, `<KewtiDatePickerDropdown>` (alias `KewtiDropdownDatePicker`) | `kenat`, `framer-motion`, `lucide-react` |
| **Ethiopian Time** | `npx kewti-cli add time` | `<KewtiTime>`, `stdToEth`, `ethToStd24` | none (pure React) |
| **Phonetic & Validated Input** | `npx kewti-cli add input` | `<KewtiInput>`, `transliterate()` | `lucide-react`, `fuse.js` |
| **Ge'ez Numerals & Words** | `npx kewti-cli add numerals` | `<KewtiNumerals>`, `toGeez()`, `toAmharicWords()` | `to-words` |
| **Ethiopian Locations** | `npx kewti-cli add location-selector` | `<KewtiLocationSelector>` | `lucide-react` |
| **Fuzzy Spellchecking** | `npx kewti-cli add spell` | `<KewtiSpell>`, `parseDictionary()` | `fuse.js` |
| **Searchable Select** | `npx kewti-cli add select` | `<KewtiSelect>` | `lucide-react` |
| **Creator Tipping & Coffee** | `npx kewti-cli add gursha` | `<KewtiGursha>` | `lucide-react` |
| **Brand & Bank Logos** | `npx kewti-cli add logo` | `<KewtiLogo name="...">` | none (vector SVGs) |
| **Ethiopic Web Fonts** | `npx kewti-cli font <Name>` | `Balderasu`, `Bela_Bereka`, `Loga_Comic`, `Selam` | `@next/font` or `next/font/local` |

---

## Directory & File Conventions

When installed via CLI, files are copied directly into the project source tree:
- **UI Components:** `src/kewti/ui/<component-name>/`
- **Barrel Export:** `src/kewti/ui/index.ts` (automatically updated by `kewti-cli`)
- **Fonts:** `src/kewti/fonts/<font-name>/`
- **Logo Assets:** `src/kewti/logos/<logo-name>/`

Import in components:
```tsx
// Using barrel export:
import { KewtiCalendar, KewtiInput, KewtiTime, KewtiGursha } from "@/kewti/ui";

// Or direct import:
import { KewtiCalendar } from "@/kewti/ui/kewti-calender/component";
import { KewtiGursha } from "@/kewti/ui/kewti-gursha/component";
```

---

## Core Localization Guidelines

### 1. Ethiopian Calendar Rules
- The Ethiopian calendar has **13 months**: 12 months of 30 days each, plus a 13th month (**ጳጉሜ / Pagume**) of 5 days (6 days in a leap year).
- Ethiopian New Year (**እንቁጣጣሽ / Enkutatash**) is on **Meskerem 1** (September 11 Gregorian, or September 12 in Gregorian leap years).
- The Ethiopian calendar is approximately **7–8 years behind** the Gregorian calendar.
- Use the `Kenat` library (`import Kenat from "kenat"`) for date manipulation:
  ```tsx
  import Kenat from "kenat";
  const today = new Kenat();
  console.log(today.getEthiopian()); // { year: 2018, month: 2, day: 7 }
  ```

### 2. Ethiopian Time Rules
- The Ethiopian day cycle is offset by **6 hours** from Gregorian 24-hour time.
- Ethiopian time starts at **sunrise (6:00 AM Gregorian = 12:00 ሰዓት ጠዋት)**.
- Periods:
  - `tewat` (ጠዋት): 6:00 AM – 11:59 AM Gregorian (12:00 to 5:59 morning)
  - `keseat` (ከሰዓት): 12:00 PM – 5:59 PM Gregorian (6:00 to 11:59 afternoon)
  - `mishit` (ምሽት): 6:00 PM – 11:59 PM Gregorian (12:00 to 5:59 evening)
  - `lelit` (ሌሊት): 12:00 AM – 5:59 AM Gregorian (6:00 to 11:59 night)
- Conversion utilities provided by `KewtiTime`:
  - `stdToEth(std24Hour)`: Returns `{ ethHour, period }`
  - `ethToStd24(ethHour, period)`: Returns `24-hour` standard number

### 3. Ge'ez Numerals
- Ge'ez numbers do not have a symbol for zero (`0`).
- Traditional numerals: `፩` (1), `፪` (2), `፫` (3), `፬` (4), `፭` (5), `፮` (6), `፯` (7), `፰` (8), `፱` (9), `፲` (10), `፳` (20), `፴` (30), `፵` (40), `፶` (50), `፷` (60), `፸` (70), `፹` (80), `፺` (90), `፻` (100), `፼` (10,000).
- Convert with `toGeez(number)` or `<KewtiNumerals value={125} system="geez" />`.
- Convert to Amharic currency words with `toAmharicWords(amount, { currency: true })` -> e.g. "አንድ መቶ ሀያ አምስት ብር".

---

## Detailed Component Documentation

For deep technical specifications, full prop types, and edge cases, see the reference documents:

- [Calendar & Date Picker](./references/calendar.md)
- [Ethiopian Time System & Time Picker](./references/time.md)
- [Inputs, Transliteration & Spell Check](./references/inputs-and-spell.md)
- [Numerals, Currency & Location Selectors](./references/numerals-and-locations.md)
- [Creator Tipping & Support (Gursha)](./references/gursha.md)
- [Fonts & Brand Logos](./references/fonts-and-logos.md)
- [CLI Tool Reference & AI Usage](./references/cli.md)
