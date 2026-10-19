"use client"

import { useState, JSX } from "react"
import Button from "../Button/Button"
import logo from "../../assets/logo.png"
import Link from "next/link"
import { KewtiGursha } from "@workspace/ui/components/kewti-gursha/component"

interface NavLinkItem {
  label: string
  href: string
  external?: boolean
}

export default function Navbar({
  logotext,
}: {
  logotext?: React.JSX.Element
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const DOCS_PAGE = process.env.NEXT_PUBLIC_DOCS_PAGE || ""

  const navLinks: NavLinkItem[] = [
    { label: "Npm", href: "https://www.npmjs.com/package/kewti-cli", external: true },
    { label: "Github", href: "https://github.com/coderade1905/kewti", external: true },
    { label: "Docs", href: `${DOCS_PAGE}/docs`, external: true },
    { label: "Fonts", href: "/fonts", external: false },
    { label: "Logos", href: "/logos", external: false },
  ]

  // Handles static imports vs Next.js image object imports safely
  const logoSrc = typeof logo === "string" ? logo : logo.src

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={closeMenu}>
          <img
            src={logoSrc}
            alt="kewti"
            className="h-5 w-auto object-contain"
          />
          {logotext}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <KewtiGursha
            handle="kewti"
            text="ቡና ግዙ"
            variant="gursha"
            size="sm"
          />
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${DOCS_PAGE}/docs`}
          >
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-white focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {isOpen ? (
                /* Close Icon (X) */
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                /* Hamburger Icon */
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute left-4 right-4 top-full z-50 mt-1 rounded-2xl border border-neutral-800/80 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-neutral-300 transition-colors hover:bg-neutral-800/60 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-neutral-300 transition-colors hover:bg-neutral-800/60 hover:text-white"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-neutral-800/60 pt-4">
            <KewtiGursha
              handle="kewti"
              text="ቡና ግዙ"
              variant="gursha"
              size="md"
              className="w-full justify-center"
            />
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`${DOCS_PAGE}/docs`}
              onClick={closeMenu}
              className="block w-full"
            >
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}