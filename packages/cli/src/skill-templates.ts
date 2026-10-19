// skill-templates.ts
// Embedded templates for Kewti AI skills and agent instruction files

export const SKILL_MD = `---
name: kewti
description: >-
  Use this skill whenever working with Kewti UI components, Ethiopian calendars,
  Ethiopian time pickers, Ge'ez numerals, Amharic transliteration inputs, Ethiopian
  geographic location selectors, Ethiopic web fonts (Balderasu, Bela Bereka, Loga Comic, Selam),
  or Ethiopian brand/institutional vector logos. Provides component specifications, CLI commands,
  import paths, and patterns for Next.js and React.
---

# Kewti UI & Localization Skill

Kewti (**ቀውጢ**) is the premier UI component library and localization toolkit for Ethiopian and Ge'ez web applications. It brings localized date and time systems, phonetic typing, Ge'ez numerals, administrative region selectors, web fonts, and Ethiopian brand logos directly into React and Next.js applications with 100% code ownership.

---

## Quick Reference Table

| Component / Resource | CLI Add Command | Key Props / Exports | Primary Dependencies |
| :--- | :--- | :--- | :--- |
| **Ethiopian Calendar** | \`npx kewti-cli add calendar\` | \`<KewtiCalendar>\`, \`<KewtiDatePicker>\` | \`kenat\`, \`framer-motion\`, \`lucide-react\` |
| **Ethiopian Time** | \`npx kewti-cli add time\` | \`<KewtiTime>\`, \`stdToEth\`, \`ethToStd24\` | none (pure React) |
| **Phonetic & Validated Input** | \`npx kewti-cli add input\` | \`<KewtiInput>\`, \`transliterate()\` | \`lucide-react\`, \`fuse.js\` |
| **Ge'ez Numerals & Words** | \`npx kewti-cli add numerals\` | \`<KewtiNumerals>\`, \`toGeez()\`, \`toAmharicWords()\` | \`to-words\` |
| **Ethiopian Locations** | \`npx kewti-cli add location-selector\` | \`<KewtiLocationSelector>\` | \`lucide-react\` |
| **Fuzzy Spellchecking** | \`npx kewti-cli add spell\` | \`<KewtiSpell>\`, \`parseDictionary()\` | \`fuse.js\` |
| **Searchable Select** | \`npx kewti-cli add select\` | \`<KewtiSelect>\` | \`lucide-react\` |
| **Creator Tipping & Coffee** | \`npx kewti-cli add gursha\` | \`<KewtiGursha>\` | \`lucide-react\` |
| **Brand & Bank Logos** | \`npx kewti-cli add logo\` | \`<KewtiLogo name="...">\` | none (vector SVGs) |
| **Ethiopic Web Fonts** | \`npx kewti-cli font <Name>\` | \`Balderasu\`, \`Bela_Bereka\`, \`Loga_Comic\`, \`Selam\` | \`@next/font\` or \`next/font/local\` |

---

## Directory & File Conventions

When installed via CLI, files are copied directly into the project source tree:
- **UI Components:** \`src/kewti/ui/<component-name>/\`
- **Barrel Export:** \`src/kewti/ui/index.ts\` (automatically updated by \`kewti-cli\`)
- **Fonts:** \`src/kewti/fonts/<font-name>/\`
- **Logo Assets:** \`src/kewti/logos/<logo-name>/\`

Import in components:
\`\`\`tsx
// Using barrel export:
import { KewtiCalendar, KewtiInput, KewtiTime, KewtiGursha } from "@/kewti/ui";

// Or direct import:
import { KewtiCalendar } from "@/kewti/ui/kewti-calender/component";
import { KewtiGursha } from "@/kewti/ui/kewti-gursha/component";
\`\`\`

---

## Core Localization Guidelines

### 1. Ethiopian Calendar Rules
- The Ethiopian calendar has **13 months**: 12 months of 30 days each, plus a 13th month (**ጳጉሜ / Pagume**) of 5 days (6 days in a leap year).
- Ethiopian New Year (**እንቁጣጣሽ / Enkutatash**) is on **Meskerem 1** (September 11 Gregorian, or September 12 in Gregorian leap years).
- The Ethiopian calendar is approximately **7–8 years behind** the Gregorian calendar.
- Use the \`Kenat\` library (\`import Kenat from "kenat"\`) for date manipulation:
  \`\`\`tsx
  import Kenat from "kenat";
  const today = new Kenat();
  console.log(today.getEthiopian()); // { year: 2018, month: 2, day: 7 }
  \`\`\`

### 2. Ethiopian Time Rules
- The Ethiopian day cycle is offset by **6 hours** from Gregorian 24-hour time.
- Ethiopian time starts at **sunrise (6:00 AM Gregorian = 12:00 ሰዓት ጠዋት)**.
- Periods:
  - \`tewat\` (ጠዋት): 6:00 AM – 11:59 AM Gregorian (12:00 to 5:59 morning)
  - \`keseat\` (ከሰዓት): 12:00 PM – 5:59 PM Gregorian (6:00 to 11:59 afternoon)
  - \`mishit\` (ምሽት): 6:00 PM – 11:59 PM Gregorian (12:00 to 5:59 evening)
  - \`lelit\` (ሌሊት): 12:00 AM – 5:59 AM Gregorian (6:00 to 11:59 night)
- Conversion utilities provided by \`KewtiTime\`:
  - \`stdToEth(std24Hour)\`: Returns \`{ ethHour, period }\`
  - \`ethToStd24(ethHour, period)\`: Returns \`24-hour\` standard number

### 3. Ge'ez Numerals
- Ge'ez numbers do not have a symbol for zero (\`0\`).
- Traditional numerals: \`፩\` (1), \`፪\` (2), \`፫\` (3), \`፬\` (4), \`፭\` (5), \`፮\` (6), \`፯\` (7), \`፰\` (8), \`፱\` (9), \`፲\` (10), \`፳\` (20), \`፴\` (30), \`፵\` (40), \`፶\` (50), \`፷\` (60), \`፸\` (70), \`፹\` (80), \`፺\` (90), \`፻\` (100), \`፼\` (10,000).
- Convert with \`toGeez(number)\` or \`<KewtiNumerals value={125} system="geez" />\`.
- Convert to Amharic currency words with \`toAmharicWords(amount, { currency: true })\` -> e.g. "አንድ መቶ ሀያ አምስት ብር".
`;

export const REF_CALENDAR = `# Kewti Calendar & DatePicker Reference

## Overview
\`<KewtiCalendar>\` and \`<KewtiDatePicker>\` provide localized Ethiopian calendar views, Gregorian toggle, month theme gradients, month animation artwork, and national holiday badges.

## Installation
\`\`\`bash
npx kewti-cli add calendar
\`\`\`
Dependencies: \`kenat\`, \`framer-motion\`, \`lucide-react\`.

## Usage
\`\`\`tsx
"use client";
import { useState } from "react";
import { KewtiCalendar, KewtiDatePicker } from "@/kewti/ui";
import Kenat from "kenat";

export function CalendarDemo() {
  const [date, setDate] = useState<Kenat>(new Kenat());
  return (
    <div className="space-y-4">
      <KewtiDatePicker value={date} onChange={setDate} calendarPref="ethiopian" />
      <KewtiCalendar value={date} onChange={setDate} calendarPref="ethiopian" />
    </div>
  );
}
\`\`\`
`;

export const REF_TIME = `# Kewti Time Reference

## Overview
\`<KewtiTime>\` is an Ethiopian cyclical time picker and converter supporting both Ethiopian periods (\`ጠዋት\`, \`ከሰዓት\`, \`ምሽት\`, \`ሌሊት\`) and standard 12h/24h time.

## Installation
\`\`\`bash
npx kewti-cli add time
\`\`\`

## Conversion Utilities
\`\`\`typescript
import { stdToEth, ethToStd24 } from "@/kewti/ui";

const { ethHour, period } = stdToEth(14); // 2:00 PM -> { ethHour: 8, period: "keseat" }
const stdHour = ethToStd24(8, "keseat");  // 14
\`\`\`

## Component Usage
\`\`\`tsx
"use client";
import { useState } from "react";
import { KewtiTime } from "@/kewti/ui";

export function TimeDemo() {
  const [time, setTime] = useState({ hour: 9, minute: 30 }); // 9:30 AM = 3:30 ጠዋት
  return <KewtiTime value={time} onChange={setTime} mode="eth" />;
}
\`\`\`
`;

export const REF_INPUTS = `# Kewti Inputs & Spell Reference

## Overview
\`<KewtiInput>\` provides phonetic Latin-to-Ge'ez transliteration, Web Speech voice input, and Kebele ID / TIN format masking.

## Installation
\`\`\`bash
npx kewti-cli add input
\`\`\`
Dependencies: \`lucide-react\`, \`fuse.js\`.

## Transliteration Example
- \`s\` -> \`ስ\`, \`se\` -> \`ሰ\`, \`su\` -> \`ሱ\`, \`si\` -> \`ሲ\`, \`sa\` -> \`ሳ\`, \`sie\` -> \`ሴ\`, \`so\` -> \`ሶ\`

## Component Usage
\`\`\`tsx
"use client";
import { useState } from "react";
import { KewtiInput } from "@/kewti/ui";

export function InputDemo() {
  const [val, setVal] = useState("");
  return (
    <KewtiInput
      value={val}
      onValueChange={setVal}
      placeholder="ስምዎን ያስገቡ..."
      defaultLanguage="am"
      showVoiceInput={true}
      spellCheck={true}
    />
  );
}
\`\`\`
`;

export const REF_NUMERALS = `# Kewti Numerals & Location Selector Reference

## Numerals
\`\`\`typescript
import { KewtiNumerals, toGeez, toAmharicWords } from "@/kewti/ui";

toGeez(2024); // "፳፻፳፬"
toAmharicWords(150.50, { currency: true }); // "አንድ መቶ ሃምሳ ብር ከ ሃምሳ ሳንቲም"
\`\`\`

## Location Selector
\`\`\`bash
npx kewti-cli add location-selector
\`\`\`

\`\`\`tsx
"use client";
import { KewtiLocationSelector } from "@/kewti/ui";

<KewtiLocationSelector
  onLocationChange={(loc) => {
    console.log(loc.region, loc.zone, loc.woreda);
  }}
/>
\`\`\`
`;

export const REF_FONTS = `# Kewti Fonts & Logos Reference

## Fonts
- \`Balderasu\`, \`Bela_Bereka\`, \`Loga_Comic\`, \`Selam\`
\`\`\`bash
npx kewti-cli font Balderasu
npx kewti-cli font Selam
\`\`\`

## Brand Logos (70+ Ethiopian Brands)
\`\`\`bash
npx kewti-cli add logo
\`\`\`

\`\`\`tsx
import { KewtiLogo } from "@/kewti/ui";

<KewtiLogo name="commercial_bank_of_ethiopia" className="h-10" />
<KewtiLogo name="ethio_telecom" className="h-8" />
<KewtiLogo name="ethiopian_airlines" className="h-8" />
<KewtiLogo name="chapa" className="h-8" />
\`\`\`
`;

export const REF_CLI = `# Kewti CLI Reference

\`\`\`bash
# Add UI components
npx kewti-cli add <calendar | time | input | numerals | location-selector | select | spell | logo | fonts>

# Add fonts
npx kewti-cli font <Balderasu | Bela_Bereka | Loga_Comic | Selam>

# Download brand logos
npx kewti-cli logo <commercial_bank_of_ethiopia | ethio_telecom | ...>

# Machine-readable discovery for AI
npx kewti-cli list --json
npx kewti-cli info calendar --json

# Install AI skill into project
npx kewti-cli skill
\`\`\`
`;

export const CURSOR_RULES = `# Kewti Cursor AI Rules

You are an expert pair programmer working on Kewti (ቀውጢ), an Ethiopian/Ge'ez localized React UI library and CLI tool.

## Key Rules & Architectural Principles:
1. **Never Re-invent Ethiopian Calendar Calculations**:
   - Always use the \`Kenat\` library (\`import Kenat from "kenat"\`).
   - Ethiopian years have 13 months (Meskerem to Puagme).
   - Puagme has 5 days (6 in leap years).
   - Ethiopian years are 7 to 8 years behind Gregorian years.

2. **Ethiopian Time (12-hour offset)**:
   - Ethiopian day starts at 06:00 Gregorian = 12:00 ጠዋት (morning).
   - Periods: \`tewat\` (ጠዋት), \`keseat\` (ከሰዓት), \`mishit\` (ምሽት), \`lelit\` (ሌሊት).
   - Use \`stdToEth()\` and \`ethToStd24()\` utilities for conversions.

3. **Ge'ez Numerals & Words**:
   - Zero does not exist in traditional Ge'ez numerals (፩, ፪, ፲, etc.).
   - Use \`toGeez(num)\` and \`toAmharicWords(num, { currency: true })\`.

4. **Component Distribution**:
   - CLI command: \`npx kewti-cli add <component>\`.
   - Components live in \`src/kewti/ui/<component>/\`.
   - Fonts live in \`src/kewti/fonts/<font>/\`.
   - Logos live in \`src/kewti/logos/<logo>/\`.
   - Shared barrel: \`src/kewti/ui/index.ts\`.

5. **React & Next.js Best Practices**:
   - Add \`"use client"\` to interactive components with hooks or DOM events.
   - Use Tailwind CSS for utility-first styling with dark mode support.
`;

export const COPILOT_INSTRUCTIONS = `# GitHub Copilot Instructions for Kewti

When generating code, tests, or documentation for Kewti:
- Always use the \`Kenat\` library for Ethiopian date arithmetic and holiday detection.
- Respect Ethiopian time logic: day begins at 6:00 AM (12 ሰዓት ጠዋት).
- Ensure all interactive UI components include \`"use client"\`.
- Support both light and dark mode classes using Tailwind CSS (\`dark:...\`).
- Component installation command is \`npx kewti-cli add <name>\`.
- Font installation command is \`npx kewti-cli font <name>\`.
- Logo asset download command is \`npx kewti-cli logo <name>\`.
`;

export const REF_GURSHA = `# Kewti Gursha (Tipping & Support) Reference

## Overview
\`<KewtiGursha>\` is a creator tipping and "Buy Me a Coffee / Buna" button integrated with Ethiopian creator platform **Gursha Plus** (\`gurshaplus.com\`). It features an authentic Ethiopian Sini (የቡና ሲኒ) coffee cup icon, built-in color themes, language presets, and custom styling overrides.

## Installation
\`\`\`bash
npx kewti-cli add gursha
\`\`\`
Peer Dependency: \`lucide-react\`.

## Usage
\`\`\`tsx
"use client";
import { KewtiGursha } from "@/kewti/ui";

<KewtiGursha handle="kewti" text="ቡና ግዙ" variant="gursha" size="sm" />
\`\`\`
`;

export const AGENTS_MD = `# Kewti AI Guidelines & Constraints

When implementing, modifying, or testing code in this workspace, follow these rules:

## Architecture & Conventions
- Component distribution path: \`src/kewti/ui/<component>/\`
- Fonts path: \`src/kewti/fonts/<font>/\`
- Logos path: \`src/kewti/logos/<logo>/\`
- Shared barrel: \`src/kewti/ui/index.ts\`

## Component Invariants & Domain Rules
1. **Ethiopian Calendar:**
   - 13 months (12 months of 30 days + Pagume of 5 or 6 days).
   - Calendar conversion must always use \`Kenat\` (\`import Kenat from "kenat"\`). Never write custom ad-hoc formulas.
2. **Ethiopian Time:**
   - 06:00 AM Gregorian is 12:00 ጠዋት (morning).
   - Always distinguish between Standard 24h/12h and Ethiopian 12-hour period-based time (\`tewat\`, \`keseat\`, \`mishit\`, \`lelit\`).
   - Use \`stdToEth()\` and \`ethToStd24()\` from \`@/kewti/ui\`.
3. **Phonetic Typing & Input:**
   - \`<KewtiInput>\` handles transliteration via \`./transliterate.ts\`. Ensure both controlled and uncontrolled modes work properly.
4. **Client Components:**
   - Interactive components using hooks must always have \`"use client"\` at the top of the file.
5. **Peer Dependencies:**
   - \`calendar\`: requires \`kenat\`, \`framer-motion\`, \`lucide-react\`.
   - \`input\`: requires \`lucide-react\`, \`fuse.js\`.
   - \`numerals\`: requires \`to-words\`.
   - \`gursha\`: requires \`lucide-react\`.
`;

export const CODEX_MD = `# Kewti – OpenAI Codex Guidelines

This file is read automatically by Codex CLI and the OpenAI Codex coding agent.

## What is Kewti?
Kewti (ቀውጢ) is a React / Next.js component library for Ethiopian and Ge'ez web applications.
Components are distributed via CLI (copy-paste, no npm package required).

## Installation
\`\`\`bash
# Add a component into src/kewti/ui/<component>/
npx kewti-cli add <calendar | time | input | numerals | location-selector | select | spell | logo | gursha>

# Add Ethiopic fonts into src/kewti/fonts/<name>/
npx kewti-cli font <Balderasu | Bela_Bereka | Loga_Comic | Selam>

# Download Ethiopian brand logos into src/kewti/logos/<name>/
npx kewti-cli logo <commercial_bank_of_ethiopia | ethio_telecom | ...>

# Discover everything as machine-readable JSON
npx kewti-cli list --json
npx kewti-cli info calendar --json
\`\`\`

## Import Conventions
\`\`\`typescript
// Barrel import (preferred)
import { KewtiCalendar, KewtiDatePicker, KewtiTime, KewtiInput, KewtiNumerals, KewtiLocationSelector, KewtiLogo, KewtiGursha } from "@/kewti/ui";

// Direct import
import { KewtiCalendar } from "@/kewti/ui/kewti-calender/component";
import { KewtiGursha } from "@/kewti/ui/kewti-gursha/component";
\`\`\`

## Critical Domain Rules

### Ethiopian Calendar
- 13 months: Meskerem(1)–Nehase(12) each have 30 days; Pagume(13) has 5 days (6 in leap years).
- Ethiopian year ≈ Gregorian year − 7 or 8.
- **Always** use \`import Kenat from "kenat"\` for date arithmetic. Never write custom conversion logic.

### Ethiopian Time
- The Ethiopian clock is offset by 6 hours from Gregorian: 6:00 AM = 12:00 ጠዋት (sunrise).
- Four named periods: \`tewat\` (ጠዋት 6–12), \`keseat\` (ከሰዓት 12–18), \`mishit\` (ምሽት 18–24), \`lelit\` (ሌሊት 0–6).
- Use \`stdToEth(std24)\` → \`{ ethHour, period }\` and \`ethToStd24(ethHour, period)\` → number from \`@/kewti/ui\`.

### Ge'ez Numerals
- No zero symbol exists in traditional Ge'ez (፩ ፪ ፫ … ፲ ፻ ፼).
- Use \`toGeez(n)\` for numerals and \`toAmharicWords(n, { currency: true })\` for Birr/Santim words.

### React / Next.js
- Always add \`"use client"\` at the top of any file using React hooks, \`framer-motion\`, or DOM events.
- Tailwind CSS dark mode: use \`dark:...\` utilities.

## File Layout (after CLI install)
\`src/kewti/ui/<component>/component.tsx\` – React component  
\`src/kewti/ui/index.ts\`               – barrel re-exports  
\`src/kewti/fonts/<name>/\`             – font files  
\`src/kewti/logos/<name>/\`             – SVG/PNG assets  
`;
