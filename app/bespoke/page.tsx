"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Bespoke commission form types ───────────────────────────────────────── */
type CommissionType = "private" | "architectural" | "trade" | "other";
type Timeline = "within-3" | "3-6" | "later-year" | "exploring";

interface BespokeFormState {
  commissionType: CommissionType;
  name: string;
  email: string;
  telephone: string;
  location: string;
  timeline: Timeline | "";
  message: string;
  website: string;
}

const initialForm: BespokeFormState = {
  commissionType: "private",
  name: "",
  email: "",
  telephone: "",
  location: "",
  timeline: "",
  message: "",
  website: "",
};

const COMMISSION_TYPES: { id: CommissionType; label: string; hint: string }[] = [
  { id: "private",       label: "Private commission", hint: "A piece for your home or personal space" },
  { id: "architectural", label: "Architectural",      hint: "Hospitality, retail, or large-scale installation" },
  { id: "trade",         label: "Interior / Trade",   hint: "Architects, designers, and specifiers" },
  { id: "other",         label: "Something else",     hint: "A conversation about a possibility" },
];

const TIMELINE_OPTIONS: { id: Timeline; label: string }[] = [
  { id: "within-3",   label: "Within 3 months" },
  { id: "3-6",        label: "3 to 6 months" },
  { id: "later-year", label: "Later this year" },
  { id: "exploring",  label: "Still exploring" },
];

const MESSAGE_PLACEHOLDER: Record<CommissionType, string> = {
  private:       "Tell us about the space, the brief, and what you have in mind.",
  architectural: "Tell us about the project, the scope, and the team involved.",
  trade:         "Tell us about the practice and the project.",
  other:         "Tell us what you are thinking about.",
};

type FieldKey = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Dark-on-dark form styling */
const DARK_LABEL = "block text-[10px] tracking-[0.22em] uppercase font-medium mb-2.5 text-white/55";
const DARK_OPTIONAL = "text-white/25 normal-case tracking-normal ml-2 text-[10px] italic";
const DARK_INPUT = "w-full py-3.5 px-4 bg-white/[0.04] border border-white/15 text-[15px] leading-[1.4] font-[family-name:var(--font-playfair),Georgia,serif] text-white placeholder:text-white/30 focus:border-white/65 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.45)] transition-[border-color,box-shadow] duration-200 box-border outline-none";
const DARK_INPUT_ERR = "border-[#d97a7a]/55 focus:border-[#d97a7a] focus:shadow-[0_0_0_1px_rgba(217,122,122,0.55)]";

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

  /* ── Form state ──────────────────────────────────────────────────────── */
  const [form, setForm] = useState<BespokeFormState>(initialForm);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof BespokeFormState>(key: K, value: BespokeFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" || key === "email" || key === "message") {
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
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = "Please check the email address.";
    if (!form.message.trim()) errs.message = "A short note about the project.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;
    if (form.website.trim().length > 0) { setSubmitState("sent"); return; }
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitError(null);
    setSubmitState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          telephone: form.telephone.trim() || null,
          location: form.location.trim() || null,
          timeline: form.timeline || null,
          enquiryType: "commission",
          message: `[${COMMISSION_TYPES.find((c) => c.id === form.commissionType)?.label ?? "Bespoke"}]\n\n${form.message.trim()}`,
          newsletter: false,
          product: null,
          source: typeof window !== "undefined"
            ? { url: window.location.href, path: window.location.pathname }
            : null,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something didn't send.");
      }
      setSubmitState("sent");
    } catch (err) {
      setSubmitState("error");
      setSubmitError(err instanceof Error && err.message ? err.message : "Something didn't send.");
    }
  };

  const firstName = form.name.trim().split(/\s+/)[0] || "there";

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
          {/* Headline */}
          <div className="max-w-[640px] mx-auto text-center mb-16 md:mb-20">
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
                leading-[1.85] text-white/70
              "
            >
              We respond to every bespoke enquiry personally. There is no
              automated reply, no standard rate card. Just a conversation about
              what you want to make.
            </motion.p>
          </div>

          {/* Form */}
          <motion.div
            initial={from(18)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 1.3, delay: 0.18, ease }}
            className="max-w-[680px] mx-auto"
          >
            <AnimatePresence mode="wait">
              {submitState === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="text-center py-10"
                >
                  <p className="text-[10px] tracking-[0.28em] uppercase text-accent/90 mb-5">Received</p>
                  <h3 className="font-[family-name:var(--font-playfair),Georgia,serif] text-[2rem] md:text-[2.5rem] leading-[1.1] -tracking-[0.005em] font-normal mb-6 text-white/95">
                    Thank you, {firstName}.
                  </h3>
                  <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.75] text-white/65 max-w-[42ch] mx-auto mb-10">
                    Your enquiry has reached the studio. We&rsquo;ll be in touch personally, usually within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitState("idle");
                      setFieldErrors({});
                      setSubmitError(null);
                    }}
                    className="text-[10px] tracking-[0.22em] uppercase bg-transparent border-none cursor-pointer border-b border-white/40 pb-0.5 text-white hover:border-white transition-colors duration-300"
                  >
                    Send another
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
                  {/* Commission type */}
                  <div className="mb-7 md:mb-8">
                    <span className={DARK_LABEL}>Type of commission</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {COMMISSION_TYPES.map((type) => {
                        const active = form.commissionType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => update("commissionType", type.id)}
                            aria-pressed={active}
                            className={`
                              text-left px-4 py-4 border
                              transition-[border-color,background-color] duration-300
                              cursor-pointer
                              ${active
                                ? "border-white/85 bg-white/[0.08]"
                                : "border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.04]"}
                            `}
                          >
                            <span className={`block text-[13px] md:text-[14px] tracking-[0.02em] mb-1.5 ${active ? "text-white" : "text-white/80"}`}>
                              {type.label}
                            </span>
                            <span className="block text-[11px] md:text-[12px] leading-[1.45] text-white/40">
                              {type.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/[0.08] my-6 md:my-7" />

                  {/* Name */}
                  <div className="mb-5">
                    <label htmlFor="b-name" className={DARK_LABEL}>Name</label>
                    <input
                      id="b-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                      aria-invalid={Boolean(fieldErrors.name)}
                      className={`dark-input ${DARK_INPUT} ${fieldErrors.name ? DARK_INPUT_ERR : ""}`}
                    />
                    {fieldErrors.name && (
                      <p className="mt-2 text-[12px] text-[#d97a7a]/90">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label htmlFor="b-email" className={DARK_LABEL}>Email</label>
                    <input
                      id="b-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className={`dark-input ${DARK_INPUT} ${fieldErrors.email ? DARK_INPUT_ERR : ""}`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-2 text-[12px] text-[#d97a7a]/90">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Telephone + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mb-5">
                    <div>
                      <label htmlFor="b-tel" className={DARK_LABEL}>
                        Telephone <span className={DARK_OPTIONAL}>optional</span>
                      </label>
                      <input
                        id="b-tel"
                        type="tel"
                        autoComplete="tel"
                        value={form.telephone}
                        onChange={(e) => update("telephone", e.target.value)}
                        placeholder="Including country code"
                        className={`dark-input ${DARK_INPUT}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="b-location" className={DARK_LABEL}>
                        Location <span className={DARK_OPTIONAL}>optional</span>
                      </label>
                      <input
                        id="b-location"
                        type="text"
                        autoComplete="address-level2"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="City, Country"
                        className={`dark-input ${DARK_INPUT}`}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <span className={DARK_LABEL}>
                      Timeline <span className={DARK_OPTIONAL}>optional</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {TIMELINE_OPTIONS.map((opt) => {
                        const active = form.timeline === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => update("timeline", active ? "" : opt.id)}
                            aria-pressed={active}
                            className={`
                              text-[13px] md:text-[14px] tracking-[0.02em]
                              py-3.5 px-4 text-left border
                              transition-[border-color,background-color] duration-200 cursor-pointer
                              ${active
                                ? "border-white/85 bg-white/[0.08] text-white"
                                : "border-white/15 bg-white/[0.02] text-white/65 hover:border-white/40 hover:bg-white/[0.04]"}
                            `}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label htmlFor="b-message" className={DARK_LABEL}>Tell us about the project</label>
                    <textarea
                      id="b-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={MESSAGE_PLACEHOLDER[form.commissionType]}
                      aria-invalid={Boolean(fieldErrors.message)}
                      className={`dark-input ${DARK_INPUT} resize-y min-h-[10rem] leading-[1.65] ${fieldErrors.message ? DARK_INPUT_ERR : ""}`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-2 text-[12px] text-[#d97a7a]/90">{fieldErrors.message}</p>
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
                    <div role="alert" className="mb-6 px-4 py-3.5 border border-[#d97a7a]/30 bg-[#d97a7a]/[0.06] text-[13px] leading-[1.55] text-[#f1c0c0]">
                      {submitError || "Something didn't send. Please try again."}
                      {" "}
                      <a
                        href="mailto:studio@copaglas.com"
                        className="underline decoration-[#f1c0c0]/40 underline-offset-2 hover:decoration-[#f1c0c0]"
                      >
                        Write to us directly.
                      </a>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 sm:justify-between">
                    <button
                      type="submit"
                      disabled={submitState === "sending"}
                      className="
                        group inline-flex items-center justify-between gap-6
                        py-4 px-9 md:py-[1.125rem] md:px-12
                        min-w-[18rem]
                        text-[10px] tracking-[0.28em] uppercase
                        text-dark no-underline bg-white border-none cursor-pointer
                        hover:bg-white/90 transition-colors duration-300
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                    >
                      <span>{submitState === "sending" ? "Sending…" : "Send enquiry"}</span>
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
                    </button>

                    <p className="text-[9px] tracking-[0.24em] uppercase text-white/40 font-medium leading-[1.7]">
                      We respond within 24 hours
                      <span className="block text-white/30 mt-1">
                        <a
                          href="mailto:studio@copaglas.com"
                          className="text-white/55 no-underline hover:text-white/85 transition-colors duration-300"
                        >
                          studio@copaglas.com
                        </a>
                      </span>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
