"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

/* ─── Types ─── */
interface ArchiveItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  year: string;
}

/* ─── Archive content ─── */
const row1Left: ArchiveItem = {
  id: "mondrian-full",
  src: "/mondrian-mirror.png",
  alt: "Mondrian Mirror, bespoke commission, Chelsea",
  caption: "Mondrian Mirror",
  category: "Collection / Mirrors / Chelsea",
  year: "2022",
};
const row1Right: ArchiveItem = {
  id: "rotation-full",
  src: "/rotation-mirror.png",
  alt: "Rotation Mirror, copper and antiqued glass",
  caption: "Rotation Mirror",
  category: "Collection / Mirrors",
  year: "2024",
};
const row2Left: ArchiveItem = {
  id: "flw-mirror",
  src: "/frank-lloyd-wright-mirror.png",
  alt: "Frank Lloyd Wright-inspired mirror, archive commission",
  caption: "Taliesin Mirror",
  category: "Commission / Installation",
  year: "2019",
};
const row2Right: ArchiveItem = {
  id: "fibonacci-mantel",
  src: "/fibonacci-mirror-mantel.png",
  alt: "Fibonacci Mirror installed above mantel, Notting Hill",
  caption: "Fibonacci Mirror",
  category: "Collection / Mirrors / Notting Hill",
  year: "2023",
};
const row3Items: ArchiveItem[] = [
  {
    id: "aura-light",
    src: "/aura-wall-light.png",
    alt: "Aura Wall Light, brushed copper finish",
    caption: "Aura Wall Light",
    category: "Collection / Lighting",
    year: "2024",
  },
  {
    id: "rotation-close",
    src: "/rotation-mirror-close.png",
    alt: "Detail of copper frame, Rotation Mirror",
    caption: "Detail, Rotation",
    category: "Process / Workshop",
    year: "2024",
  },
  {
    id: "mondrian-close",
    src: "/mondrian-mirror-close.png",
    alt: "Detail of leaded glass, Mondrian Mirror",
    caption: "Detail, Mondrian",
    category: "Limited / Edition / Cage",
    year: "2022",
  },
];
const videoSide: ArchiveItem = {
  id: "founders",
  src: "/founders.png",
  alt: "The founders in the East London workshop",
  caption: "The Founders",
  category: "Studio / Portrait",
  year: "2020",
};

const mobileItems: ArchiveItem[] = [
  row1Left,
  row1Right,
  row2Left,
  row2Right,
  ...row3Items,
  videoSide,
  {
    id: "flw-plate",
    src: "/frank-lloyd-wright-plate.png",
    alt: "Frank Lloyd Wright archive reference plate",
    caption: "Archive Reference",
    category: "Research / Workshop",
    year: "2018",
  },
  {
    id: "fibonacci-close",
    src: "/fibonacci-mirror-close.png",
    alt: "Fibonacci Mirror, copper detail",
    caption: "Detail, Fibonacci",
    category: "Process / Workshop",
    year: "2023",
  },
];

/* Ordered list for lightbox navigation — all clickable image items */
const lightboxItems: ArchiveItem[] = [
  row1Left,
  row1Right,
  row2Left,
  row2Right,
  ...row3Items,
  videoSide,
];

/* ─── Category label with copper slashes ─── */
function CategoryLabel({ category, lightMode = false }: { category: string; lightMode?: boolean }) {
  const parts = category.split(" / ");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className={lightMode ? "text-accent/40" : "text-accent/50"}> / </span>
          )}
        </span>
      ))}
    </>
  );
}

/* ─── Image card with scroll animation + hover overlay ─── */
function ImageCard({
  item,
  imageClassName,
  className = "",
  sizes = "(max-width: 768px) 50vw, 33vw",
  delay = 0,
  priority = false,
  onOpen,
}: {
  item: ArchiveItem;
  imageClassName: string;
  className?: string;
  sizes?: string;
  delay?: number;
  priority?: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      onClick={onOpen}
    >
      <div className={`relative overflow-hidden bg-[#d9d4cd] shimmer ${imageClassName}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        {/* Gradient overlay + caption on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-5">
          <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <p className="text-white text-[12px] md:text-[13px] font-[family-name:var(--font-playfair),Georgia,serif] leading-snug italic">
              {item.caption}
            </p>
            <p className="text-white/45 text-[8px] tracking-[0.16em] uppercase mt-1.5">
              {item.year}
            </p>
          </div>
        </div>

        {/* Expand icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-[-4px] group-hover:translate-y-0">
          <div className="w-[26px] h-[26px] rounded-full bg-white/12 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption below */}
      <div className="pt-[9px] pb-4">
        <p className="text-[8px] tracking-[0.18em] uppercase text-black/30 font-medium leading-[2.2]">
          <CategoryLabel category={item.category} />
        </p>
        <div className="flex items-baseline justify-between gap-2 mt-[2px]">
          <p className="text-[11px] tracking-[0.025em] text-black/55 font-[family-name:var(--font-playfair),Georgia,serif]">
            {item.caption}
          </p>
          <span className="text-[8px] text-black/22 tracking-[0.08em] shrink-0 tabular-nums">
            {item.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({
  items,
  index,
  direction,
  onClose,
  onPrev,
  onNext,
}: {
  items: ArchiveItem[];
  index: number;
  direction: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchRef = useRef<number | null>(null);
  const item = items[index];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current === null) return;
    const diff = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? onNext() : onPrev();
    touchRef.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.2em] text-white/22 font-medium tabular-nums pointer-events-none">
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </span>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-[8px] tracking-[0.22em] uppercase text-white/35 hover:text-white transition-colors duration-200 font-medium py-2 px-1"
      >
        Close
      </button>

      {/* Image — directional slide */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -32 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[92vw] h-[70vh] sm:w-[85vw] sm:h-[76vh] md:w-[76vw] md:h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`cap-${index}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
          className="absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 text-center w-full px-10 pointer-events-none"
        >
          <p className="text-white/60 text-[12px] md:text-[13px] font-[family-name:var(--font-playfair),Georgia,serif] italic">
            {item.caption}
          </p>
          <p className="text-white/22 text-[7px] tracking-[0.2em] uppercase mt-2">
            <CategoryLabel category={item.category} lightMode />
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/25 hover:text-white/80 transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/25 hover:text-white/80 transition-colors duration-200"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ArchivePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxDir, setLightboxDir] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxDir(0);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevLightbox = useCallback(() => {
    setLightboxDir(-1);
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + lightboxItems.length) % lightboxItems.length : null
    );
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxDir(1);
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % lightboxItems.length : null
    );
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

  /* Scroll lock */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-[#f3f2f0]">
      <Header variant="dark" />

      {/* ── Header ──────────────────────────────────── */}
      <section
        className="
          pt-32 sm:pt-36 md:pt-44 lg:pt-52
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          pb-14 sm:pb-18 md:pb-22 lg:pb-28
          max-w-[1440px] mx-auto
        "
      >
        <p className="text-[9px] tracking-[0.22em] uppercase text-black/28 font-medium mb-9 sm:mb-11">
          Copa + Glas <span className="text-accent/60">/</span> Archive
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-20 lg:gap-36">
          <motion.h1
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(2.6rem,7.5vw,5.25rem)]
              font-normal leading-[1.04] text-black
            "
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Four decades
            <br />
            <em>of making.</em>
          </motion.h1>

          <motion.p
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[13px] sm:text-sm leading-[1.85] text-black/42
              max-w-[310px] md:text-right md:pb-0.5
            "
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            A visual record of the studio. Workshop processes,
            historical commissions, and the craft language that has
            shaped our practice since the beginning.
          </motion.p>
        </div>
      </section>

      {/* ── Editorial grid ──────────────────────────── */}
      <section
        className="
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        {/* Desktop (≥ md) */}
        <div className="hidden md:flex flex-col gap-1">

          {/* Row 1 — [2/3] [1/3] */}
          <div className="flex gap-1">
            <ImageCard
              item={row1Left}
              className="flex-[2]"
              imageClassName="h-[38vw] max-h-[545px]"
              sizes="(max-width: 1440px) 66vw, 960px"
              delay={0}
              priority
              onOpen={() => openLightbox(0)}
            />
            <ImageCard
              item={row1Right}
              className="flex-[1]"
              imageClassName="h-[38vw] max-h-[545px]"
              sizes="(max-width: 1440px) 33vw, 480px"
              delay={0.07}
              priority
              onOpen={() => openLightbox(1)}
            />
          </div>

          {/* Row 2 — [1/3] [2/3] */}
          <div className="flex gap-1">
            <ImageCard
              item={row2Left}
              className="flex-[1]"
              imageClassName="h-[34vw] max-h-[490px]"
              sizes="(max-width: 1440px) 33vw, 480px"
              delay={0.04}
              onOpen={() => openLightbox(2)}
            />
            <ImageCard
              item={row2Right}
              className="flex-[2]"
              imageClassName="h-[34vw] max-h-[490px]"
              sizes="(max-width: 1440px) 66vw, 960px"
              delay={0.1}
              onOpen={() => openLightbox(3)}
            />
          </div>

          {/* Row 3 — three equal thirds */}
          <div className="flex gap-1">
            {row3Items.map((item, i) => (
              <ImageCard
                key={item.id}
                item={item}
                className="flex-1"
                imageClassName="h-[30vw] max-h-[430px]"
                sizes="(max-width: 1440px) 33vw, 480px"
                delay={i * 0.07}
                onOpen={() => openLightbox(4 + i)}
              />
            ))}
          </div>

          {/* Row 4 — [video 2/3] [portrait 1/3] */}
          <div className="flex gap-1 items-start">

            {/* Video panel — not in lightbox */}
            <motion.div
              className="flex-[2] group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-[34vw] max-h-[490px] overflow-hidden bg-black">
                <Image
                  src="/heroimage.png"
                  alt="Copper workshop, hand-forming"
                  fill
                  sizes="(max-width: 1440px) 66vw, 960px"
                  className="object-cover opacity-52 transition-opacity duration-500 group-hover:opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-[54px] h-[54px] rounded-full border border-white/35 flex items-center justify-center"
                    whileHover={{ scale: 1.12, borderColor: "rgba(255,255,255,0.7)" }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg className="w-[18px] h-[18px] text-white ml-[3px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <p className="text-white/80 text-[9px] tracking-[0.2em] uppercase font-medium">
                    Behind the hand
                  </p>
                  <p className="text-white/32 text-[8px] tracking-[0.1em] uppercase mt-2">
                    A short film. Workshop, 2024
                  </p>
                </div>
              </div>
              <div className="pt-[9px] pb-4">
                <p className="text-[8px] tracking-[0.18em] uppercase text-black/30 font-medium leading-[2.2]">
                  Studio <span className="text-accent/50">/</span> Film
                </p>
              </div>
            </motion.div>

            <ImageCard
              item={videoSide}
              className="flex-[1]"
              imageClassName="h-[34vw] max-h-[490px]"
              sizes="(max-width: 1440px) 33vw, 480px"
              delay={0.07}
              onOpen={() => openLightbox(lightboxItems.indexOf(videoSide))}
            />
          </div>
        </div>

        {/* Mobile (< md): 2-column masonry */}
        <div className="md:hidden columns-2 gap-1">
          {mobileItems.map((item, i) => {
            const lbIndex = lightboxItems.findIndex((l) => l.id === item.id);
            return (
              <ImageCard
                key={item.id}
                item={item}
                imageClassName={i % 5 === 0 || i % 5 === 3 ? "aspect-[4/3]" : "aspect-[3/4]"}
                className="break-inside-avoid mb-1"
                delay={i * 0.04}
                onOpen={() => lbIndex >= 0 ? openLightbox(lbIndex) : undefined}
              />
            );
          })}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────── */}
      <div
        className="
          mx-5 sm:mx-8 md:mx-10 lg:mx-16 xl:mx-20
          mt-20 sm:mt-24 md:mt-32 lg:mt-40
          border-t border-accent/20
        "
      />

      {/* ── Pull quote + CTA ─────────────────────────── */}
      <motion.section
        className="
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          pt-12 sm:pt-14 md:pt-16
          pb-24 sm:pb-32 md:pb-40
          max-w-[1440px] mx-auto
          flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-24
        "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[460px]">
          <blockquote
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(0.95rem,2vw,1.25rem)]
              leading-[1.7] text-black/60 italic
            "
          >
            "The tradition is unchanged. The materials are the same.
            The intention to create something of lasting beauty and
            significance has never wavered."
          </blockquote>
          <p className="text-[8px] tracking-[0.18em] uppercase text-black/28 mt-5 font-medium">
            Copa + Glas
          </p>
        </div>

        <div className="md:text-right shrink-0">
          <p className="text-[8px] tracking-[0.2em] uppercase text-accent/50 font-medium mb-3.5">
            Related items
          </p>
          <Link
            href="/collection"
            className="
              text-[13px] font-[family-name:var(--font-playfair),Georgia,serif]
              text-black/55 hover:text-black
              underline underline-offset-4 decoration-black/12 hover:decoration-black/45
              transition-all duration-200
            "
          >
            View Collection →
          </Link>
        </div>
      </motion.section>

      <Footer />

      {/* ── Lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={lightboxItems}
            index={lightboxIndex}
            direction={lightboxDir}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
