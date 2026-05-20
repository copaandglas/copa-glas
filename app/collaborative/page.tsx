"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const INSTITUTIONS = [
  {
    name: "Liberty London",
    body:
      "Working with one of London's most storied institutions to bring the studio's copper-and-glass technique into a new context — pieces conceived for the building, its history, and the people who move through it.",
    imageSrc: null as string | null,
    imageAlt: "Liberty London collaboration",
    placeholder: "Liberty London",
  },
  {
    name: "Hotel Café Royal",
    body:
      "A lightwell commission for the restored Hotel Café Royal — copper sections and hand-cut glass forming a luminous architectural feature at the heart of the building.",
    imageSrc: "/cafe-royal-lightwell-bw.jpg",
    imageAlt: "Hotel Café Royal lightwell, London — copper and glass commission",
    placeholder: null,
  },
] as const;

export default function CollaborativePage() {
  const reduced = useReducedMotion();
  const from = (y: number) =>
    reduced ? { opacity: 0 } : { opacity: 0, y };

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      {/* Hero */}
      <section
        className="
          pt-28 md:pt-36 lg:pt-44
          pb-20 md:pb-28 lg:pb-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        <motion.nav
          initial={from(8)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          aria-label="Breadcrumb"
          className="flex items-center gap-y-1.5 text-[10px] tracking-[0.18em] uppercase mb-14 md:mb-20"
        >
          <Link
            href="/"
            className="opacity-45 hover:opacity-90 transition-opacity duration-400 no-underline text-inherit"
          >
            Home
          </Link>
          <span className="opacity-20 mx-2">/</span>
          <span className="opacity-85">Collaborative</span>
        </motion.nav>

        <motion.p
          initial={from(8)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.06, ease }}
          className="text-[9px] tracking-[0.24em] uppercase text-black/60 font-medium mb-6"
        >
          Collaborative
        </motion.p>

        <motion.h1
          initial={from(18)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.14, ease }}
          className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[clamp(2.6rem,6vw,5rem)]
            leading-[1.03] -tracking-[0.01em] font-normal
            mb-8 max-w-[18ch]
          "
        >
          Made in
          <br />
          <em>partnership.</em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.36, ease }}
          style={{ originX: 0 }}
          className="w-10 h-px bg-black/15 mb-8"
        />

        <motion.div
          initial={from(14)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.28, ease }}
          className="
            max-w-[640px] space-y-5
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[15px] md:text-base lg:text-[17px]
            leading-[1.85] text-black/80
          "
        >
          <p>
            Beyond the collection and bespoke commissions, the studio works
            selectively with artists, designers, and institutions — people and
            places where craft, vision, and material meet on equal terms.
          </p>
          <p>
            These collaborations are not production runs. Each is a considered
            dialogue: a shared brief, a shared standard, and a piece that could
            only exist because of who made it together.
          </p>
        </motion.div>
      </section>

      {/* Artists & designers */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
        "
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-start">
          <motion.div
            initial={from(16)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.2, ease }}
          >
            <p className="text-[9px] tracking-[0.24em] uppercase text-black/55 font-medium mb-6">
              Artists &amp; Designers
            </p>
            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.75rem,3.5vw,2.75rem)]
                leading-[1.15] -tracking-[0.005em] font-normal
                mb-6 text-black/92
              "
            >
              Selected voices, shared making.
            </h2>
            <div
              className="
                space-y-5
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base leading-[1.85] text-black/75
              "
            >
              <p>
                The studio invites a small number of artists and designers
                whose work resonates with copper, glass, and the discipline of
                handcraft. Together we develop pieces that sit between
                disciplines — neither purely theirs nor purely ours, but
                something new.
              </p>
              <p>
                New collaborations are announced as they are confirmed. If you
                are an artist or designer with a project in mind, we welcome
                a conversation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={from(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.2, delay: 0.08, ease }}
            className="relative aspect-[4/5] bg-[#e8e3db] overflow-hidden"
          >
            <Image
              src="/workshop-hands.png"
              alt="Hands at work in the Copa + Glas studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Institutions */}
      <section
        className="
          border-t border-black/[0.06]
          bg-[#f7f5f1]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
        "
      >
        <motion.div
          initial={from(12)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.1, ease }}
          className="max-w-[1440px] mx-auto mb-14 md:mb-20"
        >
          <p className="text-[9px] tracking-[0.24em] uppercase text-black/55 font-medium mb-6">
            Institutions
          </p>
          <h2
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[clamp(1.75rem,3.5vw,2.75rem)]
              leading-[1.15] -tracking-[0.005em] font-normal
              max-w-[20ch] text-black/92
            "
          >
            Buildings with history. Work with permanence.
          </h2>
        </motion.div>

        <div className="max-w-[1440px] mx-auto space-y-16 md:space-y-24">
          {INSTITUTIONS.map((item, index) => (
            <motion.article
              key={item.name}
              initial={from(18)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 1.2, delay: index * 0.06, ease }}
              className={`
                grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center
                ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}
              `}
            >
              <motion.div
                className="relative aspect-[16/10] bg-[#e8e3db] overflow-hidden"
              >
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] tracking-[0.28em] uppercase text-black/30 font-medium">
                      {item.placeholder}
                    </span>
                  </div>
                )}
              </motion.div>

              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-black/50 font-medium mb-4">
                  Institution
                </p>
                <h3
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.5rem,2.5vw,2rem)]
                    leading-[1.2] font-normal mb-5
                  "
                >
                  {item.name}
                </h3>
                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[15px] md:text-base leading-[1.85] text-black/75
                  "
                >
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={from(16)}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.2, ease }}
        className="
          border-t border-black/[0.06]
          bg-[#ede9e2]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
        "
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-20">
          <div className="max-w-[560px]">
            <p className="text-[9px] tracking-[0.24em] uppercase text-black/55 font-medium mb-6">
              Enquire
            </p>
            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(1.75rem,3.5vw,2.75rem)]
                leading-[1.15] -tracking-[0.005em] font-normal
                mb-6 text-black/92
              "
            >
              Exploring a collaboration?
            </h2>
            <p
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] leading-[1.8] text-black/72
              "
            >
              We welcome enquiries from artists, designers, curators, and
              institutions with a brief worth making together.
            </p>
          </div>

          <Link
            href="/contact"
            className="
              group inline-flex items-center justify-between gap-6
              py-4 px-8 md:py-[1.125rem] md:px-10
              min-w-[16rem] shrink-0
              text-[10px] tracking-[0.22em] uppercase
              text-white no-underline bg-dark
              transition-colors duration-500 hover:bg-black
            "
          >
            <span>Contact the Studio</span>
            <svg
              width="13"
              height="13"
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
      </motion.section>

      <Footer />
    </div>
  );
}
