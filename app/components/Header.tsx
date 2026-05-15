"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  variant?: "light" | "dark";
}

const BAR_CLASS = `
  flex items-center justify-between
  py-3 md:py-3.5 lg:py-4 3xl:py-5
  pt-[max(0.75rem,env(safe-area-inset-top))]
  md:pt-[max(0.875rem,env(safe-area-inset-top))]
  lg:pt-[max(1rem,env(safe-area-inset-top))]
  3xl:pt-[max(1.25rem,env(safe-area-inset-top))]
  pl-[max(1rem,env(safe-area-inset-left))]
  sm:pl-[max(1.5rem,env(safe-area-inset-left))]
  lg:pl-[max(1.75rem,env(safe-area-inset-left))]
  xl:pl-[max(2rem,env(safe-area-inset-left))]
  pr-[max(1rem,env(safe-area-inset-right))]
  sm:pr-[max(1.5rem,env(safe-area-inset-right))]
  lg:pr-[max(1.75rem,env(safe-area-inset-right))]
  xl:pr-[max(2rem,env(safe-area-inset-right))]
  gap-4
`;

const LOGO_IMG_CLASS = `
  h-12 md:h-14 lg:h-16 3xl:h-18 w-auto
  max-w-full object-contain select-none
`;

const LOGO_LINK_CLASS = `
  inline-flex items-center min-h-11 -my-2.5 py-2.5
  shrink-0
`;

const NAV_TEXT_CLASS = `
  text-[10px] md:text-[11px] tracking-[0.15em] uppercase whitespace-nowrap
`;

const MENU_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Origins", href: "/origins" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Enquire", href: "/contact" },
] as const;

export default function Header({ variant = "light" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isLight = variant === "light";

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-[9999] ${BAR_CLASS}
          transition-colors duration-500
          ${isLight
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-sm border-b border-black/[0.06]"}
        `}
      >
        <Link href="/" aria-label="Copa + Glas home" className={LOGO_LINK_CLASS}>
          <Image
            src="/copa-monogram-white.png"
            alt="Copa + Glas"
            width={120}
            height={120}
            priority
            className={`${LOGO_IMG_CLASS} transition-[filter] duration-500 ${isLight ? "" : "invert"}`}
          />
        </Link>

        <nav
          className={`
            flex items-center gap-4 md:gap-6 lg:gap-8 shrink-0
            ${NAV_TEXT_CLASS}
            ${isLight ? "text-white" : "text-black"}
          `}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="
              bg-transparent border-none cursor-pointer
              text-inherit tracking-inherit uppercase font-inherit
              p-2.5 -m-2.5 min-h-11 min-w-11
              inline-flex items-center justify-center
            "
          >
            Menu
          </button>
        </nav>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-dark flex flex-col"
          >
            <div className={BAR_CLASS}>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                aria-label="Copa + Glas home"
                className={LOGO_LINK_CLASS}
              >
                <Image
                  src="/copa-monogram-white.png"
                  alt="Copa + Glas"
                  width={120}
                  height={120}
                  className={LOGO_IMG_CLASS}
                />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className={`
                  text-white bg-transparent border-none cursor-pointer
                  font-inherit p-2.5 -m-2.5 min-h-11 shrink-0
                  inline-flex items-center justify-center
                  ${NAV_TEXT_CLASS}
                `}
              >
                Close
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="
                flex-1 flex flex-col justify-center items-center
                gap-3 md:gap-5 font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.25rem,5vw,1.5rem)] md:text-[1.75rem] lg:text-4xl
                px-[max(1rem,env(safe-area-inset-left))] overflow-y-auto
              "
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {MENU_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-white no-underline
                    inline-flex items-center justify-center
                    min-h-12 px-8 py-3 leading-[1.15]
                  "
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>

            <div className="
              flex flex-col xs:flex-row justify-between items-start xs:items-center
              gap-3 xs:gap-4 text-[11px] tracking-[0.1em] text-white/50
              px-5 py-3.5 md:px-9 md:py-4 lg:px-14 3xl:px-[4.5rem]
              pb-[max(0.875rem,env(safe-area-inset-bottom))]
              pl-[max(1.25rem,env(safe-area-inset-left))]
              pr-[max(1.25rem,env(safe-area-inset-right))]
            ">
              <span className="shrink-0">East London Studio</span>
              <a
                href="mailto:info@copaandglas.com"
                className="text-white/50 no-underline break-all max-w-full"
              >
                info@copaandglas.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
