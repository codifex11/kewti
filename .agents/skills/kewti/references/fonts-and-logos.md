# Kewti Fonts & Logos Reference

## 1. Ethiopic Web Fonts

### Available Fonts
Kewti packages handpicked, licensed Ethiopic/Ge'ez typography suited for web interfaces:
- **`Balderasu`**: Elegant modern display and serif-friendly font.
- **`Bela_Bereka`**: Modern editorial and clean readable typeface.
- **`Loga_Comic`**: Playful display typeface for informal, games, and modern UI.
- **`Selam`**: Highly readable UI font tailored for dashboard density and body copy.

### Installation via CLI
```bash
npx kewti-cli font Balderasu
npx kewti-cli font Selam
```
This downloads font binary files into `src/kewti/fonts/<FontName>/`.

### Setup in Next.js (`next/font/local`)
```tsx
// app/fonts.ts or app/layout.tsx
import localFont from "next/font/local";

export const selamFont = localFont({
  src: "../src/kewti/fonts/Selam/Selam-Regular.ttf",
  variable: "--font-selam",
  display: "swap",
});

export const balderasuFont = localFont({
  src: "../src/kewti/fonts/Balderasu/Balderasu.ttf",
  variable: "--font-balderasu",
  display: "swap",
});
```

Attach to Tailwind CSS `tailwind.config.ts`:
```ts
theme: {
  extend: {
    fontFamily: {
      selam: ["var(--font-selam)", "sans-serif"],
      balderasu: ["var(--font-balderasu)", "serif"],
    },
  },
}
```

### `<KewtiPronounce>` Audio Utterance
```tsx
import { KewtiPronounce } from "@/kewti/ui";

<KewtiPronounce text="ሰላም ልዑል">
  <span>ሰላም ልዑል</span>
</KewtiPronounce>
```

---

## 2. Ethiopian Brand & Institutional Logos

### Overview
Over 60+ official vector logos of Ethiopian banks, telecom, airlines, government institutions, and tech brands.

### Installation
Option 1: Add the dynamic `<KewtiLogo>` React component:
```bash
npx kewti-cli add logo
```

Option 2: Download raw SVG/PNG asset files for a specific brand:
```bash
npx kewti-cli logo commercial_bank_of_ethiopia
npx kewti-cli logo ethio_telecom
npx kewti-cli logo ethiopian_airlines
npx kewti-cli logo chapa
```

### Usage: `<KewtiLogo>`
```tsx
import { KewtiLogo } from "@/kewti/ui";

export function PartnerLogos() {
  return (
    <div className="flex items-center gap-6">
      <KewtiLogo name="commercial_bank_of_ethiopia" className="h-10 w-auto" />
      <KewtiLogo name="ethio_telecom" className="h-8 w-auto" />
      <KewtiLogo name="ethiopian_airlines" className="h-8 w-auto" />
      <KewtiLogo name="chapa" className="h-8 w-auto" />
      <KewtiLogo name="bank_of_abyssinia" className="h-8 w-auto" />
    </div>
  );
}
```

### Popular Logo Slugs
- Banks: `commercial_bank_of_ethiopia`, `cbe_birr_normal`, `bank_of_abyssinia`, `awash_international_bank`, `dashen_bank`, `amhara_bank`, `cooperative_bank_of_oromia`, `hibret_bank`, `oromia_international_bank`
- Telecom & Tech: `ethio_telecom`, `chapa`, `kacha`, `blueMoon`, `iceaddis`, `ride`
- Institutions: `ethiopian_airlines`, `national_bank_of_ethiopia`, `addis_ababa_university`, `ministry_of_health`, `office_of_the_prime_minister`
