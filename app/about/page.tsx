"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutPage() {
  const reduced = useReducedMotion();
  const from = (y: number) =>
    reduced ? { opacity: 0 } : { opacity: 0, y };

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      {/* ── Hero + Studio intro ──────────────────────── */}
      <section
        className="
          pt-28 md:pt-36 lg:pt-44
          pb-20 md:pb-28 lg:pb-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={from(8)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          aria-label="Breadcrumb"
          className="flex items-center gap-y-1.5 text-[10px] tracking-[0.18em] uppercase mb-14 md:mb-20"
        >
          <Link href="/" className="opacity-45 hover:opacity-90 transition-opacity duration-400 no-underline text-inherit">
            Home
          </Link>
          <span className="opacity-20 mx-2">/</span>
          <span className="opacity-85">About</span>
        </motion.nav>

        {/* Two-column: headline left, body right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-start">

          {/* Left: headline */}
          <div>
            <motion.p
              initial={from(8)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.06, ease }}
              className="text-[9px] tracking-[0.24em] uppercase text-black/40 font-medium mb-6"
            >
              The Studio
            </motion.p>

            <motion.h1
              initial={from(18)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.14, ease }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.6rem,6vw,5rem)]
                leading-[1.03] -tracking-[0.01em] font-normal
              "
            >
              Inspired by
              <br />
              <em>craftsmanship.</em>
            </motion.h1>

            {/* Copper rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.36, ease }}
              style={{ originX: 0 }}
              className="w-10 h-px bg-accent/40 mt-8 mb-8"
            />

            <motion.p
              initial={from(10)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.44, ease }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] leading-[1.7] text-black/45 italic
              "
            >
              An East London studio.<br />Copper, glass, made by hand.
            </motion.p>
          </div>

          {/* Right: studio copy */}
          <motion.div
            initial={from(16)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.22, ease }}
            className="
              lg:pt-[4.5rem]
              space-y-5
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[15px] md:text-base lg:text-[17px]
              leading-[1.85] text-black/65
            "
          >
            <p>
              Copa + Glas was founded in 2021 by Master Craftsman Anthony McCarty
              and designer Bradley Mcwhinney. What began as a workshop conversation
              has grown into a small studio of skilled craftspeople, comfortable
              across materials, processes, and brief.
            </p>
            <p>
              The studio was born of a directional, sustainable, and deeply personal
              approach to making — working with two materials above all others:
              copper and glass.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Founders ─────────────────────────────────── */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 md:gap-14 lg:gap-16">

          {/* Image */}
          <motion.div
            initial={from(24)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, ease }}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src="/founders.png"
                alt="Anthony McCarty and Bradley Mcwhinney, Copa + Glas founders"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                  backgroundSize: "240px 240px",
                }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={from(18)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, delay: 0.12, ease }}
            className="flex flex-col justify-center lg:py-8"
          >
            <p className="text-[9px] tracking-[0.24em] uppercase text-black/35 font-medium mb-6">
              The Founders
            </p>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.9rem,3.5vw,2.75rem)]
                leading-[1.1] -tracking-[0.005em] font-normal
                mb-8 md:mb-10
              "
            >
              A craftsman&apos;s lineage.
            </h2>

            <div
              className="
                space-y-5
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[16px]
                leading-[1.85] text-black/60
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

      {/* ── The Technique ────────────────────────────── */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28">

          {/* Pull quote left */}
          <motion.div
            initial={from(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, ease }}
          >
            <p className="text-[9px] tracking-[0.24em] uppercase text-black/35 font-medium mb-8">
              The Technique
            </p>
            <blockquote
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.4rem,3vw,2.1rem)]
                leading-[1.35] font-normal italic text-black/75
              "
            >
              Precise, but never rigid.
            </blockquote>
          </motion.div>

          {/* Body right */}
          <motion.div
            initial={from(16)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, delay: 0.12, ease }}
            className="
              lg:pt-[3.5rem]
              space-y-5
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[15px] md:text-base lg:text-[17px]
              leading-[1.85] text-black/60
            "
          >
            <p>
              Every piece is composed of hand-cut panes set within a framework of
              pure, solid copper. Multifaceted, deliberate, made one pane at a time.
            </p>
            <p>
              The technique is precise but flexible. Scale, shape, and composition
              can be adapted to suit a particular space, an architect&apos;s brief,
              or a private commission. Pieces can be made to order, in small
              batches, or as singular works, each carrying the same hand, the same
              materials, and the same intention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Commissions CTA ──────────────────────────── */}
      <motion.section
        initial={from(16)}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.2, ease }}
        className="
          border-t border-black/[0.06]
          bg-[#f4f3f1]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
        "
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-20">

          <div className="max-w-[560px]">
            <p className="text-[9px] tracking-[0.24em] uppercase text-black/35 font-medium mb-6">
              Commissions
            </p>
            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.75rem,3.5vw,2.75rem)]
                leading-[1.15] -tracking-[0.005em] font-normal
                mb-6 text-black/85
              "
            >
              The studio is open to commission, collaboration, and conversation.
            </h2>
            <p
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] leading-[1.8] text-black/50
              "
            >
              We welcome enquiries from collectors, interior designers,
              architects, and partners exploring new spaces, new materials,
              and new forms together.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end shrink-0">
            <Link
              href="/contact"
              className="
                group inline-flex items-center justify-between gap-6
                py-4 px-8 md:py-[1.125rem] md:px-10
                min-w-[16rem]
                text-[10px] tracking-[0.22em] uppercase
                text-white no-underline bg-dark
                transition-colors duration-500 hover:bg-black
              "
            >
              <span>Begin a Commission</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="
                text-[10px] tracking-[0.18em] uppercase
                text-black/45 hover:text-black
                no-underline transition-colors duration-300
                border-b border-black/20 pb-0.5 self-start md:self-end
              "
            >
              Or contact the studio
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
