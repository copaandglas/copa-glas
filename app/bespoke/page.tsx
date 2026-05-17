"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Reusable placeholder for images that have not yet been shot ─────────── */
function ImagePlaceholder({
  label,
  tone = "light",
  className = "",
  ratio = "aspect-[4/5]",
}: {
  label: string;
  tone?: "light" | "dark" | "cream";
  className?: string;
  ratio?: string;
}) {
  const toneClasses =
    tone === "dark"
      ? "bg-[#141414] text-white/35"
      : tone === "cream"
      ? "bg-[#efece6] text-black/30"
      : "bg-[#ecebe6] text-black/30";

  return (
    <div
      className={`relative w-full overflow-hidden ${ratio} ${toneClasses} ${className}`}
    >
      {/* Subtle film-grain noise overlay for warmth */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] tracking-[0.28em] uppercase font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function BespokePage() {
  const reduced = useReducedMotion();
  const from = (y: number) =>
    reduced ? { opacity: 0 } : { opacity: 0, y };

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="
          pt-28 md:pt-36 lg:pt-44
          pb-20 md:pb-28 lg:pb-32
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
          className="flex items-center text-[10px] tracking-[0.18em] uppercase mb-14 md:mb-20"
        >
          <Link
            href="/"
            className="opacity-45 hover:opacity-90 transition-opacity duration-400 no-underline text-inherit"
          >
            Home
          </Link>
          <span className="opacity-20 mx-2">/</span>
          <span className="opacity-85">Bespoke</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_38%] gap-12 lg:gap-20 xl:gap-28 items-start">
          {/* Left: eyebrow + headline + body */}
          <div>
            <motion.p
              initial={from(8)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.06, ease }}
              className="text-[9px] tracking-[0.28em] uppercase text-black/45 font-medium mb-6"
            >
              Bespoke
            </motion.p>

            <motion.h1
              initial={from(20)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.14, ease }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.5rem,6.4vw,5.25rem)]
                leading-[1.03] -tracking-[0.01em] font-normal
                mb-10 md:mb-12
              "
            >
              Made for the space
              <br />
              <em>it will live in.</em>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.34, ease }}
              style={{ originX: 0 }}
              className="w-10 h-px bg-accent/40 mb-10"
            />

            <motion.div
              initial={from(14)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.28, ease }}
              className="
                max-w-[34rem]
                space-y-5
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px]
                leading-[1.85] text-black/60
              "
            >
              <p>
                Every Copa + Glas commission begins with a conversation. Not a
                form, not a brief, a conversation about the space, the light,
                and what you want to live with.
              </p>
              <p>
                We work with interior designers, architects, and private
                clients to design and make pieces that could not exist anywhere
                else. Each commission is led by Anthony McCarty, our Master
                Craftsman, whose four decades of architectural glazing
                experience means no brief is too complex and no scale too
                ambitious.
              </p>
              <p>
                We can work from your specification or develop a design
                entirely from our studio. Detailed drawings and material
                samples are available at every stage. Every piece is made to
                order in our East London workshop.
              </p>
            </motion.div>
          </div>

          {/* Right: 3 stats */}
          <motion.aside
            initial={from(20)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.36, ease }}
            className="lg:pt-2"
          >
            <ul className="flex flex-col divide-y divide-black/10">
              {[
                { figure: "40+", label: "Years of craft experience" },
                { figure: "6–8", label: "Week lead time, standard commission" },
                { figure: "London", label: "Studio visits welcome by appointment" },
              ].map((stat, i) => (
                <li
                  key={stat.figure}
                  className={`py-7 md:py-8 first:pt-0 last:pb-0 ${
                    i === 0 ? "lg:border-t lg:border-black/10 lg:pt-8" : ""
                  }`}
                >
                  <p
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[clamp(2rem,3.5vw,2.75rem)]
                      leading-[1] font-normal text-black/90
                      mb-3
                    "
                  >
                    {stat.figure}
                  </p>
                  <p className="text-[9px] tracking-[0.22em] uppercase text-black/45 font-medium leading-[1.6]">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>

      {/* ── Café Royal twin images ──────────────────────────────────── */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-32
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        <motion.p
          initial={from(8)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.1, ease }}
          className="text-[9px] tracking-[0.22em] uppercase text-black/45 font-medium mb-10 md:mb-14"
        >
          Architectural Commission
          <span className="text-accent/50 mx-2">·</span>
          Hotel Café Royal
          <span className="text-accent/50 mx-2">·</span>
          London
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {[
            { id: "lightwell-i", title: "Café Royal Lightwell I" },
            { id: "lightwell-ii", title: "Café Royal Lightwell II" },
          ].map((item, i) => (
            <motion.figure
              key={item.id}
              initial={from(28)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.3, delay: 0.06 + i * 0.1, ease }}
              className="flex flex-col"
            >
              <ImagePlaceholder
                label="Image to follow"
                tone="cream"
                ratio="aspect-[4/5]"
              />
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    italic text-[15px] md:text-base text-black/75
                  "
                >
                  {item.title}
                </span>
                <span className="text-[9px] tracking-[0.22em] uppercase text-black/35 font-medium">
                  {String(i + 1).padStart(2, "0")} / 02
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={from(12)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.2, delay: 0.18, ease }}
          className="
            mt-10 md:mt-14
            pt-6 border-t border-black/10
            flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3
          "
        >
          <p
            className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[15px] md:text-base text-black/70
            "
          >
            Hotel Café Royal, London
          </p>
          <p className="text-[9px] tracking-[0.22em] uppercase text-black/40 font-medium">
            Architectural copper glazing commission
            <span className="text-accent/50 mx-2">·</span>2024
          </p>
        </motion.div>
      </section>

      {/* ── The Craft (dark) ─────────────────────────────────────────── */}
      <section className="bg-dark text-white">
        <div
          className="
            max-w-[1440px] mx-auto
            grid grid-cols-1 lg:grid-cols-[45%_1fr]
            gap-10 md:gap-16 lg:gap-20
            items-stretch
            px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
            py-20 md:py-28 lg:py-36
          "
        >
          {/* Left: media placeholder */}
          <motion.div
            initial={from(28)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.3, ease }}
          >
            <ImagePlaceholder
              label="Gif · Image to follow"
              tone="dark"
              ratio="aspect-[4/5]"
            />
            <p className="mt-4 text-[9px] tracking-[0.22em] uppercase text-white/35 font-medium">
              Anthony cutting glass
            </p>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={from(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, delay: 0.12, ease }}
            className="flex flex-col justify-center"
          >
            <p className="text-[9px] tracking-[0.28em] uppercase text-white/40 font-medium mb-8">
              The Craft
            </p>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2rem,4.5vw,3.5rem)]
                leading-[1.08] -tracking-[0.005em] font-normal
                mb-9 text-white/95
              "
            >
              Four decades held
              <br />
              <em>in a pair of hands.</em>
            </h2>

            <div className="w-10 h-px bg-accent/60 mb-9" />

            <div
              className="
                max-w-[34rem]
                space-y-5
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px]
                leading-[1.85] text-white/65
              "
            >
              <p>
                Anthony McCarty has been working in architectural copper and
                glass since 1980. His restoration commissions include the
                Elizabeth Tower, the Natural History Museum, and a glass dome
                in Saudi Arabia.
              </p>
              <p>
                When you commission a bespoke piece from Copa + Glas, Anthony
                leads every stage of the conversation, from the first sketch to
                the moment the piece leaves the studio. His knowledge is not
                transferable in words. It is visible in the work.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Private Commission (cream) ──────────────────────────────── */}
      <section className="bg-[#f4f3f1]">
        <div
          className="
            max-w-[1440px] mx-auto
            grid grid-cols-1 lg:grid-cols-[45%_1fr]
            gap-10 md:gap-16 lg:gap-20
            items-center
            px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
            py-20 md:py-28 lg:py-36
          "
        >
          {/* Left: white-card placeholder */}
          <motion.div
            initial={from(28)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.3, ease }}
          >
            <div className="bg-white p-3 md:p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.18)]">
              <ImagePlaceholder
                label="Studio · Image to follow"
                tone="light"
                ratio="aspect-[3/4]"
              />
            </div>
            <p className="mt-4 text-[9px] tracking-[0.22em] uppercase text-black/40 font-medium">
              Aura light being made
            </p>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={from(20)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.3, delay: 0.12, ease }}
          >
            <p className="text-[9px] tracking-[0.28em] uppercase text-black/45 font-medium mb-8">
              Private Commission
            </p>

            <h2
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2rem,4.5vw,3.5rem)]
                leading-[1.08] -tracking-[0.005em] font-normal
                mb-9 text-black/90
              "
            >
              Made for one
              <br />
              <em>client, one space.</em>
            </h2>

            <div className="w-10 h-px bg-accent/50 mb-9" />

            <div
              className="
                max-w-[34rem]
                space-y-5
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px]
                leading-[1.85] text-black/60
              "
            >
              <p>
                Our private commissions begin with a studio visit. You come to
                East London, you see the copper being worked, the glass being
                cut. Anthony shows you what is possible. Most clients leave
                knowing exactly what they want.
              </p>
              <p>
                The Aura sconce was developed for a private client who wanted
                something that had never existed before, a wall light in copper
                and glass that changed the quality of light in a room rather
                than simply adding to it. That is the kind of brief we welcome.
              </p>
              <p className="italic text-black/70">
                Every private commission is different. Every piece is made once.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How a commission begins (3 steps) ───────────────────────── */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-36
          px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
          max-w-[1440px] mx-auto
        "
      >
        <motion.p
          initial={from(8)}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.1, ease }}
          className="text-[9px] tracking-[0.28em] uppercase text-black/45 font-medium mb-12 md:mb-16"
        >
          How a commission begins
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
          {[
            {
              num: "01",
              title: "Begin a conversation",
              body: "Tell us about the space, the brief, and what you are hoping to achieve. There is no form and no obligation. We respond to every enquiry personally, usually within 24 hours.",
            },
            {
              num: "02",
              title: "Visit the studio",
              body: "Serious commissions begin in person. You come to our East London studio, meet Anthony, see the materials and the process. Drawings and samples are prepared to refine the brief.",
            },
            {
              num: "03",
              title: "We make it",
              body: "Once the brief is agreed, Anthony begins making. A 50% deposit confirms the commission. We send a progress update at the midpoint. The balance is due on completion.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={from(22)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease }}
              className="flex flex-col"
            >
              <p
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(1.5rem,2vw,1.75rem)]
                  text-accent/80 italic font-normal mb-5
                "
              >
                {step.num}
              </p>

              <h3
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(1.25rem,2vw,1.5rem)]
                  leading-[1.2] font-normal text-black/90 mb-5
                "
              >
                {step.title}
              </h3>

              <div className="w-7 h-px bg-black/15 mb-5" />

              <p
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[14.5px] md:text-[15px]
                  leading-[1.85] text-black/55
                "
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA (dark, copper disc) ─────────────────────────────────── */}
      <section className="relative bg-dark text-white overflow-hidden">
        {/* Copper disc */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.8, ease }}
          className="
            absolute left-1/2 -translate-x-1/2
            top-[8%] md:top-[10%]
            w-[260px] h-[260px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px]
            rounded-full
            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #c87a3f 0%, #a35a26 45%, #6e3614 100%)",
            boxShadow:
              "0 30px 90px -20px rgba(200,122,63,0.35), inset -20px -30px 70px rgba(0,0,0,0.45)",
          }}
        />

        {/* Subtle film grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px 240px",
          }}
        />

        <div
          className="
            relative
            max-w-[1440px] mx-auto
            px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
            pt-[22rem] md:pt-[26rem] lg:pt-[30rem]
            pb-20 md:pb-28 lg:pb-32
          "
        >
          <div className="max-w-[640px] mx-auto text-center">
            <motion.p
              initial={from(8)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.1, ease }}
              className="text-[9px] tracking-[0.28em] uppercase text-white/45 font-medium mb-6"
            >
              Begin a conversation
            </motion.p>

            <motion.h2
              initial={from(20)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.3, delay: 0.08, ease }}
              className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.25rem,5vw,3.75rem)]
                leading-[1.05] -tracking-[0.005em] font-normal
                mb-8 text-white/95
              "
            >
              Tell us about
              <br />
              <em>your project.</em>
            </motion.h2>

            <motion.p
              initial={from(14)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.2, delay: 0.16, ease }}
              className="
                max-w-[480px] mx-auto
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[15px] md:text-base lg:text-[17px]
                leading-[1.85] text-white/70 mb-12
              "
            >
              We respond to every bespoke enquiry personally. There is no
              automated reply, no standard rate card. Just a conversation about
              what you want to make.
            </motion.p>

            <motion.div
              initial={from(14)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.2, delay: 0.24, ease }}
              className="flex flex-col items-center gap-6"
            >
              <Link
                href="/contact"
                className="
                  group inline-flex items-center justify-between gap-6
                  py-4 px-9 md:py-[1.125rem] md:px-12
                  min-w-[18rem]
                  text-[10px] tracking-[0.28em] uppercase
                  text-dark no-underline bg-white
                  hover:bg-white/90 transition-colors duration-300
                "
              >
                <span>Send enquiry</span>
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>

              <p className="text-[9px] tracking-[0.24em] uppercase text-white/40 font-medium">
                We respond within 24 hours
                <span className="text-accent/70 mx-2">·</span>
                studio@copaglas.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
