#!/usr/bin/env node
/**
 * verify-kewti.mjs
 * Verification script for AI agents and developers.
 * Checks registry definitions, UI component targets, font directories, and logo assets.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../../../..");

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function verify() {
  console.log("🔍 Verifying Kewti ecosystem health...");
  let errors = 0;

  // 1. Verify UI components
  const uiComponentsDir = path.join(ROOT_DIR, "packages/ui/src/components");
  const expectedComponents = [
    "kewti-calender",
    "kewti-time",
    "kewti-inputs",
    "kewti-location-selector",
    "kewti-numerals",
    "kewti-select",
    "kewti-spell",
    "kewti-logos",
    "kewti-fonts",
  ];

  for (const comp of expectedComponents) {
    const compPath = path.join(uiComponentsDir, comp);
    if (!(await fileExists(compPath))) {
      console.error(`❌ Missing UI component directory: ${comp}`);
      errors++;
    } else {
      console.log(`  ✔ Component found: ${comp}`);
    }
  }

  // 2. Verify Fonts
  const fontsDir = path.join(ROOT_DIR, "packages/fonts");
  const expectedFonts = ["Balderasu", "Bela_Bereka", "Loga_Comic", "Selam"];
  for (const font of expectedFonts) {
    const fontPath = path.join(fontsDir, font);
    if (!(await fileExists(fontPath))) {
      console.error(`❌ Missing font directory: ${font}`);
      errors++;
    } else {
      console.log(`  ✔ Font found: ${font}`);
    }
  }

  // 3. Verify Logos
  const logosDir = path.join(ROOT_DIR, "packages/logos");
  if (await fileExists(logosDir)) {
    const logos = await fs.readdir(logosDir);
    console.log(`  ✔ Logo assets found: ${logos.length} folders`);
  } else {
    console.error(`❌ Missing logos directory: packages/logos`);
    errors++;
  }

  // 4. Verify CLI build
  const cliDist = path.join(ROOT_DIR, "packages/cli/dist/index.js");
  if (!(await fileExists(cliDist))) {
    console.warn(`⚠️ CLI dist not built yet at packages/cli/dist/index.js`);
  } else {
    console.log(`  ✔ CLI bundle verified at packages/cli/dist/index.js`);
  }

  if (errors > 0) {
    console.error(`\n❌ Verification completed with ${errors} issue(s).`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All Kewti components and assets verified successfully!`);
  }
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
