# Kewti Time Reference

## Overview
`<KewtiTime>` is an Ethiopian time picker and converter that handles both Ethiopian 12-hour cyclical time (`ጠዋት`, `ከሰዓት`, `ምሽት`, `ሌሊት`) and Standard Gregorian time (`AM`/`PM`).

## Installation
```bash
npx kewti-cli add time
```
No external runtime dependencies required.

## Import
```tsx
import { KewtiTime, stdToEth, ethToStd24 } from "@/kewti/ui";
import type { TimeValue, TimePickerMode, AmharicPeriod } from "@/kewti/ui";
```

## Props: `KewtiTime`
```typescript
interface EthiopianTimePickerProps {
  /** Value object containing 24-hour hour (0-23) and minute (0-59) */
  value: TimeValue;
  /** Callback invoked on time selection */
  onChange: (value: TimeValue) => void;
  /** Mode: "eth" (Ethiopian Amharic periods) or "std" (Standard 12h AM/PM) */
  mode?: "eth" | "std";
  className?: string;
  style?: React.CSSProperties;
  selectClassName?: string;
  selectStyle?: React.CSSProperties;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
}

interface TimeValue {
  hour: number;   // 0 - 23 (Always stored as standard 24-hour time)
  minute: number; // 0 - 59
}
```

## Understanding Ethiopian Time
The Ethiopian clock runs on a 12-hour offset system based on natural sunlight:
- **06:00 (Standard)** = **12:00 ጠዋት** (Day starts at sunrise)
- **12:00 (Standard)** = **06:00 ከሰዓት** (Midday)
- **18:00 (Standard)** = **12:00 ምሽት** (Sunset)
- **00:00 (Midnight Standard)** = **06:00 ሌሊት** (Mid-night)

### Utility Functions
```typescript
// Standard 24h -> Ethiopian hour + period
const { ethHour, period } = stdToEth(14); 
// returns { ethHour: 8, period: "keseat" } (2:00 PM is 8:00 afternoon)

// Ethiopian hour + period -> Standard 24h
const std24 = ethToStd24(8, "keseat"); 
// returns 14
```

## Example: Meeting Time Picker
```tsx
"use client";

import { useState } from "react";
import { KewtiTime } from "@/kewti/ui";

export function MeetingScheduler() {
  const [time, setTime] = useState({ hour: 9, minute: 30 }); // 9:30 AM Standard = 3:30 ጠዋት
  const [mode, setMode] = useState<"eth" | "std">("eth");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">የስብሰባ ሰዓት:</label>
        <button
          type="button"
          onClick={() => setMode(m => m === "eth" ? "std" : "eth")}
          className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded font-mono"
        >
          {mode === "eth" ? "Switch to Standard (AM/PM)" : "Switch to Ethiopian (የኢትዮጵያ ሰዓት)"}
        </button>
      </div>

      <KewtiTime
        value={time}
        onChange={setTime}
        mode={mode}
      />

      <span className="text-xs text-neutral-500">
        Stored 24h Value: {String(time.hour).padStart(2, "0")}:{String(time.minute).padStart(2, "0")}
      </span>
    </div>
  );
}
```
