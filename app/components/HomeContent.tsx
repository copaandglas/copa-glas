"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "@/app/components/Footer";
import AutoplayVideo from "@/app/components/AutoplayVideo";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FeaturedWork {
  slug: string;
  name: string;
  dimension: string;
  price: string;
  image: string;
  hoverImage?: string;
  desktopImage?: string;
  tagline: string;
  aspect: string;
  href?: string;
  width: string;
  indent: string;
}

const featuredWorks: FeaturedWork[] = [
  {
    slug: "rotation-mirror",
    name: "Rotation Mirror",
    dimension: "97cm Ø",
    price: "£6,000.00",
    image: "/rotation-mirror.png",
    hoverImage: "/rotation-mirror-close.png",
    tagline: "Twenty-six hand-cut facets set in solid copper.",
    aspect: "aspect-[4/5]",
    width: "w-full sm:w-[72%] lg:w-[46%] xl:w-[36%] lg:max-w-[430px]",
    indent: "lg:ml-[5%]",
  },
  {
    slug: "mondrian-mirror",
    name: "The Mondrian Mirror",
    dimension: "69.5 × 100.5cm",
    price: "£8,500.00",
    image: "/mondrian-mirror.png",
    hoverImage: "/mondrian-mirror-close.png",
    tagline: "Rectilinear panes held in a grid of hand-formed copper.",
    aspect: "aspect-[3/4]",
    width: "w-full sm:w-[58%] lg:w-[32%] xl:w-[24%] lg:max-w-[310px]",
    indent: "lg:ml-auto lg:mr-[7%]",
  },
  {
    slug: "fibonacci-mirror",
    name: "Fibonacci Mirror",
    dimension: "65 × 90cm",
    price: "£5,500.00",
    image: "/fibonacci-mirror-mantel.png",
    hoverImage: "/fibonacci-mirror-close.png",
    tagline: "A spiralling study in proportion, drawn from nature's geometry.",
    aspect: "aspect-[5/6]",
    width: "w-full sm:w-[65%] lg:w-[38%] xl:w-[28%] lg:max-w-[380px]",
    indent: "lg:ml-[20%]",
  },
  {
    slug: "aura-wall-light",
    name: "Aura Wall Light",
    dimension: "",
    price: "",
    image: "/aura-wall-light.png",
    hoverImage: "/aura-wall-light.png",
    desktopImage: "/aura-wall-light-off.png",
    tagline: "A fragment of light held in the wall.",
    aspect: "aspect-[3/4]",
    href: "/product/aura-wall-light",
    width: "w-full sm:w-[52%] lg:w-[28%] xl:w-[22%] lg:max-w-[270px]",
    indent: "lg:ml-auto lg:mr-[14%]",
  },
];

function WorkCard({ work, index }: { work: FeaturedWork; index?: number }) {
  return (
    <Link
      href={work.href ?? `/product/${work.slug}`}
      className="group block text-inherit no-underline"
      aria-label={`View ${work.name}`}
    >
      <div className={`relative w-full ${work.aspect} overflow-hidden bg-stone-50`}>
        <Image
          src={work.image}
          alt={work.tagline ? `${work.name}, ${work.tagline}` : work.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 430px"
          className={`
            object-cover
            transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
            group-hover:scale-[1.025] group-hover:duration-[2000ms] group-hover:will-change-[transform,opacity]
            ${work.desktopImage ? "sm:opacity-0 sm:group-hover:opacity-100" : work.hoverImage ? "sm:group-hover:opacity-0" : ""}
          `}
        />
        {work.desktopImage && (
          <Image
            src={work.desktopImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 430px"
            className="
              hidden sm:block object-cover
              transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
              group-hover:opacity-0 group-hover:scale-[1.025] group-hover:duration-[2000ms] group-hover:will-change-[transform,opacity]
              pointer-events-none
            "
          />
        )}
        {work.hoverImage && !work.desktopImage && (
          <Image
            src={work.hoverImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 430px"
            className="
              hidden sm:block object-cover opacity-0
              transition-[transform,opacity] duration-0 ease-[cubic-bezier(0.37,0,0.63,1)]
              group-hover:opacity-100 group-hover:scale-[1.025] group-hover:duration-[2000ms] group-hover:will-change-[transform,opacity]
              pointer-events-none
            "
          />
        )}
      </div>

      <div className="pt-4 md:pt-5 flex items-start gap-3.5">
        {index !== undefined && (
          <span className="
            font-[family-name:var(--font-playfair),Georgia,serif]
            text-[10px] italic text-black/22 tabular-nums leading-[1.9] shrink-0
          ">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="flex-1 min-w-0 border-t border-black/[0.09] pt-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[0.95rem] md:text-[1rem]
              font-normal leading-[1.3] tracking-[0.01em] text-black/85
            ">
              {work.name}
            </h3>
            {work.price && (
              <span className="
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[11px] tabular-nums text-black/35 shrink-0
              ">
                {work.price}
              </span>
            )}
          </div>
          {work.tagline && (
            <p className="
              font-[family-name:var(--font-playfair),Georgia,serif]
              text-[11.5px] leading-[1.65] italic text-black/38 mt-1
            ">
              {work.tagline}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function HomeContent() {
  const reduced = useReducedMotion();
  const rise = (y: number) => (reduced ? { opacity: 0 } : { opacity: 0, y });

  return (
    <>
      <div className="relative z-10 bg-white text-dark w-full overflow-hidden">
        <section
          aria-label="The studio"
          className="px-5 sm:px-10 lg:px-16 xl:px-20 pt-28 md:pt-40 lg:pt-52 pb-20 md:pb-28 lg:pb-36"
        >
          <motion.p
            initial={rise(6)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-14% 0px" }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            className="text-[7.5px] tracking-[0.38em] uppercase text-black/22 font-medium mb-14 md:mb-20"
          >
            Copa + Glas · East London
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-16 xl:gap-x-24">
            <motion.h1
              initial={rise(24)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.4, ease: luxuryEase }}
              className="
                lg:w-[55%] xl:w-[57%] shrink-0
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[clamp(2.6rem,7vw,6rem)]
                leading-[1.04] -tracking-[0.016em] font-normal
              "
            >
              Hand cut glass.<br />
              Hand formed copper.<br />
              <em>Made to order.</em>
            </motion.h1>

            <div className="mt-12 lg:mt-0 flex flex-col items-start min-w-0">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.6, delay: 0.1, ease: luxuryEase }}
                className="w-[44vw] sm:w-[32vw] lg:w-[88%] xl:w-[82%] max-w-[220px] lg:max-w-none ml-auto lg:ml-0"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-50">
                  <AutoplayVideo
                    src="/Annealing.MP4"
                    aria-label="Annealing process in the C+G Workshop"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-[0.32] mix-blend-overlay"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")",
                      backgroundSize: "180px 180px",
                    }}
                  />
                  <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply bg-amber-900" />
                </div>
                <p className="mt-3 text-[7.5px] tracking-[0.32em] uppercase text-black/22">
                  Annealing · C+G Workshop
                </p>
              </motion.div>

              <motion.div
                initial={rise(14)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.3, delay: 0.28, ease: luxuryEase }}
                className="mt-12 w-full"
              >
                <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[14.5px] xl:text-[15.5px] leading-[2] text-black/52 max-w-[36ch]">
                  Working in copper and hand-cut glass, Copa + Glas makes
                  mirrors and lighting that gather and return the light around
                  them. Every piece is drawn from a single material language
                  and made to order in our East London workshop.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section aria-label="Selected works" className="pb-24 md:pb-32 lg:pb-44">
          <motion.p
            initial={rise(6)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            className="px-5 sm:px-10 lg:px-16 xl:px-20 text-[7.5px] tracking-[0.38em] uppercase text-black/22 font-medium mb-16 md:mb-20 lg:mb-24"
          >
            Selected Works
          </motion.p>

          <motion.div
            initial={rise(30)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            className="px-5 sm:px-10 lg:px-16 xl:px-20"
          >
            <div className={`${featuredWorks[0].width} ${featuredWorks[0].indent}`}>
              <WorkCard work={featuredWorks[0]} index={0} />
            </div>
          </motion.div>

          <div className="
            px-5 sm:px-10 lg:px-16 xl:px-20
            mt-20 md:mt-28 lg:mt-36
            flex flex-col sm:flex-row sm:items-start sm:gap-12
          ">
            <motion.div
              initial={rise(30)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 1.1, ease: luxuryEase }}
              className="w-full sm:w-[44%] lg:w-[280px] xl:w-[300px] shrink-0 lg:mt-16"
            >
              <WorkCard work={featuredWorks[3]} index={3} />
            </motion.div>
            <motion.div
              initial={rise(30)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 1.1, delay: 0.1, ease: luxuryEase }}
              className="mt-14 sm:mt-0 w-full sm:w-[52%] lg:w-[320px] xl:w-[340px] shrink-0 lg:ml-auto lg:mr-[8%]"
            >
              <WorkCard work={featuredWorks[1]} index={1} />
            </motion.div>
          </div>

          <motion.div
            initial={rise(30)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            className="px-5 sm:px-10 lg:px-16 xl:px-20 mt-20 md:mt-28 lg:mt-36"
          >
            <div className={`${featuredWorks[2].width} ${featuredWorks[2].indent}`}>
              <WorkCard work={featuredWorks[2]} index={2} />
            </div>
          </motion.div>

          <motion.div
            initial={rise(8)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1, ease: luxuryEase }}
            className="px-5 sm:px-10 lg:px-16 xl:px-20 mt-16 md:mt-20 lg:mt-24"
          >
            <Link
              href="/collection"
              className="
                group inline-flex items-center gap-3
                text-[8px] lg:text-[9.5px] tracking-[0.3em] uppercase text-black/35 no-underline
                transition-colors duration-700 hover:text-black/70
              "
            >
              <span className="pb-px border-b border-current transition-colors duration-700">View the Collection</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </section>

        <section
          aria-label="Bespoke and commissions"
          className="relative bg-dark text-white overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_82%_12%,rgba(139,69,19,0.16),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_15%_95%,rgba(255,255,255,0.045),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: "240px 240px",
            }}
          />

          <div
            className="
              relative z-10 max-w-[1440px] mx-auto
              px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
              py-24 md:py-32 lg:py-40
            "
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              <motion.div
                initial={rise(20)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 1.3, ease: luxuryEase }}
                className="lg:col-span-7 order-2 lg:order-1"
              >
                <p className="text-[7.5px] tracking-[0.38em] uppercase text-white/38 font-medium mb-7 md:mb-10">
                  Bespoke &amp; Commissions
                </p>
                <h2
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(2rem,4.6vw,3.5rem)]
                    leading-[1.08] -tracking-[0.01em] font-normal
                    mb-9 md:mb-11 max-w-[18ch]
                  "
                >
                  Commissioned for the <em>space</em> it is made for.
                </h2>

                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[14.5px] md:text-[15px] lg:text-[16px]
                    leading-[2] text-white/55 max-w-[46ch] mb-10 md:mb-14
                  "
                >
                  Every piece can be scaled, finished, or wholly reconceived in
                  copper and hand-cut glass — for a private interior, an
                  architectural brief, or a singular work. We welcome collectors,
                  designers, and architects.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                  <Link
                    href="/bespoke"
                    className="
                      group inline-flex items-center gap-4
                      text-[8px] lg:text-[9.5px] tracking-[0.3em] uppercase text-white/90 no-underline
                      pb-px border-b border-white/30
                      transition-colors duration-700 hover:text-white hover:border-white/70
                    "
                  >
                    <span>Begin a Commission</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="
                      text-[8px] lg:text-[9.5px] tracking-[0.3em] uppercase text-white/35 hover:text-white/65
                      no-underline transition-colors duration-500
                      pb-px border-b border-white/15 hover:border-white/35 self-start sm:self-auto
                    "
                  >
                    Contact the studio
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 1.4, delay: 0.12, ease: luxuryEase }}
                className="lg:col-span-4 lg:col-start-9 order-1 lg:order-2"
              >
                <div className="w-full max-w-[300px] sm:max-w-[320px] lg:max-w-none mx-auto lg:ml-auto lg:mr-0">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-black/40 border border-white/12">
                    <AutoplayVideo
                      aria-label="Hand-cut glass being worked in the studio"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    >
                      <source src="/copa.webm" type="video/webm" />
                      <source src="/copa.mp4" type="video/mp4" />
                    </AutoplayVideo>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <p className="mt-3 text-[7.5px] tracking-[0.32em] uppercase text-white/30 font-medium">
                    Hand-cut glass · C+G Workshop
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          aria-label="Origins"
          className="
            px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20
            py-16 md:py-24 lg:py-32
          "
        >
          <div className="max-w-[1440px] mx-auto relative">
            <span
              aria-hidden
              className="
                hidden lg:block absolute -top-8 right-0 z-0 pointer-events-none select-none
                font-[family-name:var(--font-playfair),Georgia,serif]
                text-[12rem] xl:text-[15rem] leading-none italic
                text-accent/[0.18]
              "
            >
              1897
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0 lg:gap-x-0 relative z-[1]">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.3, ease: luxuryEase }}
                className="lg:col-span-7 lg:row-start-1 lg:col-start-1 relative z-0"
              >
                <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-faint border border-black/[0.06]">
                  <Image
                    src="/luxferdoors.jpeg"
                    alt="Archival Luxfer prism glazing — copper sections holding hand-cut glass"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 text-[10px] tracking-[0.18em] uppercase text-white/95 px-2.5 py-1 bg-white/[0.12] backdrop-blur-xl border border-white/25">
                    Luxfer · 1897
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={rise(20)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.3, delay: 0.12, ease: luxuryEase }}
                className="
                  lg:col-span-6 lg:col-start-7 lg:row-start-1
                  relative z-10
                  lg:mt-52 lg:-ml-16 xl:-ml-24
                  bg-white
                  px-0 lg:px-10 xl:px-12 lg:py-10 xl:py-12
                  pt-8 lg:pt-10
                "
              >
                <p className="text-[7.5px] tracking-[0.38em] uppercase text-black/28 font-medium mb-7 md:mb-10">
                  Origins · 1897
                </p>
                <h2
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.75rem,4vw,3rem)]
                    leading-[1.1] -tracking-[0.008em] font-normal mb-7 md:mb-9
                  "
                >
                  A lineage over a century in the making.
                </h2>
                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[14.5px] md:text-[15px] lg:text-[16px]
                    leading-[2] text-black/52 max-w-[46ch] mb-9 md:mb-11
                  "
                >
                  Our glazing tradition begins with the Luxfer Prism Company and
                  the copper-section technique later transformed by Frank Lloyd
                  Wright. We carry that lineage forward by hand — the same
                  materials, the same intention, made for the interiors of today.
                </p>
                <Link
                  href="/origins"
                  className="
                    group inline-flex items-center gap-3
                    text-[8px] lg:text-[9.5px] tracking-[0.3em] uppercase text-black/40
                    no-underline pb-px border-b border-black/18
                    transition-colors duration-700 hover:text-black/75 hover:border-black/40
                  "
                >
                  <span>Read the Origins</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative z-20">
        <Footer />
      </div>
    </>
  );
}
