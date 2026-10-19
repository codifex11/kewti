# Kewti – OpenAI Codex Guidelines

This file is read automatically by Codex CLI and the OpenAI Codex coding agent.

## What is Kewti?
Kewti (ቀውጢ) is a React / Next.js component library for Ethiopian and Ge'ez web applications.
Components are distributed via CLI (copy-paste, no npm package required).

## Installation
```bash
# Add a component into src/kewti/ui/<component>/
npx kewti-cli add <calendar | time | input | numerals | location-selector | select | spell | logo>

# Add Ethiopic fonts into src/kewti/fonts/<name>/
npx kewti-cli font <Balderasu | Bela_Bereka | Loga_Comic | Selam>

# Download Ethiopian brand logos into src/kewti/logos/<name>/
npx kewti-cli logo <commercial_bank_of_ethiopia | ethio_telecom | ...>

# Discover everything as machine-readable JSON
npx kewti-cli list --json
npx kewti-cli info calendar --json
```

## Import Conventions
```typescript
// Barrel import (preferred)
import { KewtiCalendar, KewtiDatePicker, KewtiTime, KewtiInput, KewtiNumerals, KewtiLocationSelector, KewtiLogo } from "@/kewti/ui";

// Direct import
import { KewtiCalendar } from "@/kewti/ui/kewti-calender/component";
```

## Critical Domain Rules

### Ethiopian Calendar
- 13 months: Meskerem(1)–Nehase(12) each have 30 days; Pagume(13) has 5 days (6 in leap years).
- Ethiopian year ≈ Gregorian year − 7 or 8.
- **Always** use `import Kenat from "kenat"` for date arithmetic. Never write custom conversion logic.

### Ethiopian Time
- The Ethiopian clock is offset by 6 hours from Gregorian: 6:00 AM = 12:00 ጠዋት (sunrise).
- Four named periods: `tewat` (ጠዋት 6–12), `keseat` (ከሰዓት 12–18), `mishit` (ምሽት 18–24), `lelit` (ሌሊት 0–6).
- Use `stdToEth(std24)` → `{ ethHour, period }` and `ethToStd24(ethHour, period)` → number from `@/kewti/ui`.

### Ge'ez Numerals
- No zero symbol exists in traditional Ge'ez (፩ ፪ ፫ … ፲ ፻ ፼).
- Use `toGeez(n)` for numerals and `toAmharicWords(n, { currency: true })` for Birr/Santim words.

### React / Next.js
- Always add `"use client"` at the top of any file using React hooks, `framer-motion`, or DOM events.
- Tailwind CSS dark mode: use `dark:...` utilities.

## File Layout (after CLI install)
`src/kewti/ui/<component>/component.tsx` – React component  
`src/kewti/ui/index.ts`               – barrel re-exports  
`src/kewti/fonts/<name>/`             – font files  
`src/kewti/logos/<name>/`             – SVG/PNG assets
