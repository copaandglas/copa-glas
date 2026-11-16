"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { riseStyle } from "@/app/lib/motion";

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
        <nav
          style={riseStyle(8, 0.5)}
          aria-label="Breadcrumb"
          className="rise flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.12em] uppercase mb-6 md:mb-8"
        >
          <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity">
            Home
          </Link>
          <span className="opacity-25 mx-2">/</span>
          <span className="opacity-90">Make Your Own</span>
        </nav>

        <p
          style={riseStyle(12, 0.55)}
          className="rise text-[10px] md:text-[11px] tracking-[0.15em] uppercase mb-4 md:mb-5"
        >
          Copa + Glas Studio
        </p>

        <h1
          style={riseStyle(16, 0.6, 0.05)}
          className="rise
            font-[family-name:var(--font-newsreader),Georgia,serif]
            text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] 3xl:text-[3.5rem]
            font-normal leading-[1.08] tracking-[0.02em]
            mb-6 md:mb-8 max-w-3xl
          "
        >
          Make Your Own
        </h1>

        <p
          style={riseStyle(8, 0.5, 0.08)}
          className="rise text-[10px] tracking-[0.18em] uppercase text-black/45 mb-6 md:mb-8"
        >
          Studio beta. Not part of the main collection.
        </p>

        <p
          style={riseStyle(16, 0.6, 0.1)}
          className="rise
            font-[family-name:var(--font-newsreader),Georgia,serif]
            text-[15px] md:text-base lg:text-[17px] leading-[1.85]
            max-w-2xl mb-14 md:mb-16 lg:mb-20
          "
        >
          Each work is copper and glass, shaped by hand in East London. Choose
          the glass for your room, see it lit and unlit, and send a note to the
          studio when it feels right.
        </p>

        <article
          style={riseStyle(20, 0.55, 0.12)}
          className="rise max-w-md"
        >
          <Link href="/configure/aura-wall-light" className="group block no-underline text-inherit">
            <div className="relative aspect-[4/5] bg-muted overflow-hidden mb-5">
              <Image
                src="/aura-wall-light-interior.webp"
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
            <h2 className="font-[family-name:var(--font-newsreader),Georgia,serif] text-xl md:text-2xl font-normal mb-2">
              Aura Wall Light
            </h2>
            <p className="font-[family-name:var(--font-newsreader),Georgia,serif] text-[15px] leading-[1.7] opacity-80 mb-3">
              A single pane of luminous art glass, held in hand-formed copper.
              Choose the glass, and see it lit and unlit.
            </p>
            <p className="text-[10px] tracking-[0.12em] uppercase opacity-45 mb-4">
              Bespoke · made to order
            </p>
            <span className="text-[10px] tracking-[0.15em] uppercase border-b border-black/25 pb-0.5 group-hover:border-black/80 transition-[border-color]">
              Choose your glass
            </span>
          </Link>
        </article>
      </div>

      <Footer />
    </div>
  );
}
