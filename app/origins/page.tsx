"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type PlateTheme = "doors" | "process" | "global" | "art" | "present";

interface TimelineChapter {
  id: string;
  yearDisplay: string;
  yearShort: string;
  eyebrow: string;
  title: string;
  body: string;
  plateLetter: string;
  plateCaption: string;
  plateTheme: PlateTheme;
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
      "In 1897, the Luxfer Prism Company introduced a new approach to architectural glazing. Decorative, multi-paned fireproof windows held together using slim copper sections: a technique as precise as it was beautiful. For the first time, buildings could be designed around the controlled movement of light through structured glass.",
    plateLetter: "A",
    plateCaption: "DOUBLE DOORS · IMAGE TO FOLLOW",
    plateTheme: "doors",
    align: "right",
  },
  {
    id: "process",
    yearDisplay: "1897",
    yearShort: "1897",
    eyebrow: "The Process",
    title: "A patented manufacturing process",
    body:
      "Luxfer's manufacturing process was protected by patent in the same year as the company's founding. The method, copper sections holding individual glass panes in precise geometric formations, was both technically innovative and visually refined. It became the foundation upon which an entire tradition of architectural glazing would be built.",
    plateLetter: "B",
    plateCaption: "TECHNICAL PROCESS · IMAGE TO FOLLOW",
    plateTheme: "process",
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
    plateCaption: "SHANGHAI AND SHIP · IMAGE TO FOLLOW",
    plateTheme: "global",
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
    plateCaption: "ART GLASS COMPOSITION · IMAGE TO FOLLOW",
    plateTheme: "art",
    align: "left",
  },
];

const JUMP_NAV_ITEMS = [
  ...chapters.map((c) => ({
    id: c.id,
    yearShort: c.yearShort,
    label: c.eyebrow,
  })),
  { id: "present", yearShort: "2024", label: "Copa + Glas" },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function OriginsPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [headerVariant, setHeaderVariant] = useState<"light" | "dark">("light");
  const [activeChapterId, setActiveChapterId] = useState<string>("beginning");
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* Switch header variant based on hero visibility */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVariant(entry.isIntersecting ? "light" : "dark");
      },
      { threshold: 0.08 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  /* Track active chapter for jump-nav */
  useEffect(() => {
    const ids = [...chapters.map((c) => c.id), "present"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapterId(id);
        },
        { threshold: 0.35, rootMargin: "-20% 0px -45% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant={headerVariant} />

      {/* Sticky year jump-nav (desktop only) */}
      <JumpNav activeId={activeChapterId} />

      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
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

          {/* Faint monogram watermark, right side */}
          <div
            aria-hidden
            className="
              hidden md:block
              absolute top-1/2 right-[-4%] lg:right-[-2%] xl:right-[2%]
              -translate-y-1/2
              w-[44vw] max-w-[640px] aspect-square opacity-[0.06]
              pointer-events-none
            "
          >
            <Image
              src="/copa-monogram-white.png"
              alt=""
              fill
              sizes="44vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Hero content */}
        <div
          className="
            relative z-10 flex-1 flex flex-col
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
          <div
            className="
              max-w-[1400px] 3xl:max-w-[1680px] w-full mx-auto
              flex flex-col flex-1
            "
          >
            {/* Top bar: breadcrumb + year range */}
            <div
              className="
                flex items-start justify-between gap-6
                mb-12 md:mb-16 lg:mb-24
              "
            >
              <motion.nav
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
                aria-label="Breadcrumb"
                className="
                  flex flex-wrap items-center gap-y-1.5
                  text-[10px] md:text-[11px] tracking-[0.18em] uppercase
                  text-white/55
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

              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: luxuryEase }}
                className="hidden md:flex flex-col items-end text-right shrink-0"
                aria-label="Lineage span"
              >
                <span className="text-[9px] md:text-[10px] tracking-[0.32em] uppercase text-white/45 mb-1.5">
                  Lineage
                </span>
                <div className="flex items-baseline gap-3 md:gap-4">
                  <span
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem]
                      tabular-nums text-white/75
                    "
                  >
                    1897
                  </span>
                  <span
                    aria-hidden
                    className="block h-px w-8 md:w-12 bg-accent/70"
                  />
                  <span
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem]
                      tabular-nums text-white/95
                    "
                  >
                    2024
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Headline */}
            <motion.h1
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
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
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
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
              company that changed how buildings related to light, a
              technique later transformed by one of architecture&apos;s great
              visionaries.
            </motion.p>

            {/* Scroll cue */}
            <motion.a
              href="#beginning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: luxuryEase }}
              className="
                group mt-auto pt-16 md:pt-20 lg:pt-24
                inline-flex flex-col items-start gap-3
                self-start no-underline text-white/60
                hover:text-white/95 transition-colors duration-300
                cursor-pointer
              "
              aria-label="Begin the timeline"
            >
              <span className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase">
                Begin the Timeline
              </span>
              <div className="flex items-center gap-3">
                <motion.span
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 2.2, ease: "easeInOut", repeat: Infinity }
                  }
                  className="block w-px h-12 bg-gradient-to-b from-white/70 to-transparent"
                  aria-hidden
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-1"
                  aria-hidden
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="5 12 12 19 19 12" />
                </svg>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Soft gradient fade into white timeline */}
        <div
          aria-hidden
          className="
            absolute inset-x-0 bottom-0 h-32 md:h-40
            bg-gradient-to-b from-transparent via-dark/0 to-white
            pointer-events-none
          "
        />
      </section>

      {/* ========== TIMELINE TRACK ========== */}
      <section ref={trackRef} className="relative bg-white">
        {/* Sticky copper progress rail (desktop) */}
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
                className="absolute inset-0 bg-accent"
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
              chapterIndex={index}
              isLast={index === chapters.length - 1}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>
      </section>

      {/* ========== PRESENT DAY (2024) ========== */}
      <section
        id="present"
        className="relative bg-offwhite border-t border-black/[0.06] scroll-mt-24"
      >
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
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden">
              <Image
                src="/mondrian-mirror.png"
                alt="Studio piece, Mondrian Mirror"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
              <div
                className="
                  absolute bottom-4 left-4 md:bottom-6 md:left-6
                  text-[10px] tracking-[0.22em] uppercase
                  text-white/95 px-2.5 py-1
                  bg-white/[0.12] backdrop-blur-xl
                  border border-white/25
                "
              >
                STUDIO PIECE · MONDRIAN MIRROR
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center"
          >
            {/* Massive year + eyebrow */}
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6 md:mb-8">
              <span
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(3.5rem,8vw,6rem)]
                  leading-none tracking-[-0.01em] font-normal opacity-95
                "
              >
                2024
              </span>
              <span className="block h-px flex-1 max-w-16 bg-black/25" />
              <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
                The Lineage Continues
              </span>
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
                  group inline-flex items-center gap-3
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
/*  Jump nav (sticky right-side year navigator)                               */
/* -------------------------------------------------------------------------- */

function JumpNav({ activeId }: { activeId: string }) {
  return (
    <nav
      aria-label="Timeline chapters"
      className="
        hidden lg:flex flex-col gap-3 3xl:gap-3.5
        fixed top-1/2 -translate-y-1/2 z-40
        right-[max(1rem,env(safe-area-inset-right))]
        3xl:right-[max(1.75rem,env(safe-area-inset-right))]
      "
    >
      {JUMP_NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-3 justify-end no-underline cursor-pointer"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`
                text-right text-[10px] tracking-[0.22em] uppercase
                whitespace-nowrap
                transition-[opacity,transform,color] duration-500
                ${
                  isActive
                    ? "opacity-90 translate-x-0 text-dark"
                    : "opacity-0 translate-x-1 text-dark/60 group-hover:opacity-80 group-hover:translate-x-0"
                }
              `}
            >
              {item.yearShort} · {item.label}
            </span>
            <span
              aria-hidden
              className={`
                block h-px transition-all duration-500
                ${
                  isActive
                    ? "w-9 bg-accent"
                    : "w-5 bg-black/30 group-hover:w-7 group-hover:bg-black/60"
                }
              `}
            />
          </a>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Chapter block                                                             */
/* -------------------------------------------------------------------------- */

function ChapterBlock({
  chapter,
  chapterIndex,
  isLast,
  prefersReducedMotion,
}: {
  chapter: TimelineChapter;
  chapterIndex: number;
  isLast: boolean;
  prefersReducedMotion: boolean;
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
      id={chapter.id}
      className={`
        relative grid grid-cols-1 lg:grid-cols-12
        gap-10 md:gap-14 lg:gap-16 3xl:gap-20
        py-20 md:py-28 lg:py-36 3xl:py-44
        scroll-mt-24
        ${!isLast ? "border-b border-black/[0.05]" : ""}
      `}
      aria-labelledby={`chapter-${chapter.id}-title`}
    >
      {/* Image plate */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1, ease: luxuryEase }}
        className={`
          lg:col-span-6
          ${isRight ? "lg:order-2" : "lg:order-1"}
        `}
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { y: plateY }}
          className="relative will-change-transform"
        >
          <ImagePlate
            letter={chapter.plateLetter}
            caption={chapter.plateCaption}
            theme={chapter.plateTheme}
          />
        </motion.div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: luxuryEase }}
        className={`
          lg:col-span-6 flex flex-col justify-center
          ${isRight ? "lg:order-1" : "lg:order-2"}
        `}
      >
        {/* Chapter index + eyebrow */}
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <span className="text-[10px] md:text-[11px] tabular-nums tracking-[0.22em] opacity-45">
            {String(chapterIndex + 1).padStart(2, "0")} / 05
          </span>
          <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
          <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
            {chapter.eyebrow}
          </span>
        </div>

        {/* Oversized year */}
        <h3
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[clamp(3.5rem,9vw,7rem)]
            leading-[0.92] -tracking-[0.015em] font-normal
            mb-6 md:mb-8 lg:mb-10
            opacity-95
          "
          aria-label={`${chapter.yearDisplay}`}
        >
          {chapter.yearDisplay}
        </h3>

        {/* Title */}
        <h2
          id={`chapter-${chapter.id}-title`}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[clamp(1.5rem,3.2vw,2.125rem)]
            leading-[1.18] -tracking-[0.003em] font-normal italic
            opacity-[0.82]
            mb-6 md:mb-8
            max-w-[26ch]
          "
        >
          {chapter.title}
        </h2>

        {/* Body */}
        <p
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
            leading-[1.8] opacity-[0.7]
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
/*  Image plate (editorial placeholder, theme-aware)                          */
/* -------------------------------------------------------------------------- */

function ImagePlate({
  letter,
  caption,
  theme,
}: {
  letter: string;
  caption: string;
  theme: PlateTheme;
}) {
  return (
    <figure
      className="
        relative w-full aspect-[4/5]
        bg-faint border border-black/[0.06]
        overflow-hidden select-none
      "
    >
      {/* Theme-specific decoration */}
      <PlateDecoration theme={theme} />

      {/* Vignette */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_55%,transparent,rgba(0,0,0,0.05)_85%)]
        "
      />

      {/* Letter identifier (top-left) */}
      <span
        className="
          absolute top-5 left-5 md:top-7 md:left-7
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-[14px] md:text-[15px] tracking-[0.04em] opacity-70
          z-10
        "
        aria-hidden
      >
        {letter}
      </span>

      {/* Large letter watermark (centre) */}
      <span
        className="
          absolute inset-0 flex items-center justify-center
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-[clamp(8rem,22vw,14rem)] leading-none
          text-black/[0.06] font-normal italic select-none
          z-10
        "
        aria-hidden
      >
        {letter}
      </span>

      {/* PDF-style caption (bottom-left) */}
      <figcaption
        className="
          absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7
          text-[10px] md:text-[11px] tracking-[0.22em] opacity-60
          z-10
        "
      >
        {caption}
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Plate decoration variants                                                 */
/* -------------------------------------------------------------------------- */

function PlateDecoration({ theme }: { theme: PlateTheme }) {
  const COPPER = "rgba(139,69,19,0.42)";

  switch (theme) {
    case "doors": {
      /* Symmetric double-door composition */
      return (
        <div aria-hidden className="absolute inset-0">
          <svg
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-[0.35]"
          >
            <g stroke={COPPER} strokeWidth="1" fill="none">
              {/* Outer arched frame */}
              <path d="M 80 460 L 80 120 Q 80 60 200 60 Q 320 60 320 120 L 320 460" />
              <line x1="200" y1="60" x2="200" y2="460" />
              {/* Left door panes */}
              {[140, 200, 260, 320, 380].map((y) => (
                <line key={`l${y}`} x1="80" y1={y} x2="200" y2={y} />
              ))}
              {/* Right door panes */}
              {[140, 200, 260, 320, 380].map((y) => (
                <line key={`r${y}`} x1="200" y1={y} x2="320" y2={y} />
              ))}
              {/* Side rails */}
              <line x1="100" y1="120" x2="100" y2="460" />
              <line x1="300" y1="120" x2="300" y2="460" />
              {/* Floor line */}
              <line x1="20" y1="460" x2="380" y2="460" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      );
    }

    case "process": {
      /* Engineering / technical drawing */
      return (
        <div aria-hidden className="absolute inset-0">
          {/* Faint copper grid */}
          <div
            className="
              absolute inset-0 opacity-[0.18]
              [background-image:linear-gradient(rgba(139,69,19,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,19,0.45)_1px,transparent_1px)]
              [background-size:48px_48px]
              [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_88%)]
            "
          />
          <svg
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-[0.45]"
          >
            <g stroke={COPPER} strokeWidth="0.75" fill="none">
              {/* Central pane diagram */}
              <rect x="140" y="180" width="120" height="160" />
              <line x1="140" y1="260" x2="260" y2="260" />
              <line x1="200" y1="180" x2="200" y2="340" />
              {/* Dimension lines */}
              <line x1="100" y1="180" x2="100" y2="340" />
              <line x1="95" y1="180" x2="105" y2="180" />
              <line x1="95" y1="340" x2="105" y2="340" />
              <line x1="140" y1="380" x2="260" y2="380" />
              <line x1="140" y1="375" x2="140" y2="385" />
              <line x1="260" y1="375" x2="260" y2="385" />
              {/* Crosshair */}
              <line x1="200" y1="240" x2="200" y2="280" strokeWidth="0.4" />
              <line x1="180" y1="260" x2="220" y2="260" strokeWidth="0.4" />
              <circle cx="200" cy="260" r="3" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      );
    }

    case "global": {
      /* Horizon line + cardinal markers */
      return (
        <div aria-hidden className="absolute inset-0">
          <svg
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-[0.35]"
          >
            <g stroke={COPPER} fill="none" strokeWidth="0.75">
              {/* Horizon */}
              <line x1="20" y1="260" x2="380" y2="260" />
              {/* Subtle arcs (globe latitudes) */}
              <ellipse cx="200" cy="260" rx="180" ry="32" strokeWidth="0.5" />
              <ellipse cx="200" cy="260" rx="120" ry="22" strokeWidth="0.5" />
              <ellipse cx="200" cy="260" rx="60" ry="12" strokeWidth="0.5" />
              {/* Vertical meridian */}
              <line x1="200" y1="180" x2="200" y2="340" strokeWidth="0.5" />
              {/* Cardinal ticks */}
              <line x1="200" y1="170" x2="200" y2="180" />
              <line x1="200" y1="340" x2="200" y2="350" />
              <line x1="20" y1="260" x2="30" y2="260" />
              <line x1="370" y1="260" x2="380" y2="260" />
            </g>
            <g
              fill={COPPER}
              fontSize="9"
              letterSpacing="2"
              textAnchor="middle"
              fontFamily="var(--font-playfair), Georgia, serif"
              opacity="0.8"
            >
              <text x="200" y="160">N</text>
              <text x="200" y="365">S</text>
              <text x="14" y="265">W</text>
              <text x="386" y="265">E</text>
            </g>
          </svg>
        </div>
      );
    }

    case "art": {
      /* Mondrian-style geometric pane composition */
      return (
        <div aria-hidden className="absolute inset-0">
          <svg
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
          >
            {/* Soft chromatic panes */}
            <g opacity="0.22">
              <rect x="60" y="80" width="120" height="120" fill="#c19a6b" />
              <rect x="220" y="80" width="120" height="60" fill="#8b4513" opacity="0.6" />
              <rect x="220" y="160" width="60" height="120" fill="#3a5a78" opacity="0.5" />
              <rect x="60" y="220" width="60" height="180" fill="#9b8164" opacity="0.4" />
              <rect x="160" y="260" width="180" height="140" fill="#c19a6b" opacity="0.35" />
            </g>
            {/* Copper section lines */}
            <g stroke={COPPER} strokeWidth="1.5" fill="none">
              <rect x="60" y="80" width="280" height="320" />
              <line x1="180" y1="80" x2="180" y2="400" />
              <line x1="60" y1="200" x2="340" y2="200" />
              <line x1="220" y1="80" x2="220" y2="400" />
              <line x1="60" y1="260" x2="340" y2="260" />
              <line x1="280" y1="200" x2="280" y2="400" />
            </g>
          </svg>
        </div>
      );
    }

    default:
      return null;
  }
}
