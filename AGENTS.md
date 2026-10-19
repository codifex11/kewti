<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kewti AI Guidelines & Constraints

When implementing, modifying, or testing code in this workspace, follow these rules:

## Architecture & Monorepo Structure
- `packages/ui`: Pure React UI components with Tailwind CSS. All components must be accessible and include proper typing.
- `packages/fonts`: Ethiopic font files and license files (`Balderasu`, `Bela_Bereka`, `Loga_Comic`, `Selam`).
- `packages/logos`: Official SVG/PNG brand assets for Ethiopian organizations and companies.
- `packages/cli`: CLI distribution tool (`npx kewti-cli`).
- `apps/registry`: JSON registry generators consumed by the CLI.
- `apps/kewti-docs`: Next.js Fumadocs documentation site.
- `apps/web`: Next.js web application showcase.

## Component Invariants & Domain Rules
1. **Ethiopian Calendar:**
   - 13 months (12 months of 30 days + Pagume of 5 or 6 days).
   - Calendar conversion must always use `Kenat` (`import Kenat from "kenat"`). Never write custom ad-hoc leap year or month length formulas.
2. **Ethiopian Time:**
   - 06:00 AM Gregorian is 12:00 ጠዋት (morning).
   - Always distinguish between Standard 24h/12h and Ethiopian 12-hour period-based time (`tewat`, `keseat`, `mishit`, `lelit`).
   - Use `stdToEth()` and `ethToStd24()` from `@/kewti/ui` or `kewti-time/component.tsx`.
3. **Phonetic Typing & Input:**
   - `<KewtiInput>` handles transliteration via `./transliterate.ts`. When testing or modifying, ensure both controlled (`value` + `onValueChange`) and uncontrolled modes work properly.
4. **Client Components:**
   - Interactive components using hooks (`useState`, `useEffect`, `useRef`, `framer-motion`) must always have `"use client"` at the top of the file.
5. **Peer Dependencies:**
   - `kewti-calender`: requires `kenat`, `framer-motion`, `lucide-react`.
   - `kewti-inputs`: requires `lucide-react`, `fuse.js`.
   - `kewti-numerals`: requires `to-words`.
   - `kewti-gursha`: requires `lucide-react`.

