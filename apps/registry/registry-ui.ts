export type RegistryItem = {
  name: string;
  type: "components:ui";
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};

export const uiRegistry: RegistryItem[] = [
  {
    name: "time",
    type: "components:ui",
    description: "Ethiopian 12-hour cyclical time picker (ጠዋት, ከሰዓት, ምሽት, ሌሊት) with standard 24-hour time conversion.",
    dependencies: [],
    registryDependencies: [],
    files: ["kewti-time/component.tsx"],
  },
  {
    name: "fonts",
    type: "components:ui",
    description: "Ethiopic font preview wrappers and audio pronunciation component using Web Speech API.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: ["kewti-fonts/component.tsx"],
  },
  {
    name: "calendar",
    type: "components:ui",
    description: "Complete Ethiopian calendar & date picker with 13 months, Kenat date arithmetic, holiday badges, and animated month artwork.",
    dependencies: ["kenat", "framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      "kewti-calender/component.tsx",
      "kewti-calender/MonthAnimation.tsx",
      "kewti-calender/MonthAnimations/meskerem.tsx",
      "kewti-calender/MonthAnimations/tkimt.tsx",
      "kewti-calender/MonthAnimations/hidar.tsx",
      "kewti-calender/MonthAnimations/tahsas.tsx",
      "kewti-calender/MonthAnimations/tir.tsx",
      "kewti-calender/MonthAnimations/yekatit.tsx",
      "kewti-calender/MonthAnimations/megabit.tsx",
      "kewti-calender/MonthAnimations/miazia.tsx",
      "kewti-calender/MonthAnimations/genbot.tsx",
      "kewti-calender/MonthAnimations/sene.tsx",
      "kewti-calender/MonthAnimations/hamle.tsx",
      "kewti-calender/MonthAnimations/nehase.tsx",
      "kewti-calender/MonthAnimations/puagme.tsx"
    ],
  },
  {
    name: "location-selector",
    type: "components:ui",
    description: "Ethiopian administrative location selector with cascading Region (Admin 1), Zone/Subcity (Admin 2), and Woreda (Admin 3) dropdowns.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: ["kewti-location-selector/component.tsx"],
  },
  {
    name: "input",
    type: "components:ui",
    description: "Phonetic Amharic input with real-time Latin-to-Ge'ez transliteration, voice dictation, Kebele/TIN formatting, and fuzzy spellchecking.",
    dependencies: ["lucide-react", "fuse.js"],
    registryDependencies: ["spell"],
    files: ["kewti-inputs/component.tsx", "kewti-inputs/transliterate.ts"],
  },
  {
    name: "numerals",
    type: "components:ui",
    description: "Ge'ez numeral converter and spelled-out Amharic word translator with Birr and Santim currency support.",
    dependencies: ['to-words'],
    registryDependencies: [],
    files: ["kewti-numerals/component.tsx"],
  },
  {
    name: "spell",
    type: "components:ui",
    description: "Fuzzy dictionary spellchecker for Ge'ez/Amharic words with autocorrection dropdown.",
    dependencies: ["fuse.js"],
    registryDependencies: [],
    files: ["kewti-spell/component.tsx", "kewti-spell/dictionary.ts"],
  },
  {
    name: "select",
    type: "components:ui",
    description: "Searchable dropdown select component with support for remote API data sources and icons.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: ["kewti-select/component.tsx"],
  },
  {
    name: "logo",
    type: "components:ui",
    description: "Vector brand logo component for Ethiopian commercial banks, telecom, government agencies, and tech brands.",
    dependencies: [],
    registryDependencies: [],
    files: ["kewti-logos/component.tsx"],
  },
  {
    name: "gursha",
    type: "components:ui",
    description: "Ethiopian tipping and 'Buy Me a Coffee' button integrated with Gursha Plus profiles.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: ["kewti-gursha/component.tsx"],
  }
];

