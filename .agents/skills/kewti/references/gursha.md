# Kewti Gursha (Tipping & Support) Reference

## Overview
`<KewtiGursha>` is a creator tipping and "Buy Me a Coffee / Buna" button integrated with Ethiopian creator platform **Gursha Plus** (`gurshaplus.com`). It features an authentic Ethiopian Sini (የቡና ሲኒ) coffee cup icon, built-in color themes, language presets, and custom styling overrides.

## Installation
```bash
npx kewti-cli add gursha
```
Peer Dependency: `lucide-react`.

---

## Usage

```tsx
"use client";

import { KewtiGursha } from "@/kewti/ui";

export function SponsorButton() {
  return (
    <KewtiGursha
      handle="kewti"
      text="ቡና ግዙ"
      variant="gursha"
      size="md"
    />
  );
}
```

### Basic
Provide your Gursha handle to link directly to your profile:

```tsx
<KewtiGursha handle="kewti" />
```

---

## Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `handle` | `string` | **Required** | Your Gursha Plus handle (e.g. `"kaleab"` or `"@kaleab"`). Automatically strips leading `@` and formats to `https://www.gurshaplus.com/[handle]`. |
| `username` | `string` | — | Backward-compatible alias for `handle`. |
| `href` | `string` | — | Direct link override if not using Gursha Plus profile URL. |
| `text` | `string` | `"Buy me a Coffee"` / `"ጉርሻ ስጠኝ"` | Button label. Overrides `lang` preset. |
| `lang` | `"en"` \| `"am"` | `"en"` | Language preset if `text` is not provided (`"en"` -> "Buy me a Coffee", `"am"` -> "ጉርሻ ስጠኝ"). |
| `variant` | `"gursha"` \| `"coffee"` \| `"default"` \| `"outline"` \| `"ghost"` | `"gursha"` | Preset visual theme. Ignored if `bgColor` is specified. |
| `bgColor` | `string` | — | Custom CSS/Hex background color (e.g. `#f59e0b`, `var(--primary)`). |
| `textColor` | `string` | — | Custom text and icon color. |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Controls button height, padding, text size, and Sini icon dimensions. |
| `radius` | `"full"` \| `"xl"` \| `"lg"` \| `"md"` | `"full"` | Border corner radius. |
| `icon` | `React.ReactNode` | `<SiniIcon />` | Custom icon element replacing the default Sini cup. |
| `showIcon` | `boolean` | `true` | Whether to display the icon. |
| `showExternalIcon` | `boolean` | `false` | When `true`, displays a small external link arrow indicator. |
| `target` | `string` | `"_blank"` | Anchor `target` attribute. |
| `rel` | `string` | `"noopener noreferrer"` | Anchor `rel` attribute. |

---

## Built-in Variants

1. **`gursha` (Default)**: Ethiopian Gold / Amber styling with dark text (`bg-amber-400 text-neutral-950 font-semibold`).
2. **`coffee`**: Dark roasted Ethiopian coffee roast styling (`bg-[#2d1810] text-[#f7eee7]`).
3. **`default`**: Monochromatic dark/light button (`bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900`).
4. **`outline`**: Transparent background with neutral border.
5. **`ghost`**: Clean transparent button with hover background.

---

## Common Examples

### 1. Ethiopian Amharic "ቡና ግዙ"
```tsx
<KewtiGursha
  handle="kewti"
  text="ቡና ግዙ"
  variant="gursha"
  size="sm"
/>
```

### 2. Coffee Variant
```tsx
<KewtiGursha
  handle="mychannel"
  text="Buy me a Buna"
  variant="coffee"
  size="md"
  showExternalIcon={true}
/>
```

### 3. Custom Branded Tip Button
```tsx
<KewtiGursha
  handle="creator"
  text="Support Project"
  bgColor="#E85D23"
  textColor="#FFFFFF"
  radius="full"
/>
```
