"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TimelineChapter {
  id: string;
  yearDisplay: string;
  yearShort: string;
  eyebrow: string;
  title: string;
  body: string;
  plateLetter: string;
  plateCaption: string;
  align: "left" | "right";
}

const chapters: TimelineChapter[] = [
  {
    id: "beginning",
    yearDisplay: "1897",
    yearShort: "1897",
    eyebrow: "The Beginning",
    title: "Luxfer Prism Company formed",
    body:
      "In 1897, the Luxfer Prism Company introduced a new approach to architectural glazing. Decorative, multi-paned fireproof windows held together using slim copper sections — a technique as precise as it was beautiful. For the first time, buildings could be designed around the controlled movement of light through structured glass.",
    plateLetter: "A",
    plateCaption: "Double doors — image to follow",
    align: "right",
  },
  {
    id: "process",
    yearDisplay: "1897",
    yearShort: "1897",
    eyebrow: "The Process",
    title: "A patented manufacturing process",
    body:
      "Luxfer's manufacturing process was protected by patent in the same year as the company's founding. The method — copper sections holding individual glass panes in precise geometric formations — was both technically innovative and visually refined. It became the foundation upon which an entire tradition of architectural glazing would be built.",
    plateLetter: "B",
    plateCaption: "Technical process — image to follow",
    align: "left",
  },
  {
    id: "reach",
    yearDisplay: "Early 1900s",
    yearShort: "1900s",
    eyebrow: "Global Reach",
    title: "Specified around the world",
    body:
      "The Luxfer technique spread with remarkable speed. From Shanghai to ocean liners crossing the Atlantic, architects and designers specified this glazing method for its structural elegance and its capacity to transform how light moved through built space. A technique born in one workshop became the language of a global architectural movement.",
    plateLetter: "C",
    plateCaption: "Shanghai and ship — image to follow",
    align: "right",
  },
  {
    id: "vision",
    yearDisplay: "1904 onwards",
    yearShort: "1904",
    eyebrow: "A New Vision",
    title: "Frank Lloyd Wright",
    body:
      "Frank Lloyd Wright saw something in the Luxfer technique that others had not. He understood the copper-section glazing method as an architectural language in its own right, developing entirely new geometric compositions and introducing art glass as a chromatic element. His Prairie Style windows, most notably at the Cheney House, Oak Park, 1903, remain among the most significant examples of the technique ever realised. What had been structural became sublime.",
    plateLetter: "D",
    plateCaption: "Art glass composition — image to follow",
    align: "left",
  },
];

export default function OriginsPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="light" />

      {/* ========== HERO ========== */}
      <section
        className="
          relative w-full bg-dark text-white overflow-hidden
          min-h-[100svh] flex flex-col
        "
      >
        {/* Ambient backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]
            "
          />
          <div
            className="
              absolute inset-0 opacity-[0.04]
              [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)]
              [background-size:64px_64px]
              [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]
            "
            aria-hidden
          />
        </div>

        {/* Hero content */}
        <div
          className="
            relative z-10 flex-1 flex flex-col justify-between
            pt-[max(7rem,calc(6.5rem+env(safe-area-inset-top)))]
            md:pt-[max(9rem,calc(7.5rem+env(safe-area-inset-top)))]
            lg:pt-[max(10.5rem,calc(8.5rem+env(safe-area-inset-top)))]
            pb-10 md:pb-14 lg:pb-16
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(3.5rem,env(safe-area-inset-left))]
            3xl:px-[max(5rem,env(safe-area-inset-left))]
          "
        >
          <div className="max-w-[1400px] 3xl:max-w-[1680px] w-full mx-auto">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: luxuryEase }}
              aria-label="Breadcrumb"
              className="
                flex flex-wrap items-center gap-y-1.5
                text-[10px] md:text-[11px] tracking-[0.18em] uppercase
                text-white/55 mb-12 md:mb-16 lg:mb-24
              "
            >
              <Link
                href="/"
                className="text-inherit no-underline hover:text-white/90 transition-colors"
              >
                Home
              </Link>
              <span className="mx-2 text-white/25">/</span>
              <span className="text-white/90">Origins</span>
            </motion.nav>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
              className="flex items-center gap-4 mb-6 md:mb-8 lg:mb-10"
            >
              <span className="block h-px w-10 md:w-14 bg-white/40" />
              <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-white/70">
                Origins
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: luxuryEase }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.5rem,8vw,5.75rem)]
                leading-[1.02] -tracking-[0.012em] font-normal
                max-w-[18ch] mb-8 md:mb-10 lg:mb-14
              "
            >
              A lineage over <em className="italic">a century</em> in the
              making.
            </motion.h1>

            {/* Intro paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: luxuryEase }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-[17px] lg:text-[19px] 3xl:text-xl
                leading-[1.7] text-white/75 max-w-[58ch]
              "
            >
              The glazing tradition behind Copa + Glas did not begin in our
              East London studio. It began in 1897, in the workshops of a
              company that changed how buildings related to light — a
              technique later transformed by one of architecture&apos;s great
              visionaries.
            </motion.p>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: luxuryEase }}
            className="
              relative z-10 max-w-[1400px] 3xl:max-w-[1680px] w-full mx-auto
              flex items-end justify-between gap-6 mt-16 md:mt-20
            "
          >
            <div className="flex items-center gap-3 md:gap-4">
              <span className="block h-px w-8 md:w-12 bg-white/30" />
              <span className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/45">
                Scroll · Five Chapters
              </span>
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="hidden md:block w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
              aria-hidden
            />
          </motion.div>
        </div>
      </section>

      {/* ========== TIMELINE TRACK ========== */}
      <section ref={trackRef} className="relative bg-white">
        {/* Sticky rail — desktop only */}
        <div
          aria-hidden
          className="
            hidden lg:block
            pointer-events-none absolute top-0 left-0 h-full
            w-[max(3.5rem,env(safe-area-inset-left))]
            3xl:w-[max(5rem,env(safe-area-inset-left))]
            z-10
          "
        >
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative h-[60vh] w-px bg-black/10 overflow-hidden">
              <motion.div
                style={{ scaleY: railScaleY, originY: 0 }}
                className="absolute inset-0 bg-black/60"
              />
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(5rem,env(safe-area-inset-left))]
            3xl:px-[max(7rem,env(safe-area-inset-left))]
          "
        >
          {chapters.map((chapter, index) => (
            <ChapterBlock
              key={chapter.id}
              chapter={chapter}
              index={index}
              isLast={index === chapters.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ========== PRESENT DAY (2024) ========== */}
      <section className="relative bg-offwhite border-t border-black/[0.06]">
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            grid grid-cols-1 lg:grid-cols-12
            gap-10 md:gap-14 lg:gap-20
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(3.5rem,env(safe-area-inset-left))]
            3xl:px-[max(5rem,env(safe-area-inset-left))]
            py-20 md:py-28 lg:py-36 3xl:py-44
          "
        >
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden">
              <Image
                src="/mondrian-mirror.png"
                alt="The Mondrian Mirror — a contemporary expression of the Luxfer copper-section technique"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              <div
                className="
                  absolute bottom-4 left-4 md:bottom-6 md:left-6
                  text-[10px] tracking-[0.18em] uppercase
                  text-white/95 px-2.5 py-1
                  bg-white/[0.12] backdrop-blur-xl
                  border border-white/25
                "
              >
                Studio piece — Mondrian Mirror
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-5 md:mb-6">
              <span className="block h-px w-10 md:w-14 bg-black/35" />
              <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase opacity-60">
                2024 · The Lineage Continues
              </p>
            </div>

            {/* Monogram */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 mb-6 md:mb-8 opacity-90">
              <Image
                src="/copa-monogram-white.png"
                alt="Copa + Glas monogram"
                fill
                sizes="56px"
                className="object-contain invert"
              />
            </div>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2rem,5vw,3.25rem)]
                leading-[1.08] -tracking-[0.005em] font-normal
                mb-6 md:mb-8
              "
            >
              Copa + Glas
            </h2>

            <div
              className="
                space-y-5 md:space-y-6
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
                leading-[1.8] opacity-[0.78] max-w-[58ch]
              "
            >
              <p>
                Honouring more than a century of glass innovation, Copa + Glas
                carries this lineage forward through hand-cut and ground
                mirrored panes. The original purpose of the glass has shifted:
                from bringing daylight into buildings, to reflecting,
                amplifying, and redistributing light within contemporary
                interiors.
              </p>
              <p>
                Every piece is made by hand in our East London studio using
                the same copper-section technique first developed by Luxfer
                in 1897. The tradition is unchanged. The materials are the
                same. The intention to create something of lasting beauty and
                significance has never wavered.
              </p>
            </div>

            <div className="mt-10 md:mt-12 lg:mt-14">
              <Link
                href="/collection"
                className="
                  inline-flex items-center gap-3
                  text-[10px] md:text-[11px] tracking-[0.22em] uppercase
                  text-white no-underline
                  py-4 px-7 md:py-[1.125rem] md:px-9
                  bg-dark
                  transition-colors duration-300
                  hover:bg-black
                "
              >
                <span>View the Collection</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Chapter block                                                             */
/* -------------------------------------------------------------------------- */

function ChapterBlock({
  chapter,
  index,
  isLast,
}: {
  chapter: TimelineChapter;
  index: number;
  isLast: boolean;
}) {
  const blockRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const isRight = chapter.align === "right";

  return (
    <article
      ref={blockRef}
      className={`
        relative grid grid-cols-1 lg:grid-cols-12
        gap-10 md:gap-14 lg:gap-16 3xl:gap-20
        py-20 md:py-28 lg:py-36 3xl:py-44
        ${!isLast ? "border-b border-black/[0.05]" : ""}
      `}
      aria-labelledby={`chapter-${chapter.id}-title`}
    >
      {/* Image plate */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1, ease: luxuryEase }}
        className={`
          lg:col-span-6
          ${isRight ? "lg:order-2" : "lg:order-1"}
        `}
      >
        <motion.div
          style={{ y: plateY }}
          className="relative will-change-transform"
        >
          <ImagePlate
            letter={chapter.plateLetter}
            caption={chapter.plateCaption}
            index={index}
          />
        </motion.div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: luxuryEase }}
        className={`
          lg:col-span-6 flex flex-col justify-center
          ${isRight ? "lg:order-1" : "lg:order-2"}
        `}
      >
        {/* Year + eyebrow */}
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-5 md:mb-6">
          <span
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] 3xl:text-[2.25rem]
              leading-none tracking-[0.01em] opacity-90
            "
          >
            {chapter.yearDisplay}
          </span>
          <span className="block h-px flex-1 max-w-16 bg-black/20" />
          <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
            {chapter.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h2
          id={`chapter-${chapter.id}-title`}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[clamp(1.75rem,4.2vw,2.75rem)]
            leading-[1.1] -tracking-[0.005em] font-normal
            mb-6 md:mb-8
            max-w-[22ch]
          "
        >
          {chapter.title}
        </h2>

        {/* Body */}
        <p
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
            leading-[1.8] opacity-[0.75]
            max-w-[58ch]
          "
        >
          {chapter.body}
        </p>
      </motion.div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Image plate (editorial placeholder)                                       */
/* -------------------------------------------------------------------------- */

function ImagePlate({
  letter,
  caption,
  index,
}: {
  letter: string;
  caption: string;
  index: number;
}) {
  return (
    <figure
      className="
        relative w-full aspect-[4/5]
        bg-faint border border-black/[0.06]
        overflow-hidden select-none
      "
    >
      {/* Subtle copper grid pattern — echoes Luxfer copper sections */}
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-[0.18]
          [background-image:linear-gradient(rgba(139,69,19,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,19,0.45)_1px,transparent_1px)]
          [background-size:80px_80px]
          [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]
        "
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_55%,transparent,rgba(0,0,0,0.05)_85%)]
        "
      />

      {/* Plate label — top-left */}
      <div
        className="
          absolute top-5 left-5 md:top-7 md:left-7
          flex items-center gap-3
          text-[10px] md:text-[11px] tracking-[0.22em] uppercase
          opacity-60
        "
      >
        <span>Plate</span>
        <span className="block h-px w-6 bg-black/35" />
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Large letter — editorial monogram */}
      <span
        className="
          absolute inset-0 flex items-center justify-center
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-[clamp(8rem,22vw,14rem)] leading-none
          text-black/[0.07] font-normal italic select-none
        "
        aria-hidden
      >
        {letter}
      </span>

      {/* Caption — bottom-left */}
      <figcaption
        className="
          absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7
          flex items-center gap-3
          text-[10px] md:text-[11px] tracking-[0.18em] uppercase
          opacity-60
        "
      >
        <span className="block h-px w-6 bg-black/35" />
        <span className="italic normal-case tracking-[0.04em] opacity-90">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
