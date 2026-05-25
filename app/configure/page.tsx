"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ConfigurePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      <div
        className="
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-16 md:pb-20 lg:pb-24
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
          max-w-[1400px] 3xl:max-w-[1680px] mx-auto
        "
      >
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase }}
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.12em] uppercase mb-6 md:mb-8"
        >
          <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">
            Home
          </Link>
          <span className="opacity-25 mx-2">/</span>
          <span className="opacity-90">Make Your Own</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: luxuryEase }}
          className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase mb-4 md:mb-5 opacity-75"
        >
          Copa + Glas Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: luxuryEase }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] 3xl:text-[3.5rem]
            font-normal leading-[1.08] tracking-[0.02em]
            mb-6 md:mb-8 max-w-3xl
          "
        >
          Make Your Own
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: luxuryEase }}
          className="text-[10px] tracking-[0.18em] uppercase text-black/45 mb-6 md:mb-8"
        >
          Studio beta — not part of the main collection
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[15px] md:text-base lg:text-[17px] leading-[1.85] opacity-[0.88]
            max-w-2xl mb-14 md:mb-16 lg:mb-20
          "
        >
          Each piece holds glass and copper shaped by hand in East London. Choose the
          iridescent finish that belongs in your room, lift the light, and send your
          note when the piece feels like yours.
        </motion.p>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: luxuryEase }}
          className="max-w-md"
        >
          <Link href="/configure/aura-wall-light" className="group block no-underline text-inherit">
            <div className="relative aspect-[4/5] bg-muted overflow-hidden mb-5">
              <Image
                src="/aura-wall-light.png"
                alt="Aura Wall Light"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase bg-white/90 px-3 py-1.5">
                Beta
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair),Georgia,serif] text-xl md:text-2xl font-normal mb-2">
              Aura Wall Light
            </h2>
            <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] leading-[1.7] opacity-80 mb-3">
              A single pane of iridescent art glass at the centre — choose yours, and
              watch the room change around it. Made to a standard size, or yours
              entirely.
            </p>
            <p className="text-[10px] tracking-[0.12em] uppercase opacity-45 mb-4">
              300 × 415 mm — custom sizing available
            </p>
            <span className="text-[10px] tracking-[0.15em] uppercase border-b border-black/25 pb-0.5 group-hover:border-black/80 transition-[border-color]">
              Step inside
            </span>
          </Link>
        </motion.article>
      </div>

      <Footer />
    </div>
  );
}
