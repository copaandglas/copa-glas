"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/*  Types & data                                                              */
/* -------------------------------------------------------------------------- */

type Timeline = "within-month" | "1-3-months" | "later-year" | "exploring";
type EnquiryType = "general" | "commission" | "trade" | "pr";

interface FormState {
  enquiryType: EnquiryType;
  name: string;
  email: string;
  telephone: string;
  location: string;
  timeline: Timeline | "";
  message: string;
  newsletter: boolean;
  website: string;
}

const initialState: FormState = {
  enquiryType: "general",
  name: "",
  email: "",
  telephone: "",
  location: "",
  timeline: "",
  message: "",
  newsletter: false,
  website: "",
};

const TIMELINE_OPTIONS: { id: Timeline; label: string }[] = [
  { id: "within-month", label: "Within a month" },
  { id: "1-3-months", label: "1 to 3 months" },
  { id: "later-year", label: "Later this year" },
  { id: "exploring", label: "Still exploring" },
];

const ENQUIRY_TYPES: { id: EnquiryType; label: string; hint: string }[] = [
  { id: "general",    label: "General",    hint: "A question about the studio or a piece" },
  { id: "commission", label: "Commission", hint: "A bespoke or made-to-order piece" },
  { id: "trade",      label: "Trade",      hint: "Architects, designers, specifiers" },
  { id: "pr",         label: "Press & PR", hint: "Editorial, features, press requests" },
];

const MESSAGE_PLACEHOLDER: Record<EnquiryType, string> = {
  general:    "Tell us a little about what you have in mind.",
  commission: "Tell us about the piece, the space, and anything you have in mind.",
  trade:      "Tell us about your practice and the project.",
  pr:         "Tell us about the publication, feature, or request.",
};

type FieldKey = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GRAIN_SVG = "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Field style constants */
const LABEL    = "block text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-black/70";
const OPTIONAL = "text-black/30 normal-case tracking-normal ml-2 text-[10px] italic";
const INPUT    = "w-full py-3.5 px-4 bg-white border border-black/[0.16] text-[15px] leading-[1.4] font-[family-name:var(--font-playfair),Georgia,serif] placeholder:text-black/30 focus:border-black focus:shadow-[0_0_0_1px_rgb(0_0_0)] transition-[border-color,box-shadow] duration-200 box-border outline-none";
const INPUT_ERR = "border-[#8a1f1f]/60 focus:border-[#8a1f1f] focus:shadow-[0_0_0_1px_rgb(138_31_31)]";

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const anim = (y: number) =>
    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" || key === "email" || key === "message") {
      setFieldErrors((prev) => { const n = { ...prev }; delete n[key as FieldKey]; return n; });
    }
    if (submitError) setSubmitError(null);
  };

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!form.name.trim()) errs.name = "Please share your name.";
    if (!form.email.trim()) errs.email = "An email so we can reply.";
    else if (!EMAIL_RE.test(form.email.trim())) errs.email = "Please check the email address.";
    if (!form.message.trim()) errs.message = "A short note — whatever's on your mind.";
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
          name: form.name.trim(), email: form.email.trim(),
          telephone: form.telephone.trim() || null,
          location: form.location.trim() || null,
          timeline: form.timeline || null,
          enquiryType: form.enquiryType,
          message: form.message.trim(),
          newsletter: form.newsletter, product: null,
          source: typeof window !== "undefined"
            ? { url: window.location.href, path: window.location.pathname } : null,
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

      <section
        className="
          bg-white
          pt-28 md:pt-36 lg:pt-44 3xl:pt-48
          pb-20 md:pb-28 lg:pb-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
          3xl:px-[max(5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">

          {/* Breadcrumb */}
          <motion.nav
            initial={anim(8)} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-12 md:mb-16 lg:mb-24"
          >
            <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500">Home</Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">Contact</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

            {/* ===== LEFT ===== */}
            <motion.div
              initial={anim(16)} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.08, ease: luxuryEase }}
              className="lg:col-span-5 flex flex-col gap-10 md:gap-12"
            >
              {/* Heading */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
                  <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase opacity-55">The Studio</p>
                </div>
                <h1
                  className="
                    font-[family-name:var(--font-playfair),Georgia,serif]
                    text-[clamp(2.5rem,6vw,4.5rem)]
                    leading-[1.02] -tracking-[0.012em] font-normal
                  "
                >
                  Get in <em className="italic">touch.</em>
                </h1>
              </div>

              {/* Email + Studio (horizontal on sm+) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-40 mb-3">Email</p>
                  <a
                    href="mailto:info@copaandglas.com"
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[16px] md:text-[17px] text-inherit no-underline
                      border-b border-black/20 pb-0.5
                      hover:border-black/70 transition-colors duration-500
                    "
                  >
                    info@copaandglas.com
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-40 mb-3">Studio</p>
                  <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[16px] md:text-[17px] opacity-80 leading-[1.6]">
                    East London<br />England
                  </p>
                </div>
              </div>

              {/* Response note */}
              <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[14px] md:text-[15px] opacity-50 leading-[1.7] italic max-w-[36ch]">
                We reply to every enquiry personally, typically within two working days.
              </p>

              {/* Founders image */}
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
                <Image
                  src="/founders.png"
                  alt="Anthony McCarty and Bradley Mcwhinney, Copa + Glas founders"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: GRAIN_SVG, backgroundSize: "240px 240px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* ===== RIGHT — FORM ===== */}
            <motion.div
              initial={anim(20)} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.18, ease: luxuryEase }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <AnimatePresence mode="wait">
                {submitState === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: luxuryEase }}
                    className="pt-2"
                  >
                    <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-5">Received</p>
                    <h2 className="font-[family-name:var(--font-playfair),Georgia,serif] text-[2rem] md:text-[2.5rem] leading-[1.1] -tracking-[0.005em] font-normal mb-6">
                      Thank you, {firstName}.
                    </h2>
                    <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.75] opacity-65 max-w-[42ch] mb-10">
                      Your note has reached the studio. We&rsquo;ll be in touch personally within two working days.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setForm(initialState); setSubmitState("idle"); setFieldErrors({}); setSubmitError(null); }}
                      className="text-[10px] tracking-[0.22em] uppercase bg-transparent border-none cursor-pointer border-b border-black/40 pb-0.5 text-black hover:border-black transition-colors duration-300"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit} noValidate
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: luxuryEase }}
                    className="pt-2"
                  >
                    {/* Enquiry type — larger tiles, clear visual weight */}
                    <FormField>
                      <span className={LABEL}>Type of enquiry</span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {ENQUIRY_TYPES.map((type) => {
                          const active = form.enquiryType === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => update("enquiryType", type.id)}
                              aria-pressed={active}
                              className={`
                                text-left px-4 py-4 border
                                transition-[border-color,background-color] duration-300
                                cursor-pointer
                                ${active
                                  ? "border-black bg-offwhite"
                                  : "border-black/[0.14] bg-white hover:border-black/35 hover:bg-faint"}
                              `}
                            >
                              <span className={`block text-[13px] md:text-[14px] tracking-[0.02em] mb-1.5 ${active ? "text-black" : "text-black/75"}`}>
                                {type.label}
                              </span>
                              <span className="block text-[11px] md:text-[12px] leading-[1.45] text-black/40">
                                {type.hint}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </FormField>

                    {/* Divider */}
                    <div className="border-t border-black/[0.06] my-6 md:my-8" />

                    {/* Name */}
                    <FormField>
                      <label htmlFor="c-name" className={LABEL}>Name</label>
                      <input
                        ref={firstFieldRef}
                        id="c-name" type="text" required autoComplete="name"
                        value={form.name} onChange={(e) => update("name", e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={Boolean(fieldErrors.name)}
                        className={`${INPUT} ${fieldErrors.name ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.name && <FieldErr>{fieldErrors.name}</FieldErr>}
                    </FormField>

                    {/* Email */}
                    <FormField>
                      <label htmlFor="c-email" className={LABEL}>Email</label>
                      <input
                        id="c-email" type="email" required autoComplete="email"
                        value={form.email} onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(fieldErrors.email)}
                        className={`${INPUT} ${fieldErrors.email ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.email && <FieldErr>{fieldErrors.email}</FieldErr>}
                    </FormField>

                    {/* Telephone + Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mb-5 md:mb-6">
                      <div>
                        <label htmlFor="c-tel" className={LABEL}>
                          Telephone <span className={OPTIONAL}>optional</span>
                        </label>
                        <input
                          id="c-tel" type="tel" autoComplete="tel"
                          value={form.telephone} onChange={(e) => update("telephone", e.target.value)}
                          placeholder="Including country code"
                          className={INPUT}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-location" className={LABEL}>
                          Location <span className={OPTIONAL}>optional</span>
                        </label>
                        <input
                          id="c-location" type="text" autoComplete="address-level2"
                          value={form.location} onChange={(e) => update("location", e.target.value)}
                          placeholder="City, Country"
                          className={INPUT}
                        />
                      </div>
                    </div>

                    {/* Timeline — commission only, guarded for reduced-motion */}
                    <AnimatePresence>
                      {form.enquiryType === "commission" && (
                        <motion.div
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.45, ease: luxuryEase }}
                          style={{ overflow: "hidden" }}
                        >
                          <FormField>
                            <span className={LABEL}>Timeline <span className={OPTIONAL}>optional</span></span>
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
                                        ? "border-black bg-offwhite text-black"
                                        : "border-black/[0.14] bg-white text-black/60 hover:border-black/35 hover:bg-faint"}
                                    `}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </FormField>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message */}
                    <FormField>
                      <label htmlFor="c-message" className={LABEL}>Message</label>
                      <textarea
                        id="c-message" required rows={6}
                        value={form.message} onChange={(e) => update("message", e.target.value)}
                        placeholder={MESSAGE_PLACEHOLDER[form.enquiryType]}
                        aria-invalid={Boolean(fieldErrors.message)}
                        className={`${INPUT} resize-y min-h-[10rem] leading-[1.65] ${fieldErrors.message ? INPUT_ERR : ""}`}
                      />
                      {fieldErrors.message && <FieldErr>{fieldErrors.message}</FieldErr>}
                    </FormField>

                    {/* Newsletter */}
                    <FormField>
                      <label className="flex items-start gap-3 cursor-pointer group select-none">
                        <input
                          type="checkbox" checked={form.newsletter}
                          onChange={(e) => update("newsletter", e.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden
                          className={`
                            mt-[3px] shrink-0 w-4 h-4 border flex items-center justify-center
                            transition-[background-color,border-color] duration-150
                            peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black
                            ${form.newsletter ? "bg-black border-black" : "bg-white border-black/30 group-hover:border-black/60"}
                          `}
                        >
                          <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className={`w-[10px] h-[10px] transition-[opacity,transform] duration-150 ${form.newsletter ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                          >
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        </span>
                        <span className="text-[13px] leading-[1.55] text-black/60 group-hover:text-black/85 transition-colors">
                          Keep me in mind for occasional studio news. Rare, considered.
                        </span>
                      </label>
                    </FormField>

                    {/* Honeypot */}
                    <input
                      type="text" name="website" tabIndex={-1} autoComplete="off"
                      value={form.website} onChange={(e) => update("website", e.target.value)}
                      className="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0"
                      aria-hidden
                    />

                    {/* Error */}
                    {submitState === "error" && (
                      <div role="alert" className="mb-6 px-4 py-3.5 border border-[#8a1f1f]/25 bg-[#8a1f1f]/[0.035] text-[13px] leading-[1.55] text-[#6e1818]">
                        {submitError || "Something didn't send. Please try again."}
                        {" "}
                        <a href="mailto:info@copaandglas.com" className="underline decoration-[#6e1818]/40 underline-offset-2 hover:decoration-[#6e1818]">
                          Write to us directly.
                        </a>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <button
                        type="submit"
                        disabled={submitState === "sending"}
                        className="
                          inline-flex items-center justify-center gap-2.5
                          py-4 px-8 bg-dark text-white border-none
                          text-[11px] tracking-[0.22em] uppercase
                          cursor-pointer disabled:opacity-65 disabled:cursor-wait
                          transition-colors duration-500 hover:bg-black
                          self-start
                        "
                      >
                        {submitState === "sending" ? "Sending…" : "Send to the studio"}
                        {submitState !== "sending" && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        )}
                      </button>
                      <p className="text-[11px] leading-[1.5] text-black/40 italic">
                        Two working days, typically.
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

function FormField({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 md:mb-6">{children}</div>;
}

function FieldErr({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[11.5px] leading-[1.5] text-[#8a1f1f]">{children}</p>;
}
