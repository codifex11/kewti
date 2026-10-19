# Kewti Numerals & Location Selector Reference

## 1. Ge'ez Numerals & Currency (`<KewtiNumerals>`)

### Overview
Converts Arabic numbers into traditional Ge'ez numeral strings or spelled-out Amharic words (including Ethiopian Birr and Santim formatting).

### Installation
```bash
npx kewti-cli add numerals
```
Dependency: `to-words`.

### Functions & Component
```typescript
import { KewtiNumerals, toGeez, toAmharicWords } from "@/kewti/ui";

// Pure function examples:
toGeez(1)    // "፩"
toGeez(12)   // "፲፪"
toGeez(2024) // "፳፻፳፬"

toAmharicWords(1500) 
// "አንድ ሺህ አምስት መቶ"

toAmharicWords(250.75, { currency: true }) 
// "ሁለት መቶ ሃምሳ ብር ከ ሰባ አምስት ሳንቲም"
```

### Component Props: `KewtiNumerals`
```typescript
interface KewtiNumeralsProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  system?: "geez" | "arabic" | "words"; // Default: "geez"
  currency?: boolean; // When true with system="words", adds ብር and ሳንቲም
}
```

---

## 2. Ethiopian Location Selector (`<KewtiLocationSelector>`)

### Overview
A cascading dropdown selector covering Ethiopian administrative divisions:
1. **Region / Admin 1** (e.g. Addis Ababa, Oromia, Amhara, Tigray, Sidama, Somali, etc.)
2. **Zone / Sub-city / Admin 2** (e.g. Bole, Kirkos, North Gondar, Jimma)
3. **Woreda / Admin 3** (local district)

### Installation
```bash
npx kewti-cli add location-selector
```
Dependency: `lucide-react`.

### Usage
```tsx
"use client";

import { useState } from "react";
import { KewtiLocationSelector } from "@/kewti/ui";

export function AddressForm() {
  const [location, setLocation] = useState({
    region: "",
    zone: "",
    woreda: "",
  });

  return (
    <div className="w-full max-w-sm space-y-4">
      <h3 className="font-semibold text-sm">የአድራሻ መረጃ</h3>
      <KewtiLocationSelector
        onLocationChange={(loc) => {
          setLocation({
            region: loc.region,
            zone: loc.zone,
            woreda: loc.woreda,
          });
        }}
      />
      <div className="text-xs text-neutral-500">
        መረጡት፡ {location.region} / {location.zone} / {location.woreda}
      </div>
    </div>
  );
}
```

---

## 3. Remote Searchable Select (`<KewtiSelect>`)

### Overview
A stylized dropdown select component with instant fuzzy search and support for dynamic API endpoints and favicon/icon rendering.

### Installation
```bash
npx kewti-cli add select
```
Dependency: `lucide-react`.

### Props
```typescript
interface ApiSelectProps {
  apiUrl?: string;
  options?: Array<{ name: string; favicon?: string | null; [key: string]: any }>;
  value?: string;
  onValueChange?: (value: string, item?: any) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}
```
