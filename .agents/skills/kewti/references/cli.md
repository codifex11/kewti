# Kewti CLI Reference for AI & Developers

## Overview
`kewti-cli` is the command-line interface for downloading UI components, fonts, and brand assets directly into modern JavaScript and TypeScript projects.

## Common Commands

```bash
# Install a UI component (and auto-install dependencies & update index.ts)
npx kewti-cli add <component-name>

# Install a font family
npx kewti-cli font <font-name>

# Download a logo asset
npx kewti-cli logo <logo-name>

# Machine-readable registry listing (Optimized for AI agents)
npx kewti-cli list --json

# Detailed component metadata inspection (Optimized for AI agents)
npx kewti-cli info <component-name> --json
```

## Available UI Components for `add`
- `calendar` (alias: `kewti-calender`): Ethiopian Calendar and DatePicker
- `time` (alias: `kewti-time`): Ethiopian cyclical time picker
- `input` (alias: `kewti-inputs`): Amharic phonetic transliteration and voice input
- `numerals` (alias: `kewti-numerals`): Ge'ez numerals and Amharic written words
- `location-selector` (alias: `kewti-location-selector`): Region, Zone, and Woreda selector
- `select` (alias: `kewti-select`): API searchable select
- `spell` (alias: `kewti-spell`): Fuzzy Amharic dictionary spellchecker
- `logo` (alias: `kewti-logos`): `<KewtiLogo>` React component
- `fonts` (alias: `kewti-fonts`): Font previewer and `<KewtiPronounce>`

## Available Fonts for `font`
- `Balderasu`
- `Bela_Bereka`
- `Loga_Comic`
- `Selam`

## AI Agent Integration Tips
1. **Always check existing files before re-installing:** Check if `src/kewti/ui/<name>/component.tsx` already exists.
2. **Auto-barrel update:** The CLI automatically inserts `export * from "./<component>/component";` into `src/kewti/ui/index.ts`.
3. **Dependencies:** The CLI automatically detects package managers (`pnpm`, `npm`, `yarn`, `bun`) and runs install for required peer dependencies.
4. **Target Paths:**
   - Components -> `src/kewti/ui/`
   - Fonts -> `src/kewti/fonts/`
   - Logos -> `src/kewti/logos/`
