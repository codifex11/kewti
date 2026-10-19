# GitHub Copilot Instructions for Kewti

When generating code, tests, or documentation for Kewti:
- Always use the `Kenat` library for Ethiopian date arithmetic and holiday detection.
- Respect Ethiopian time logic: day begins at 6:00 AM (12 ሰዓት ጠዋት).
- Ensure all interactive UI components include `"use client"`.
- Support both light and dark mode classes using Tailwind CSS (`dark:...`).
- Component installation command is `npx kewti-cli add <name>`.
- Font installation command is `npx kewti-cli font <name>`.
- Logo asset download command is `npx kewti-cli logo <name>`.
