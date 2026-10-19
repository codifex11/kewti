"use client"

import React, { useState } from "react"
import { KewtiGursha } from "@workspace/ui/components/kewti-gursha/component"
import { Check, Copy, Sparkles } from "lucide-react"

const COLOR_PRESETS = [
    { name: "Gursha Gold", bg: "#f59e0b", text: "#0a0a0a" },
    { name: "Ethiopian Roast", bg: "#2d1810", text: "#f7eee7" },
    { name: "Midnight", bg: "#09090b", text: "#ffffff" },
    { name: "Emerald", bg: "#059669", text: "#ffffff" },
    { name: "Terracotta", bg: "#c2410c", text: "#ffffff" },
    { name: "Clean White", bg: "#ffffff", text: "#171717" },
]

export default function KewtiGurshaCustomizer() {
    const [username, setUsername] = useState("kewti")
    const [text, setText] = useState("ቡና ግዙ")
    const [bgColor, setBgColor] = useState("#f59e0b")
    const [textColor, setTextColor] = useState("#0a0a0a")
    const [size, setSize] = useState<"sm" | "md" | "lg">("md")
    const [radius, setRadius] = useState<"full" | "xl" | "lg" | "md">("full")
    const [showIcon, setShowIcon] = useState(true)
    const [showExternal, setShowExternal] = useState(false)
    const [copied, setCopied] = useState(false)
    const [canvasDark, setCanvasDark] = useState(false)

    const generatedCode = `<KewtiGursha
  handle="${username}"${text !== "Buy me a Coffee" ? `\n  text="${text}"` : ""}${bgColor !== "#f59e0b" ? `\n  bgColor="${bgColor}"` : ""}${textColor !== "#0a0a0a" ? `\n  textColor="${textColor}"` : ""}${size !== "md" ? `\n  size="${size}"` : ""}${radius !== "full" ? `\n  radius="${radius}"` : ""}${!showIcon ? `\n  showIcon={false}` : ""}${showExternal ? `\n  showExternalIcon={true}` : ""}
/>`

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="not-prose my-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-wider text-neutral-800 uppercase dark:text-neutral-200">
                        Interactive Customizer
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setCanvasDark(!canvasDark)}
                    className="rounded-md border border-neutral-200 px-2 py-1 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
                >
                    {canvasDark ? "Light Canvas" : "Dark Canvas"}
                </button>
            </div>

            {/* Live Preview Canvas */}
            <div
                className={`flex min-h-[130px] items-center justify-center p-8 transition-colors ${canvasDark ? "bg-neutral-950" : "bg-neutral-50/80"
                    }`}
            >
                <KewtiGursha
                    handle={username}
                    text={text}
                    bgColor={bgColor}
                    textColor={textColor}
                    size={size}
                    radius={radius}
                    showIcon={showIcon}
                    showExternalIcon={showExternal}
                />
            </div>

            {/* Customizer Controls */}
            <div className="border-t border-neutral-100 p-5 dark:border-neutral-800">
                {/* Color Presets */}
                <div className="mb-4">
                    <label className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                        Color Themes
                    </label>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                        {COLOR_PRESETS.map((p) => (
                            <button
                                key={p.name}
                                type="button"
                                onClick={() => {
                                    setBgColor(p.bg)
                                    setTextColor(p.text)
                                }}
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${bgColor === p.bg
                                    ? "ring-2 ring-neutral-950 dark:ring-white"
                                    : "border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                    }`}
                            >
                                <span
                                    className="h-3 w-3 rounded-full border border-black/10 shadow-xs"
                                    style={{ backgroundColor: p.bg }}
                                />
                                <span className="text-neutral-700 dark:text-neutral-300">
                                    {p.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                    <div>
                        <label className="font-semibold text-neutral-500 uppercase">
                            Handle
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-neutral-500 uppercase">
                            Label Text
                        </label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-neutral-500 uppercase">
                            Size
                        </label>
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value as any)}
                            className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                        >
                            <option value="sm">Small (sm)</option>
                            <option value="md">Medium (md)</option>
                            <option value="lg">Large (lg)</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold text-neutral-500 uppercase">
                            Shape
                        </label>
                        <select
                            value={radius}
                            onChange={(e) => setRadius(e.target.value as any)}
                            className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                        >
                            <option value="full">Pill (full)</option>
                            <option value="xl">Curved (xl)</option>
                            <option value="lg">Rounded (lg)</option>
                            <option value="md">Boxy (md)</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold text-neutral-500 uppercase">
                            Custom BG
                        </label>
                        <div className="mt-1 flex items-center gap-1.5">
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="h-7 w-8 cursor-pointer rounded border border-neutral-200 bg-transparent p-0.5"
                            />
                            <span className="font-mono text-[11px] text-neutral-500">
                                {bgColor}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold text-neutral-500 uppercase">
                            Custom Text
                        </label>
                        <div className="mt-1 flex items-center gap-1.5">
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="h-7 w-8 cursor-pointer rounded border border-neutral-200 bg-transparent p-0.5"
                            />
                            <span className="font-mono text-[11px] text-neutral-500">
                                {textColor}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Checkbox options */}
                <div className="mt-4 flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showIcon}
                            onChange={(e) => setShowIcon(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">
                            Sini Icon
                        </span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showExternal}
                            onChange={(e) => setShowExternal(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">
                            External Link Arrow
                        </span>
                    </label>
                </div>

                {/* Copy Code Bar */}
                <div className="mt-5 flex items-center justify-between rounded-xl bg-neutral-900 p-3 text-neutral-100 dark:bg-neutral-900">
                    <code className="text-xs text-neutral-300 font-mono truncate max-w-[340px] sm:max-w-md">
                        {generatedCode.replace(/\n\s+/g, " ")}
                    </code>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-neutral-700 active:scale-95 shrink-0"
                    >
                        {copied ? (
                            <>
                                <Check size={13} className="text-emerald-400" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={13} />
                                <span>Copy Code</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}