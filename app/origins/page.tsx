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

interface TimelineChapter {
  id: string;
  yearDisplay: string;
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
    eyebrow: "The Beginning",
    title: "Luxfer Prism Company formed",
    body:
      "In 1897, the Luxfer Prism Company introduced a new approach to architectural glazing. Decorative, multi-paned fireproof windows held together using slim copper sections: a technique as precise as it was beautiful. For the first time, buildings could be designed around the controlled movement of light through structured glass.",
    plateLetter: "A",
    plateCaption: "DOUBLE DOORS · IMAGE TO FOLLOW",
    align: "right",
  },
  {
    id: "process",
    yearDisplay: "1897",
    eyebrow: "The Process",
    title: "A patented manufacturing process",
    body:
      "Luxfer's manufacturing process was protected by patent in the same year as the company's founding. The method, copper sections holding individual glass panes in precise geometric formations, was both technically innovative and visually refined. It became the foundation upon which an entire tradition of architectural glazing would be built.",
    plateLetter: "B",
    plateCaption: "TECHNICAL PROCESS · IMAGE TO FOLLOW",
    align: "left",
  },
  {
    id: "reach",
    yearDisplay: "Early 1900s",
    eyebrow: "Global Reach",
    title: "Specified around the world",
    body:
      "The Luxfer technique spread with remarkable speed. From Shanghai to ocean liners crossing the Atlantic, architects and designers specified this glazing method for its structural elegance and its capacity to transform how light moved through built space. A technique born in one workshop became the language of a global architectural movement.",
    plateLetter: "C",
    plateCaption: "SHANGHAI AND SHIP · IMAGE TO FOLLOW",
    align: "right",
  },
  {
    id: "vision",
    yearDisplay: "1904 onwards",
    eyebrow: "A New Vision",
    title: "Frank Lloyd Wright",
    body:
      "Frank Lloyd Wright saw something in the Luxfer technique that others had not. He understood the copper-section glazing method as an architectural language in its own right, developing entirely new geometric compositions and introducing art glass as a chromatic element. His Prairie Style windows, most notably at the Cheney House, Oak Park, 1903, remain among the most significant examples of the technique ever realised. What had been structural became sublime.",
    plateLetter: "D",
    plateCaption: "ART GLASS COMPOSITION · IMAGE TO FOLLOW",
    align: "left",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function OriginsPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [headerVariant, setHeaderVariant] = useState<"light" | "dark">("light");
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* Header swap based on hero visibility */
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

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant={headerVariant} />

      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="
          relative w-full bg-dark text-white overflow-hidden
          min-h-[100svh] flex flex-col
        "
      >
        {/* Soft ambient backdrop */}
        <div
          aria-hidden
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]
            pointer-events-none
          "
        />

        {/* Hero content */}
        <div
          className="
            relative z-10 flex-1 flex flex-col
            pt-[max(7rem,calc(6.5rem+env(safe-area-inset-top)))]
            md:pt-[max(9rem,calc(7.5rem+env(safe-area-inset-top)))]
            lg:pt-[max(10.5rem,calc(8.5rem+env(safe-area-inset-top)))]
            pb-14 md:pb-18 lg:pb-24
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
            {/* Breadcrumb */}
            <motion.nav
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: luxuryEase }}
              aria-label="Breadcrumb"
              className="
                flex flex-wrap items-center gap-y-1.5
                text-[10px] md:text-[11px] tracking-[0.18em] uppercase
                text-white/55 mb-14 md:mb-20 lg:mb-28
              "
            >
              <Link
                href="/"
                className="text-inherit no-underline hover:text-white/90 transition-colors duration-500"
              >
                Home
              </Link>
              <span className="mx-2 text-white/25">/</span>
              <span className="text-white/90">Origins</span>
            </motion.nav>

            {/* Headline */}
            <motion.h1
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.15, ease: luxuryEase }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.5rem,8vw,5.75rem)]
                leading-[1.02] -tracking-[0.012em] font-normal
                max-w-[18ch] mb-10 md:mb-12 lg:mb-16
              "
            >
              A lineage over <em className="italic">a century</em> in the
              making.
            </motion.h1>

            {/* Intro paragraph */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.32, ease: luxuryEase }}
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

            {/* Quiet scroll line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: luxuryEase }}
              className="mt-auto pt-16 md:pt-20 lg:pt-24"
              aria-hidden
            >
              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scaleY: [0.4, 1, 0.4], opacity: [0.35, 0.85, 0.35] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 3.2, ease: "easeInOut", repeat: Infinity }
                }
                style={{ transformOrigin: "top" }}
                className="block w-px h-14 bg-white/40"
              />
            </motion.div>
          </div>
        </div>

        {/* Soft gradient fade into the timeline */}
        <div
          aria-hidden
          className="
            absolute inset-x-0 bottom-0 h-32 md:h-40
            bg-gradient-to-b from-transparent to-white
            pointer-events-none
          "
        />
      </section>

      {/* ========== TIMELINE ========== */}
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
            <div className="relative h-[60vh] w-px bg-black/[0.08] overflow-hidden">
              <motion.div
                style={{ scaleY: railScaleY, originY: 0 }}
                className="absolute inset-0 bg-accent"
              />
            </div>
          </div>
        </div>

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
              isLast={index === chapters.length - 1}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>
      </section>

      {/* ========== PRESENT DAY (2024) ========== */}
      <section
        id="present"
        className="relative bg-white border-t border-accent/25"
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
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1.3, ease: luxuryEase }}
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
                  text-[10px] tracking-[0.22em]
                  text-white/95 px-2.5 py-1
                  bg-white/[0.12] backdrop-blur-xl
                  border border-white/25
                "
              >
                STUDIO PIECE · MONDRIAN MIRROR
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center"
          >
            <div className="flex items-baseline flex-wrap gap-x-5 gap-y-2 mb-8 md:mb-10">
              <span
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(3.5rem,8vw,6rem)]
                  leading-none tracking-[-0.01em] font-normal opacity-95
                "
              >
                2024
              </span>
              <span aria-hidden className="block h-px flex-1 max-w-14 bg-black/25" />
              <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
                The Lineage Continues
              </span>
            </div>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2rem,5vw,3.25rem)]
                leading-[1.08] -tracking-[0.005em] font-normal
                mb-8 md:mb-10
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

            <div className="mt-12 md:mt-14 lg:mt-16">
              <Link
                href="/collection"
                className="
                  group inline-flex items-center gap-3
                  text-[10px] md:text-[11px] tracking-[0.22em] uppercase
                  text-white no-underline
                  py-4 px-7 md:py-[1.125rem] md:px-9
                  bg-dark
                  transition-colors duration-500
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
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
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
  isLast,
  prefersReducedMotion,
}: {
  chapter: TimelineChapter;
  isLast: boolean;
  prefersReducedMotion: boolean;
}) {
  const isRight = chapter.align === "right";

  return (
    <article
      id={chapter.id}
      className={`
        relative grid grid-cols-1 lg:grid-cols-12
        gap-10 md:gap-14 lg:gap-16 3xl:gap-20
        py-24 md:py-32 lg:py-40 3xl:py-48
        scroll-mt-24
        ${!isLast ? "border-b border-black/[0.05]" : ""}
      `}
      aria-labelledby={`chapter-${chapter.id}-title`}
    >
      {/* Image plate */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.4, ease: luxuryEase }}
        className={`
          lg:col-span-6
          ${isRight ? "lg:order-2" : "lg:order-1"}
        `}
      >
        <ImagePlate
          letter={chapter.plateLetter}
          caption={chapter.plateCaption}
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.3, delay: 0.1, ease: luxuryEase }}
        className={`
          lg:col-span-6 flex flex-col justify-center
          ${isRight ? "lg:order-1" : "lg:order-2"}
        `}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-5 md:mb-7">
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
        >
          {chapter.yearDisplay}
        </h3>

        {/* Italic subtitle (title) */}
        <h2
          id={`chapter-${chapter.id}-title`}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[clamp(1.5rem,3.2vw,2.125rem)]
            leading-[1.18] -tracking-[0.003em] font-normal italic
            opacity-[0.82]
            mb-7 md:mb-9
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
/*  Image plate (uniform, quiet)                                              */
/* -------------------------------------------------------------------------- */

function ImagePlate({ letter, caption }: { letter: string; caption: string }) {
  return (
    <figure
      className="
        relative w-full aspect-[4/5]
        bg-faint border border-black/[0.06]
        overflow-hidden select-none
      "
    >
      {/* Vignette */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_55%,transparent,rgba(0,0,0,0.04)_85%)]
        "
      />

      {/* Letter identifier */}
      <span
        className="
          absolute top-5 left-5 md:top-7 md:left-7
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-[14px] md:text-[15px] tracking-[0.04em] opacity-70
        "
        aria-hidden
      >
        {letter}
      </span>

      {/* Large letter watermark */}
      <span
        className="
          absolute inset-0 flex items-center justify-center
          font-[family-name:var(--font-playfair),Georgia,serif]
          text-[clamp(8rem,22vw,14rem)] leading-none
          text-black/[0.06] font-normal italic select-none
        "
        aria-hidden
      >
        {letter}
      </span>

      {/* Caption */}
      <figcaption
        className="
          absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7
          text-[10px] md:text-[11px] tracking-[0.22em] opacity-55
        "
      >
        {caption}
      </figcaption>
    </figure>
  );
}
