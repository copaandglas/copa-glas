"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* ── Form types ──────────────────────────────────────────────────────────── */
type PracticeType =
  | "interior-designer"
  | "architect"
  | "hospitality-developer"
  | "other";

interface TradeFormState {
  name: string;
  email: string;
  practiceName: string;
  practiceWebsite: string;
  vatNumber: string;
  practiceType: PracticeType | "";
  message: string;
  website: string; // honeypot
}

const initialForm: TradeFormState = {
  name: "",
  email: "",
  practiceName: "",
  practiceWebsite: "",
  vatNumber: "",
  practiceType: "",
  message: "",
  website: "",
};

const PRACTICE_TYPES: { id: PracticeType; label: string }[] = [
  { id: "interior-designer", label: "Interior Designer" },
  { id: "architect", label: "Architect" },
  { id: "hospitality-developer", label: "Hospitality & Developer" },
  { id: "other", label: "Other" },
];

type FieldKey = "name" | "email" | "practiceName" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Form styling ────────────────────────────────────────────────────────── */
const LABEL =
  "block text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-black/70";
const OPTIONAL = "text-black/30 normal-case tracking-normal ml-2 text-[10px] italic";
const INPUT =
  "w-full py-3.5 px-4 bg-white border border-black/[0.16] text-[15px] leading-[1.4] font-[family-name:var(--font-playfair),Georgia,serif] text-black placeholder:text-black/30 focus:border-black focus:shadow-[0_0_0_1px_rgb(0_0_0)] transition-[border-color,box-shadow] duration-200 box-border outline-none";
const INPUT_ERR =
  "border-[#8a1f1f]/60 focus:border-[#8a1f1f] focus:shadow-[0_0_0_1px_rgb(138_31_31)]";

/* ── Placeholder tile ────────────────────────────────────────────────────── */
function ImagePlaceholder({
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${ratio} bg-[#e8e3db] text-black/30 ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: GRAIN_SVG,
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

/* ── Programme items ─────────────────────────────────────────────────────── */
const PROGRAMME_ITEMS = [
  {
    num: "01",
    title: "Preferential trade pricing",
    body: "Registered practices receive preferential pricing across the full collection. Rates are confirmed personally on approval — never listed publicly.",
  },
  {
    num: "02",
    title: "A named studio contact",
    body: "No generic inbox. Every registered practice has a direct line to a named person at the studio who can answer questions, progress commissions, and support your specification work.",
  },
  {
    num: "03",
    title: "Bespoke specification support",
    body: "Access to our full bespoke capability — custom dimensions, materials, and design development led by Anthony McCarty, our Master Craftsman, whose four decades of architectural glazing experience is available to every trade partner.",
  },
  {
    num: "04",
    title: "Full image library",
    body: "Every piece at print resolution, with dimensions and material specifications, ready for use in client presentations and project proposals. Available immediately on approval.",
  },
  {
    num: "05",
    title: "VAT invoicing",
    body: "All trade orders are invoiced ex-VAT with full VAT receipts. Project-specific invoicing and documentation available for larger commissions and hospitality developments.",
  },
  {
    num: "06",
    title: "Studio visits by appointment",
    body: "We welcome design professionals to our East London studio. See the copper being worked and the glass being cut. Most of our strongest trade relationships began with a studio visit.",
  },
];

/* ── Who we work with ────────────────────────────────────────────────────── */
const WHO_WE_WORK_WITH = [
  {
    title: "Interior Designers",
    body: "Design practices specifying for residential, hospitality, and commercial projects. Our collection is available on preferential terms and our bespoke capability means no brief needs to be compromised by what is already in production.",
  },
  {
    title: "Architects",
    body: "For architectural projects requiring bespoke copper and glass work at scale, we work directly from technical drawings and site specifications. Our Master Craftsman has four decades of experience working on landmark buildings across the world.",
  },
  {
    title: "Hospitality & Developers",
    body: "Hotels, restaurants, and mixed-use developments require a studio that can deliver at scale without compromising on craft. The Hotel Café Royal commission demonstrates what Copa + Glas can deliver for a landmark property.",
  },
];

/* ── How it works ────────────────────────────────────────────────────────── */
const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Register",
    body: "Submit your practice details below. We review every application personally and respond within two working days. There is no automated process.",
  },
  {
    num: "02",
    title: "Approval",
    body: "On approval, your named studio contact will be in touch with trade pricing, the full image library, and everything you need to begin specifying.",
  },
  {
    num: "03",
    title: "Specify",
    body: "Order from the collection or bring us a bespoke brief. Your contact manages the commission from specification through to delivery and installation.",
  },
  {
    num: "04",
    title: "Deliver",
    body: "Every piece is made to order in our East London studio. White glove delivery to site is available for all trade commissions, anywhere in the world.",
  },
];

/* ── Spec table ──────────────────────────────────────────────────────────── */
const SPEC_TABLE = [
  { label: "Minimum order", value: "No minimum" },
  { label: "Studio visits", value: "Welcome by appointment" },
  { label: "Response time", value: "Within 2 working days" },
  { label: "Worldwide delivery", value: "Available on all commissions" },
];

/* ========================================================================= */
/*  Page                                                                      */
/* ========================================================================= */

export default function TradeSpecificationPage() {
  const reduced = useReducedMotion();
  const from = (y: number) =>
    reduced ? { opacity: 0 } : { opacity: 0, y };

  const [form, setForm] = useState<TradeFormState>(initialForm);
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof TradeFormState>(
    key: K,
    value: TradeFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (
      key === "name" ||
      key === "email" ||
      key === "practiceName" ||
      key === "message"
    ) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key as FieldKey];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!form.name.trim()) errs.name = "Please share your name.";
    if (!form.email.trim()) errs.email = "An email so we can reply.";
    else if (!EMAIL_RE.test(form.email.trim()))
      errs.email = "Please check the email address.";
    if (!form.practiceName.trim())
      errs.practiceName = "Please share your practice name.";
    if (!form.message.trim())
      errs.message = "A short note about the projects you work on.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;
    if (form.website.trim().length > 0) {
      setSubmitState("sent");
      return;
    }
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitError(null);
    setSubmitState("sending");
    try {
      const practiceTypeLabel =
        PRACTICE_TYPES.find((t) => t.id === form.practiceType)?.label ?? "";
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          enquiryType: "trade",
          message: [
            `Practice: ${form.practiceName.trim()}`,
            form.practiceWebsite.trim()
              ? `Website: ${form.practiceWebsite.trim()}`
              : null,
            form.vatNumber.trim()
              ? `VAT number: ${form.vatNumber.trim()}`
              : null,
            practiceTypeLabel
              ? `Type of practice: ${practiceTypeLabel}`
              : null,
            "",
            form.message.trim(),
          ]
            .filter((l) => l !== null)
            .join("\n"),
          newsletter: false,
          product: null,
          source:
            typeof window !== "undefined"
              ? { url: window.location.href, path: window.location.pathname }
              : null,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Something didn't send.");
      }
      setSubmitState("sent");
    } catch (err) {
      setSubmitState("error");
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : "Something didn't send."
      );
    }
  };

  const firstName = form.name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="
          bg-white
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-20 md:pb-28 lg:pb-32
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">

          {/* Breadcrumb */}
          <motion.nav
            initial={from(8)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-14 md:mb-20 lg:mb-24"
          >
            <Link
              href="/"
              className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500"
            >
              Home
            </Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">Trade &amp; Specification</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

            {/* Left: eyebrow + headline + body + CTA */}
            <div className="lg:col-span-7">
              <motion.p
                initial={from(8)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease }}
                className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-7"
              >
                Trade &amp; Specification
              </motion.p>

              <motion.h1
                initial={from(20)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.12, ease }}
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(2.5rem,6vw,4.75rem)]
                  leading-[1.03] -tracking-[0.01em] font-normal
                  mb-10 md:mb-12
                "
              >
                For those who
                <br />
                <em>specify with</em>
                <br />
                intention.
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease }}
                style={{ originX: 0 }}
                className="w-10 h-px bg-accent/40 mb-10"
              />

              <motion.p
                initial={from(14)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.24, ease }}
                className="
                  max-w-[38rem]
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[15px] md:text-base lg:text-[17px]
                  leading-[1.85] text-black/80
                  mb-12
                "
              >
                Copa + Glas works directly with interior designers, architects, and
                hospitality practices. We offer preferential terms, dedicated studio
                support, and bespoke specification capability for projects of any
                scale — from a single residential commission to a full architectural
                installation.
              </motion.p>

              <motion.div
                initial={from(10)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.36, ease }}
              >
                <a
                  href="#register"
                  className="
                    group inline-flex items-center gap-4
                    py-4 px-8
                    bg-dark text-white
                    text-[10px] tracking-[0.22em] uppercase
                    no-underline
                    hover:bg-black transition-colors duration-500
                  "
                >
                  Register your practice
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
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What the Programme Includes ──────────────────────────────── */}
      <section className="bg-[#ede9e2]">
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(3.5rem,env(safe-area-inset-left))]
            3xl:px-[max(5rem,env(safe-area-inset-left))]
            py-20 md:py-28 lg:py-36
          "
        >
          <motion.p
            initial={from(8)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease }}
            className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-14 md:mb-18 lg:mb-20"
          >
            What the programme includes
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-12 md:gap-y-14">
            {PROGRAMME_ITEMS.map((item, i) => (
              <motion.div
                key={item.num}
                initial={from(18)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 1.2, delay: (i % 3) * 0.08, ease }}
                className="flex flex-col"
              >
                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.5rem,2vw,1.75rem)]
                    text-accent/70 italic font-normal mb-5
                  "
                >
                  {item.num}
                </p>

                <h3
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.1rem,1.6vw,1.3rem)]
                    leading-[1.25] font-normal text-black/90
                    mb-4
                  "
                >
                  {item.title}
                </h3>

                <div className="w-7 h-px bg-black/20 mb-4" />

                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[14px] md:text-[15px]
                    leading-[1.85] text-black/75
                  "
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Studio in Practice ───────────────────────────────────── */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">

          <motion.p
            initial={from(8)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease }}
            className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-14 md:mb-18"
          >
            The studio in practice
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-20">

            {/* Case 1: Hotel Café Royal */}
            <motion.div
              initial={from(22)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.3, ease }}
            >
              <p className="text-[9px] tracking-[0.22em] uppercase text-black/55 font-medium mb-4 flex items-center gap-2">
                Architectural Commission
                <span className="text-accent/50">·</span>
                Hospitality
              </p>
              <h3
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(1.4rem,2.2vw,1.85rem)]
                  leading-[1.2] font-normal text-black/90
                  mb-6
                "
              >
                Hotel Café Royal, London
              </h3>
              <p
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[14.5px] md:text-[15px]
                  leading-[1.85] text-black/75
                  mb-8 max-w-[44ch]
                "
              >
                A bespoke copper and glass architectural intervention for one of
                London&rsquo;s most celebrated hotels — designed and made in our East
                London studio in close collaboration with the building&rsquo;s
                architectural team. A commission of structural significance, not
                decorative work.
              </p>
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
                <Image
                  src="/cafe-royal-lightwell-1.jpg"
                  alt="Hotel Café Royal lightwell — Copa + Glas architectural commission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Case 2: Aura Sconce */}
            <motion.div
              initial={from(22)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.3, delay: 0.1, ease }}
            >
              <p className="text-[9px] tracking-[0.22em] uppercase text-black/55 font-medium mb-4 flex items-center gap-2">
                Private Commission
                <span className="text-accent/50">·</span>
                Residential
              </p>
              <h3
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(1.4rem,2.2vw,1.85rem)]
                  leading-[1.2] font-normal text-black/90
                  mb-6
                "
              >
                Aura Sconce, private client
              </h3>
              <p
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[14.5px] md:text-[15px]
                  leading-[1.85] text-black/75
                  mb-8 max-w-[44ch]
                "
              >
                Developed for a private client who wanted a wall light that did not
                yet exist — a copper and glass sconce that changed the quality of
                light in a room rather than simply adding to it. Made once, for one
                space. This is the kind of brief interior designers bring to us.
              </p>
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
                <Image
                  src="/aura-wall-light.png"
                  alt="Aura Sconce — Copa + Glas private commission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Case 3: Hotel Café Royal Lightwell placeholder */}
            <motion.div
              initial={from(16)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.2, delay: 0.06, ease }}
            >
              <p className="text-[9px] tracking-[0.22em] uppercase text-black/55 font-medium mb-4 flex items-center gap-2">
                Architectural Commission
                <span className="text-accent/50">·</span>
                Image to follow
              </p>
              <h3
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(1.4rem,2.2vw,1.85rem)]
                  leading-[1.2] font-normal text-black/90
                  mb-8
                "
              >
                Hotel Café Royal Lightwell
              </h3>
              <ImagePlaceholder label="Image to follow" ratio="aspect-[3/2]" />
            </motion.div>

            {/* Case 4: Private Residential Commission placeholder */}
            <motion.div
              initial={from(16)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.2, delay: 0.12, ease }}
            >
              <p className="text-[9px] tracking-[0.22em] uppercase text-black/55 font-medium mb-4 flex items-center gap-2">
                Studio Piece
                <span className="text-accent/50">·</span>
                Image to follow
              </p>
              <h3
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(1.4rem,2.2vw,1.85rem)]
                  leading-[1.2] font-normal text-black/90
                  mb-8
                "
              >
                Private Residential Commission
              </h3>
              <ImagePlaceholder label="Image to follow" ratio="aspect-[3/2]" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Who We Work With (dark) ──────────────────────────────────── */}
      <section className="bg-dark text-white">
        <div
          className="
            max-w-[1400px] 3xl:max-w-[1680px] mx-auto
            px-[max(1.25rem,env(safe-area-inset-left))]
            md:px-[max(2.25rem,env(safe-area-inset-left))]
            lg:px-[max(3.5rem,env(safe-area-inset-left))]
            3xl:px-[max(5rem,env(safe-area-inset-left))]
            py-20 md:py-28 lg:py-36
          "
        >
          <motion.p
            initial={from(8)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease }}
            className="text-[9px] tracking-[0.28em] uppercase text-white/60 font-medium mb-14 md:mb-18"
          >
            Who we work with
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
            {WHO_WE_WORK_WITH.map((item, i) => (
              <motion.div
                key={item.title}
                initial={from(22)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 1.2, delay: i * 0.1, ease }}
                className="flex flex-col"
              >
                <h3
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.25rem,2vw,1.5rem)]
                    leading-[1.2] font-normal text-white/95
                    mb-5
                  "
                >
                  {item.title}
                </h3>

                <div className="w-7 h-px bg-white/20 mb-5" />

                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[14.5px] md:text-[15px]
                    leading-[1.85] text-white/75
                  "
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section
        className="
          border-t border-black/[0.06]
          py-20 md:py-28 lg:py-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">

          <motion.p
            initial={from(8)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease }}
            className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-14 md:mb-18"
          >
            How it works
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 lg:gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={from(22)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 1.2, delay: i * 0.08, ease }}
                className="flex flex-col"
              >
                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.5rem,2vw,1.75rem)]
                    text-accent/70 italic font-normal mb-5
                  "
                >
                  {step.num}
                </p>

                <h3
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(1.1rem,1.6vw,1.3rem)]
                    leading-[1.25] font-normal text-black/90
                    mb-4
                  "
                >
                  {step.title}
                </h3>

                <div className="w-7 h-px bg-black/15 mb-4" />

                <p
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[14px] md:text-[15px]
                    leading-[1.85] text-black/75
                  "
                >
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Register Your Practice ───────────────────────────────────── */}
      <section
        id="register"
        className="
          bg-[#ede9e2]
          py-20 md:py-28 lg:py-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">

          <motion.p
            initial={from(8)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease }}
            className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-14 md:mb-18"
          >
            Register your practice
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

            {/* Left: copy + spec table */}
            <motion.div
              initial={from(16)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.3, ease }}
              className="lg:col-span-5 flex flex-col gap-10"
            >
              <div>
                <h2
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(2rem,4vw,3.25rem)]
                    leading-[1.06] -tracking-[0.008em] font-normal
                    text-black/90 mb-8
                  "
                >
                  A partnership,
                  <br />
                  <em>not an account.</em>
                </h2>

                <div className="space-y-5 font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] leading-[1.85] text-black/78">
                  <p>
                    We keep our trade programme deliberately small. The practices we
                    work with become long-term partners, not account numbers — and
                    every commission, however large or small, is given the same level
                    of attention from the studio.
                  </p>
                  <p>
                    Registration takes two minutes. We review every application
                    personally and respond within two working days. There are no
                    automated approvals and no standard rate cards. Just a
                    conversation about how we can work together.
                  </p>
                </div>
              </div>

              {/* Spec table */}
              <div className="border-t border-black/[0.12]">
                {SPEC_TABLE.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between gap-6 py-4 border-b border-black/[0.12]"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase text-black/55 font-medium shrink-0">
                      {row.label}
                    </span>
                    <span className="font-[family-name:var(--font-playfair),Georgia,serif] text-[14px] text-black/85 text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={from(20)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1.3, delay: 0.14, ease }}
              className="lg:col-span-6 lg:col-start-7 bg-white p-8 md:p-10 lg:p-12"
            >
              <AnimatePresence mode="wait">
                {submitState === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease }}
                    className="py-6"
                  >
                    <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-5">
                      Application received
                    </p>
                    <h3
                      className="
                        font-[family-name:var(--font-playfair),Georgia,serif]
                        text-[2rem] md:text-[2.5rem]
                        leading-[1.1] -tracking-[0.005em] font-normal
                        mb-6 text-black/90
                      "
                    >
                      Thank you, {firstName}.
                    </h3>
                    <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] leading-[1.75] text-black/78 max-w-[40ch] mb-10">
                      Your application has reached the studio. We&rsquo;ll be in touch
                      personally within two working days.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialForm);
                        setSubmitState("idle");
                        setFieldErrors({});
                        setSubmitError(null);
                      }}
                      className="text-[10px] tracking-[0.22em] uppercase bg-transparent border-none cursor-pointer border-b border-black/40 pb-0.5 text-black hover:border-black transition-colors duration-300"
                    >
                      Submit another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                  >

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mb-5">
                      <div>
                        <label htmlFor="t-name" className={LABEL}>
                          Your name
                        </label>
                        <input
                          id="t-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Your full name"
                          aria-invalid={Boolean(fieldErrors.name)}
                          className={`${INPUT} ${fieldErrors.name ? INPUT_ERR : ""}`}
                        />
                        {fieldErrors.name && (
                          <p className="mt-2 text-[11.5px] leading-[1.5] text-[#8a1f1f]">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="t-email" className={LABEL}>
                          Email address
                        </label>
                        <input
                          id="t-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@practice.com"
                          aria-invalid={Boolean(fieldErrors.email)}
                          className={`${INPUT} ${fieldErrors.email ? INPUT_ERR : ""}`}
                        />
                        {fieldErrors.email && (
                          <p className="mt-2 text-[11.5px] leading-[1.5] text-[#8a1f1f]">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Practice name */}
                    <div className="mb-5">
                      <label htmlFor="t-practice" className={LABEL}>
                        Practice name
                      </label>
                      <input
                        id="t-practice"
                        type="text"
                        required
                        autoComplete="organization"
                        value={form.practiceName}
                        onChange={(e) => update("practiceName", e.target.value)}
                        placeholder="Your practice or studio name"
                        aria-invalid={Boolean(fieldErrors.practiceName)}
                        className={`${INPUT} ${fieldErrors.practiceName ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.practiceName && (
                        <p className="mt-2 text-[11.5px] leading-[1.5] text-[#8a1f1f]">
                          {fieldErrors.practiceName}
                        </p>
                      )}
                    </div>

                    {/* Practice website */}
                    <div className="mb-5">
                      <label htmlFor="t-website-practice" className={LABEL}>
                        Practice website{" "}
                        <span className={OPTIONAL}>optional</span>
                      </label>
                      <input
                        id="t-website-practice"
                        type="url"
                        autoComplete="url"
                        value={form.practiceWebsite}
                        onChange={(e) =>
                          update("practiceWebsite", e.target.value)
                        }
                        placeholder="https://yourpractice.com"
                        className={INPUT}
                      />
                    </div>

                    {/* VAT number + Type of practice */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mb-5">
                      <div>
                        <label htmlFor="t-vat" className={LABEL}>
                          VAT number{" "}
                          <span className={OPTIONAL}>optional</span>
                        </label>
                        <input
                          id="t-vat"
                          type="text"
                          value={form.vatNumber}
                          onChange={(e) => update("vatNumber", e.target.value)}
                          placeholder="GB 000 0000 00"
                          className={INPUT}
                        />
                      </div>
                      <div>
                        <label htmlFor="t-type" className={LABEL}>
                          Type of practice
                        </label>
                        <select
                          id="t-type"
                          value={form.practiceType}
                          onChange={(e) =>
                            update("practiceType", e.target.value as PracticeType | "")
                          }
                          className={`${INPUT} appearance-none cursor-pointer`}
                        >
                          <option value="">Select…</option>
                          {PRACTICE_TYPES.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-7">
                      <label htmlFor="t-message" className={LABEL}>
                        Tell us about your practice
                      </label>
                      <textarea
                        id="t-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us about the kind of projects you work on and how you imagine working with Copa + Glas."
                        aria-invalid={Boolean(fieldErrors.message)}
                        className={`${INPUT} resize-y min-h-[8rem] leading-[1.65] ${fieldErrors.message ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.message && (
                        <p className="mt-2 text-[11.5px] leading-[1.5] text-[#8a1f1f]">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      className="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0"
                      aria-hidden
                    />

                    {/* Error */}
                    {submitState === "error" && (
                      <div
                        role="alert"
                        className="mb-6 px-4 py-3.5 border border-[#8a1f1f]/25 bg-[#8a1f1f]/[0.035] text-[13px] leading-[1.55] text-[#6e1818]"
                      >
                        {submitError || "Something didn't send. Please try again."}{" "}
                        <a
                          href="mailto:info@copaandglas.com"
                          className="underline decoration-[#6e1818]/40 underline-offset-2 hover:decoration-[#6e1818]"
                        >
                          Write to us directly.
                        </a>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-6 border-t border-black/[0.08] flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 sm:justify-between">
                      <button
                        type="submit"
                        disabled={submitState === "sending"}
                        className="
                          group inline-flex items-center justify-between gap-6
                          py-4 px-9 md:py-[1.125rem] md:px-11
                          text-[10px] tracking-[0.28em] uppercase
                          text-white no-underline bg-dark border-none cursor-pointer
                          hover:bg-black transition-colors duration-300
                          disabled:opacity-60 disabled:cursor-not-allowed
                          self-start
                        "
                      >
                        <span>
                          {submitState === "sending"
                            ? "Sending…"
                            : "Submit application"}
                        </span>
                        {submitState !== "sending" && (
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
                        )}
                      </button>

                      <p className="text-[9px] tracking-[0.22em] uppercase text-black/55 font-medium leading-[1.8]">
                        We respond within 2 working days
                        <span className="block mt-1">
                          <a
                            href="mailto:info@copaandglas.com"
                            className="text-black/70 no-underline hover:text-black transition-colors duration-300 normal-case tracking-normal text-[11px]"
                          >
                            info@copaandglas.com
                          </a>
                        </span>
                      </p>
                    </div>

                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
