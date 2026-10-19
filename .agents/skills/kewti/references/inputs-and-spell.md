# Kewti Inputs, Transliteration & Spell Checker Reference

## Overview
`<KewtiInput>` delivers phonetic Latin-to-Ge'ez transliteration, voice dictation (Web Speech API), Kebele ID / TIN / phone formatting, and fuzzy spellchecking through `<KewtiSpell>`.

## Installation
```bash
npx kewti-cli add input
```
Dependencies: `lucide-react`, `fuse.js`. (Also pulls `spell` as a registry dependency).

## Import
```tsx
import { KewtiInput, transliterate } from "@/kewti/ui";
import { KewtiSpell } from "@/kewti/ui/kewti-spell/component";
```

## Props: `KewtiInput`
```typescript
interface KewtiInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /** "input" (default) or "textarea" */
  variant?: "input" | "textarea";
  value?: string;
  /** String callback recommended for state */
  onValueChange?: (value: string) => void;
  /** Standard React change event (works with React Hook Form) */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Triggered on Enter key (without shift in textarea) */
  onSend?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  /** Default language: "am" (Amharic transliteration enabled) or "en" (plain English) */
  defaultLanguage?: "am" | "en";
  /** Shows microphone button for Amharic voice recognition (am-ET) */
  showVoiceInput?: boolean;
  /** Wraps input with fuzzy spellchecking suggestions (default: false) */
  spellCheck?: boolean;
}
```

## Phonetic Transliteration Rules
Typing phonetic Latin letters automatically generates Fidel candidates:
- `s` -> `ስ`, `se` -> `ሰ`, `su` -> `ሱ`, `si` -> `ሲ`, `sa` -> `ሳ`, `sie` -> `ሴ`, `so` -> `ሶ`
- `b` -> `ብ`, `be` -> `በ`, `bu` -> `ቡ`, `bi` -> `ቢ`, `ba` -> `ባ`, `bie` -> `ቤ`, `bo` -> `ቦ`
- `t` -> `ት`, `te` -> `ተ`, `tu` -> `ቱ`, `ti` -> `ቲ`, `ta` -> `ታ`, `tie` -> `ቴ`, `to` -> `ቶ`
- `ch` -> `ች`, `che` -> `ቸ`, `gn` -> `ኝ`, `gne` -> `ኘ`
- Pressing `Space` or punctuation commits the selected character.

## Example: Amharic Chat & Search Input
```tsx
"use client";

import { useState } from "react";
import { KewtiInput } from "@/kewti/ui";

export function AmharicSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-md">
      <KewtiInput
        value={query}
        onValueChange={setQuery}
        placeholder="በአማርኛ ይፈልጉ (ለምሳሌ፡ selamu...)"
        defaultLanguage="am"
        showVoiceInput={true}
        spellCheck={true}
        onSend={(text) => {
          console.log("Searching for:", text);
        }}
      />
    </div>
  );
}
```

## `<KewtiSpell>` Fuzzy Correction
`<KewtiSpell>` uses Fuse.js over a frequency dictionary of Amharic words to surface spelling suggestions and corrections:
```tsx
import { KewtiSpell } from "@/kewti/ui/kewti-spell/component";

<KewtiSpell maxSuggestions={4}>
  <input type="text" className="border rounded p-2" />
</KewtiSpell>
```
