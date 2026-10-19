# Kewti Calendar & DatePicker Reference

## Overview
`<KewtiCalendar>` and `<KewtiDatePicker>` provide fully localized Ethiopian calendar views, Gregorian toggle, month-specific vibrant visual themes, animated month artwork, and holiday badge indicators.
`<KewtiDatePickerDropdown>` (alias `KewtiDropdownDatePicker`) is a compact inline variant using three native select dropdowns — ideal for forms and tight layouts.

## Installation
```bash
npx kewti-cli add calendar
```
Dependencies installed automatically: `kenat`, `framer-motion`, `lucide-react`.

## Import
```tsx
import { KewtiCalendar, KewtiDatePicker, KewtiDatePickerDropdown } from "@/kewti/ui";
// or use the alias:
import { KewtiDropdownDatePicker } from "@/kewti/ui";
import Kenat from "kenat";
```

---

## Props: `KewtiCalendar`
```typescript
interface CalendarProps {
  /** Selected Kenat instance */
  value?: Kenat;
  /** Callback fired when a date cell is selected */
  onChange?: (date: Kenat) => void;
  /** Calendar system to display: "ethiopian" (default) or "gregorian" */
  calendarPref?: "ethiopian" | "gregorian";
  /** Whether to render decorative animated month illustrations (default: true) */
  showAnimations?: boolean;
  /** Whether to highlight Ethiopian national and religious holidays (default: true) */
  showHolidays?: boolean;
  /** Additional CSS classes for outer container */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}
```

---

## Props: `KewtiDatePicker`
A popover-based date picker that opens a `KewtiCalendar` when the trigger button is clicked.

```typescript
interface DatePickerProps {
  value?: Kenat;
  onChange?: (date: Kenat) => void;
  calendarPref?: "ethiopian" | "gregorian";
  placeholder?: string; // Default: "ቀን ይምረጡ"
  showAnimations?: boolean;
  showHolidays?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

---

## Props: `KewtiDatePickerDropdown`
A compact, inline date picker using three native `<select>` dropdowns (Day / Month / Year).
Alias: `KewtiDropdownDatePicker` is exported as a convenience re-export of the same component.

```typescript
interface DatePickerDropdownProps {
  /** Selected Kenat instance (defaults to today when omitted) */
  value?: Kenat;
  /** Callback fired when any dropdown changes */
  onChange?: (date: Kenat) => void;
  /** Calendar system: "ethiopian" (default) or "gregorian" */
  calendarPref?: "ethiopian" | "gregorian";
  /** Minimum selectable year (default: 1900) */
  minYear?: number;
  /** Maximum selectable year (default: 2050 Ethiopian / 2100 Gregorian) */
  maxYear?: number;
  /** Show a holiday name note below the dropdowns (default: true) */
  showHolidays?: boolean;
  /** Disable all three select elements (default: false) */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Override accessible aria-label text for each dropdown */
  labels?: {
    day?: string;
    month?: string;
    year?: string;
  };
}
```

### Behavior Notes
- **Day clamping**: when the month or year changes, the selected day is automatically clamped to the maximum valid day for the new month (e.g., changing to Pagume clamps to 5 or 6).
- **Year order**: years are listed in descending order (newest first) within the range `[minYear, maxYear]`.
- **Holiday note**: when `showHolidays` is `true` and the selected date matches a known Ethiopian holiday, a small red dot + holiday name is shown beneath the dropdowns.
- **No calendar popup**: unlike `KewtiDatePicker`, this component has no popover and is entirely inline. Use it in forms or tight layouts.

---

## Example: Controlled DatePicker (popover)
```tsx
"use client";

import { useState } from "react";
import { KewtiDatePicker } from "@/kewti/ui";
import Kenat from "kenat";

export function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Kenat>(new Kenat());
  const [pref, setPref] = useState<"ethiopian" | "gregorian">("ethiopian");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setPref("ethiopian")}
          className={`px-3 py-1 rounded text-sm ${pref === "ethiopian" ? "bg-amber-600 text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}
        >
          የኢትዮጵያ ቀን አቆጣጠር
        </button>
        <button
          onClick={() => setPref("gregorian")}
          className={`px-3 py-1 rounded text-sm ${pref === "gregorian" ? "bg-amber-600 text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}
        >
          Gregorian
        </button>
      </div>

      <KewtiDatePicker
        value={selectedDate}
        onChange={(d) => setSelectedDate(d)}
        calendarPref={pref}
      />

      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Selected: {selectedDate.format({ calendar: pref, lang: pref === "ethiopian" ? "amharic" : "english" })}
      </p>
    </div>
  );
}
```

## Example: Inline Registration Form (KewtiDatePickerDropdown)
```tsx
"use client";

import { useState } from "react";
import { KewtiDatePickerDropdown } from "@/kewti/ui";
import Kenat from "kenat";

export function RegistrationForm() {
  const [dob, setDob] = useState<Kenat>(new Kenat());

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Date of Birth
      </label>
      <KewtiDatePickerDropdown
        value={dob}
        onChange={(d) => setDob(d)}
        calendarPref="ethiopian"
        minYear={1940}
        maxYear={2017}
        showHolidays={false}
        labels={{ day: "ቀን", month: "ወር", year: "ዓ.ም." }}
      />
      <p className="text-xs text-neutral-500">
        {dob.format({ calendar: "ethiopian", lang: "amharic" })}
      </p>
    </div>
  );
}
```

---

## Month Themes & Visuals
Each Ethiopian month has a dedicated color palette and animation:
- 1: Meskerem (Amber)
- 2: Tikimt (Cyan)
- 3: Hidar (Orange)
- 4: Tahsas (Red)
- 5: Tir (Pink)
- 6: Yekatit (Green)
- 7: Megabit (Yellow)
- 8: Miazia (Purple)
- 9: Genbot (Red-coral)
- 10: Sene (Blue)
- 11: Hamle (Sky)
- 12: Nehase (Indigo)
- 13: Puagme (Emerald)
