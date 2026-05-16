"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

/* ─── Scroll-fade wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

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

/* ─── Shared image + caption card ─── */
function ImageCard({
  item,
  imageClassName,
  className = "",
  sizes = "(max-width: 768px) 50vw, 33vw",
}: {
  item: ArchiveItem;
  imageClassName: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className={`relative overflow-hidden bg-[#d9d4cd] ${imageClassName}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />
      </div>
      <div className="pt-[9px] pb-4">
        <p className="text-[8px] tracking-[0.18em] uppercase text-black/30 font-medium leading-[2.2]">
          {item.category.split(" / ").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-accent/50"> / </span>
              )}
            </span>
          ))}
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
    </div>
  );
}

/* ─── Page ─── */
export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[#f3f2f0]">
      <Header variant="dark" />

      {/* ── Header ────────────────────────────── */}
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
          <FadeIn>
            <h1
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.6rem,7.5vw,5.25rem)]
                font-normal leading-[1.04] text-black
              "
            >
              Four decades
              <br />
              <em>of making.</em>
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[13px] sm:text-sm leading-[1.85] text-black/42
                max-w-[310px] md:text-right md:pb-0.5
              "
            >
              A visual record of the studio. Workshop processes,
              historical commissions, and the craft language that has
              shaped our practice since the beginning.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Editorial grid ─────────────────────────── */}
      <section
        className="
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        {/* Desktop (≥ md): editorial flex rows */}
        <div className="hidden md:flex flex-col gap-1">

          {/* Row 1 — [large 2/3] [portrait 1/3] */}
          <FadeIn>
            <div className="flex gap-1">
              <ImageCard
                item={row1Left}
                className="flex-[2]"
                imageClassName="h-[38vw] max-h-[545px]"
                sizes="(max-width: 1440px) 66vw, 960px"
              />
              <ImageCard
                item={row1Right}
                className="flex-[1]"
                imageClassName="h-[38vw] max-h-[545px]"
                sizes="(max-width: 1440px) 33vw, 480px"
              />
            </div>
          </FadeIn>

          {/* Row 2 — [portrait 1/3] [large 2/3] */}
          <FadeIn delay={0.04}>
            <div className="flex gap-1">
              <ImageCard
                item={row2Left}
                className="flex-[1]"
                imageClassName="h-[34vw] max-h-[490px]"
                sizes="(max-width: 1440px) 33vw, 480px"
              />
              <ImageCard
                item={row2Right}
                className="flex-[2]"
                imageClassName="h-[34vw] max-h-[490px]"
                sizes="(max-width: 1440px) 66vw, 960px"
              />
            </div>
          </FadeIn>

          {/* Row 3 — three equal thirds */}
          <FadeIn delay={0.08}>
            <div className="flex gap-1">
              {row3Items.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  className="flex-1"
                  imageClassName="h-[30vw] max-h-[430px]"
                  sizes="(max-width: 1440px) 33vw, 480px"
                />
              ))}
            </div>
          </FadeIn>

          {/* Row 4 — [video 2/3] [portrait 1/3] */}
          <FadeIn delay={0.04}>
            <div className="flex gap-1 items-start">

              {/* Video panel */}
              <div className="flex-[2] group cursor-pointer">
                <div className="relative h-[34vw] max-h-[490px] overflow-hidden bg-black">
                  <Image
                    src="/heroimage.png"
                    alt="Copper workshop, hand-forming"
                    fill
                    sizes="(max-width: 1440px) 66vw, 960px"
                    className="object-cover opacity-52 transition-opacity duration-500 group-hover:opacity-42"
                  />
                  {/* Play ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="
                        w-[54px] h-[54px] rounded-full border border-white/38 flex items-center justify-center
                        group-hover:border-white/75 group-hover:scale-110
                        transition-all duration-350
                      "
                    >
                      <svg
                        className="w-[18px] h-[18px] text-white ml-[3px]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Overlay caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <p className="text-white/80 text-[9px] tracking-[0.2em] uppercase font-medium">
                      Behind the hand
                    </p>
                    <p className="text-white/36 text-[8px] tracking-[0.1em] uppercase mt-2">
                      A short film. Workshop, 2024
                    </p>
                  </div>
                </div>
                {/* Caption strip */}
                <div className="pt-[9px] pb-4">
                  <p className="text-[8px] tracking-[0.18em] uppercase text-black/30 font-medium leading-[2.2]">
                    Studio <span className="text-accent/50">/</span> Film
                  </p>
                </div>
              </div>

              <ImageCard
                item={videoSide}
                className="flex-[1]"
                imageClassName="h-[34vw] max-h-[490px]"
                sizes="(max-width: 1440px) 33vw, 480px"
              />
            </div>
          </FadeIn>
        </div>

        {/* Mobile (< md): 2-column masonry */}
        <div className="md:hidden columns-2 gap-1">
          {mobileItems.map((item, i) => (
            <FadeIn
              key={item.id}
              delay={i * 0.035}
              className="break-inside-avoid mb-1"
            >
              <ImageCard
                item={item}
                imageClassName={
                  i % 5 === 0 || i % 5 === 3
                    ? "aspect-[4/3]"
                    : "aspect-[3/4]"
                }
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Divider line ───────────────────────────── */}
      <div
        className="
          mx-5 sm:mx-8 md:mx-10 lg:mx-16 xl:mx-20
          max-w-[1440px] md:mx-auto
          mt-20 sm:mt-24 md:mt-32 lg:mt-40
          border-t border-accent/20
        "
      />

      {/* ── Pull quote + CTA ───────────────────────── */}
      <FadeIn>
        <section
          className="
            px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
            pt-12 sm:pt-14 md:pt-16
            pb-24 sm:pb-32 md:pb-40
            max-w-[1440px] mx-auto
            flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-24
          "
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
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
