"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

interface CollectionPiece {
  slug: string;
  name: string;
  dimension: string;
  image: string;
  hoverImage?: string;
}

const firstCollection: CollectionPiece[] = [
  {
    slug: "mondrian-mirror",
    name: "The Mondrian",
    dimension: "69.5 × 100.5cm",
    image: "/mondrian-mirror.png",
    hoverImage: "/mondrian-mirror-close.png",
  },
  {
    slug: "rotation-mirror",
    name: "The Rotation",
    dimension: "97cm Ø",
    image: "/rotation-mirror.png",
    hoverImage: "/rotation-mirror-close.png",
  },
  {
    slug: "fibonacci-mirror",
    name: "The Fibonacci",
    dimension: "65 × 90cm",
    image: "/fibonacci-mirror-mantel.png",
    hoverImage: "/fibonacci-mirror-close.png",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const initialY = (n: number) =>
    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: n };

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      {/* ========== HERO ========== */}
      <section
        className="
          relative bg-white
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-14 md:pb-20 lg:pb-28
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">
          <motion.nav
            initial={initialY(8)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            aria-label="Breadcrumb"
            className="
              flex flex-wrap items-center gap-y-1.5
              text-[10px] md:text-[11px] tracking-[0.18em] uppercase
              mb-12 md:mb-16 lg:mb-24
            "
          >
            <Link
              href="/"
              className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500"
            >
              Home
            </Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">About</span>
          </motion.nav>

          {/* Eyebrow */}
          <motion.div
            initial={initialY(10)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.05, ease: luxuryEase }}
            className="flex items-center gap-4 mb-7 md:mb-9 lg:mb-12"
          >
            <span aria-hidden className="block h-px w-10 md:w-14 bg-black/30" />
            <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase opacity-65">
              The Studio
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={initialY(18)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.12, ease: luxuryEase }}
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(2.5rem,8vw,5.75rem)]
              leading-[1.02] -tracking-[0.012em] font-normal
              max-w-[18ch] mb-10 md:mb-12 lg:mb-16
            "
          >
            Inspired by <em className="italic">craftsmanship.</em>
          </motion.h1>

          {/* Lead paragraph */}
          <motion.p
            initial={initialY(14)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.28, ease: luxuryEase }}
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[15px] md:text-[17px] lg:text-[19px] 3xl:text-xl
              leading-[1.7] opacity-[0.75] max-w-[58ch]
            "
          >
            Copa + Glas is an East London design studio working in copper and
            glass. Every piece is designed and made by hand, drawn from a
            tradition of architectural glazing more than a century old.
          </motion.p>
        </div>
      </section>

      {/* ========== FOUNDED ========== */}
      <EditorialSection
        eyebrow="Founded 2021"
        title="A studio born of practice."
        prefersReducedMotion={!!prefersReducedMotion}
      >
        <p>
          Copa + Glas was founded in 2021 by craftsman Anthony McCarty and
          designer Bradley Lloyd. What began as a workshop conversation has
          grown into a small studio of skilled craftspeople, comfortable
          across materials, processes, and brief.
        </p>
        <p>
          The studio was born of a directional, sustainable, and deeply
          personal approach to making — working with two materials above all
          others: copper and glass.
        </p>
      </EditorialSection>

      {/* ========== ANTHONY (image-text split) ========== */}
      <section
        className="
          relative bg-white border-t border-accent/20
          py-20 md:py-28 lg:py-36 3xl:py-44
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            grid grid-cols-1 lg:grid-cols-12
            gap-10 md:gap-14 lg:gap-20
          "
        >
          <motion.div
            initial={initialY(28)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.3, ease: luxuryEase }}
            className="lg:col-span-6"
          >
            <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden">
              <Image
                src="/heroimage.png"
                alt="Anthony McCarty at work in the East London studio"
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
                IN THE STUDIO · EAST LONDON
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={initialY(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.3, delay: 0.1, ease: luxuryEase }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-5 md:mb-7">
              <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
              <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
                Anthony McCarty
              </span>
            </div>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2rem,5vw,3.25rem)]
                leading-[1.1] -tracking-[0.005em] font-normal
                mb-7 md:mb-9
              "
            >
              A craftsman&apos;s lineage.
            </h2>

            <div
              className="
                space-y-5 md:space-y-6
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
                leading-[1.8] opacity-[0.75] max-w-[58ch]
              "
            >
              <p>
                Anthony brings decades of practice and an extensive knowledge
                of historical glazing techniques. His past commissions include
                conservation work on the Elizabeth Tower at Westminster, the
                clock tower better known as Big Ben.
              </p>
              <p>
                He specialises in reviving methods that have been overlooked
                or forgotten, and in adapting them for contemporary interiors.
                The studio&apos;s vocabulary is built on that craft.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 1898 COLLECTION ========== */}
      <section
        className="
          relative bg-white border-t border-accent/20
          py-20 md:py-28 lg:py-36 3xl:py-44
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">
          <motion.div
            initial={initialY(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.3, ease: luxuryEase }}
            className="max-w-3xl mb-14 md:mb-20 lg:mb-24"
          >
            <div className="flex items-center gap-4 mb-5 md:mb-7">
              <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
              <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
                1898 · The First Collection
              </span>
            </div>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2rem,5vw,3.25rem)]
                leading-[1.1] -tracking-[0.005em] font-normal
                mb-7 md:mb-9
              "
            >
              A progression of copper-light glazing.
            </h2>

            <div
              className="
                space-y-5 md:space-y-6
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
                leading-[1.8] opacity-[0.75] max-w-[58ch]
              "
            >
              <p>
                Our first collection, <em className="italic">1898</em>,
                gathers a series of bespoke industrial copper mirrors: The
                Mondrian, The Luxfer, The Rotation, and the most recent
                addition, The Fibonacci. Each is a progression of the
                copper-light glazing technique whose roots reach back more
                than a century.
              </p>
              <p>
                Every mirror is composed of hand-cut panes set within a
                framework of pure, solid copper. The result is multifaceted,
                deliberate, made one pane at a time.
              </p>
            </div>
          </motion.div>

          {/* Mirror grid */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-x-5 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 3xl:gap-x-10
              gap-y-10 sm:gap-y-10 md:gap-y-12 lg:gap-y-14
            "
          >
            {firstCollection.map((piece, i) => (
              <motion.div
                key={piece.slug}
                initial={initialY(24)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
                transition={{
                  duration: 1.1,
                  delay: Math.min(i * 0.08, 0.24),
                  ease: luxuryEase,
                }}
              >
                <Link
                  href={`/product/${piece.slug}`}
                  className="group block text-inherit no-underline"
                  aria-label={`View ${piece.name}`}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`
                        object-cover will-change-[transform,opacity]
                        transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                        group-hover:scale-[1.03] group-hover:duration-[1500ms]
                        ${piece.hoverImage ? "sm:group-hover:opacity-0" : ""}
                      `}
                    />
                    {piece.hoverImage && (
                      <Image
                        src={piece.hoverImage}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="
                          hidden sm:block object-cover will-change-[transform,opacity]
                          opacity-0
                          transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
                          group-hover:opacity-100 group-hover:scale-[1.03] group-hover:duration-[1500ms]
                          pointer-events-none
                        "
                      />
                    )}
                  </div>

                  <div className="pt-4 sm:pt-4 md:pt-5 lg:pt-6 flex items-baseline justify-between gap-3">
                    <h3
                      className="
                        font-[family-name:var(--font-playfair),Georgia,serif]
                        text-[1.25rem] md:text-[1.25rem] lg:text-[1.375rem] 3xl:text-[1.5rem]
                        font-normal leading-[1.2] tracking-[0.01em]
                      "
                    >
                      {piece.name}
                    </h3>
                    <span className="text-[11px] md:text-[12px] tracking-[0.08em] uppercase opacity-55 shrink-0">
                      {piece.dimension}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== THE TECHNIQUE ========== */}
      <EditorialSection
        eyebrow="The Technique"
        title="Precise, but never rigid."
        prefersReducedMotion={!!prefersReducedMotion}
      >
        <p>
          The technique is precise but flexible. Scale, shape, and composition
          can be adapted to suit a particular space, an architect&apos;s brief,
          or a private commission.
        </p>
        <p>
          Mirrors can be made to order, in small batches, or as singular
          pieces. Each one carries the same hand, the same materials, and the
          same intention.
        </p>
      </EditorialSection>

      {/* ========== COMMISSIONS CTA ========== */}
      <section
        className="
          relative bg-faint border-t border-accent/20
          py-20 md:py-28 lg:py-36 3xl:py-40
        "
      >
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(3.5rem,env(safe-area-inset-left))]
            3xl:px-[max(5rem,env(safe-area-inset-left))]
            grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end
          "
        >
          <motion.div
            initial={initialY(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-5 md:mb-7">
              <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
              <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
                Commissions
              </span>
            </div>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.875rem,4.5vw,3rem)]
                leading-[1.12] -tracking-[0.005em] font-normal
                max-w-[26ch] mb-7 md:mb-9
              "
            >
              The studio is open to commission, collaboration, and conversation.
            </h2>

            <p
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
                leading-[1.8] opacity-[0.75] max-w-[58ch]
              "
            >
              We welcome enquiries from collectors, interior designers,
              architects, and partners exploring new spaces, new materials,
              and new forms together.
            </p>
          </motion.div>

          <motion.div
            initial={initialY(16)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.2, delay: 0.15, ease: luxuryEase }}
            className="lg:col-span-5 flex flex-col gap-4 lg:items-end"
          >
            <Link
              href="/bespoke"
              className="
                group inline-flex items-center justify-between gap-4
                w-full lg:w-auto lg:min-w-[18rem]
                py-4 px-7 md:py-[1.125rem] md:px-9
                text-[10px] md:text-[11px] tracking-[0.22em] uppercase
                text-white no-underline bg-dark
                transition-colors duration-500 hover:bg-black
              "
            >
              <span>Begin a Commission</span>
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

            <Link
              href="/contact"
              className="
                inline-flex items-center gap-2
                self-start lg:self-end
                pt-3 lg:pt-0
                text-[10px] md:text-[11px] tracking-[0.18em] uppercase
                text-inherit no-underline opacity-70 hover:opacity-100
                transition-opacity duration-500
              "
            >
              <span className="border-b border-black/30 pb-0.5">
                Or contact the studio
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Editorial section (single-column, calm)                                   */
/* -------------------------------------------------------------------------- */

function EditorialSection({
  eyebrow,
  title,
  children,
  prefersReducedMotion,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  prefersReducedMotion: boolean;
}) {
  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20 };

  return (
    <section
      className="
        relative bg-white border-t border-accent/20
        py-20 md:py-28 lg:py-36 3xl:py-44
        px-[max(1.25rem,env(safe-area-inset-left))]
        md:px-[max(2.25rem,env(safe-area-inset-left))]
        lg:px-[max(3.5rem,env(safe-area-inset-left))]
        3xl:px-[max(5rem,env(safe-area-inset-left))]
      "
    >
      <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.3, ease: luxuryEase }}
          className="lg:col-span-4"
        >
          <div className="flex items-center gap-4 mb-5 md:mb-7">
            <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
            <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase opacity-55">
              {eyebrow}
            </span>
          </div>
          <h2
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(1.875rem,4.5vw,2.75rem)]
              leading-[1.12] -tracking-[0.005em] font-normal
              max-w-[18ch]
            "
          >
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.3, delay: 0.1, ease: luxuryEase }}
          className="lg:col-span-7 lg:col-start-6"
        >
          <div
            className="
              space-y-5 md:space-y-6
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[15px] md:text-base lg:text-[17px] 3xl:text-[18px]
              leading-[1.8] opacity-[0.78] max-w-[58ch]
            "
          >
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
