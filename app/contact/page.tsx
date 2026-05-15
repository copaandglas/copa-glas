"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* -------------------------------------------------------------------------- */
/*  Form types                                                                 */
/* -------------------------------------------------------------------------- */

type Timeline = "within-month" | "1-3-months" | "later-year" | "exploring";
type EnquiryType = "general" | "commission" | "trade";

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
  { id: "general", label: "General", hint: "A question about the studio or a piece" },
  { id: "commission", label: "Commission", hint: "A bespoke or made-to-order piece" },
  { id: "trade", label: "Trade", hint: "Architects, designers, specifiers" },
];

type FieldKey = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LABEL = "block text-[10px] tracking-[0.18em] uppercase font-medium mb-2.5 text-black/70";
const OPTIONAL = "text-black/30 normal-case tracking-normal ml-2 text-[10px] italic";
const INPUT =
  "w-full py-3.5 px-4 bg-white border border-black/[0.16] text-[15px] leading-[1.4] font-[family-name:var(--font-playfair),Georgia,serif] placeholder:text-black/30 focus:border-black focus:shadow-[0_0_0_1px_rgb(0_0_0)] transition-[border-color,box-shadow] duration-200 box-border outline-none";
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

  const initial = (y: number) =>
    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
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
    if (!form.email.trim()) {
      errs.email = "An email so we can reply.";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      errs.email = "Please check the email address.";
    }
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
          name: form.name.trim(),
          email: form.email.trim(),
          telephone: form.telephone.trim() || null,
          location: form.location.trim() || null,
          timeline: form.timeline || null,
          enquiryType: form.enquiryType,
          message: form.message.trim(),
          newsletter: form.newsletter,
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

      {/* ========== HERO ========== */}
      <section
        className="
          bg-white
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
            initial={initial(8)}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: luxuryEase }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-12 md:mb-16 lg:mb-24"
          >
            <Link href="/" className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500">Home</Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">Contact</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            {/* Left: heading + studio details */}
            <motion.div
              initial={initial(18)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.1, ease: luxuryEase }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span aria-hidden className="block h-px w-10 md:w-14 bg-black/25" />
                <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase opacity-60">The Studio</p>
              </div>

              <h1
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(2.5rem,6vw,4.5rem)]
                  leading-[1.02] -tracking-[0.012em] font-normal
                  mb-10 md:mb-12 lg:mb-14
                "
              >
                Get in <em className="italic">touch.</em>
              </h1>

              {/* Contact details */}
              <div className="space-y-8 md:space-y-10">
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-45 mb-3">Email</p>
                  <a
                    href="mailto:info@copaandglas.com"
                    className="
                      font-[family-name:var(--font-playfair),Georgia,serif]
                      text-[17px] md:text-[19px] text-inherit no-underline
                      border-b border-black/20 pb-0.5
                      hover:border-black/70 transition-colors duration-500
                    "
                  >
                    info@copaandglas.com
                  </a>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-45 mb-3">Studio</p>
                  <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[17px] md:text-[19px] opacity-80 leading-[1.6]">
                    East London<br />England
                  </p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-45 mb-3">Response</p>
                  <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base opacity-60 leading-[1.7] max-w-[32ch]">
                    We reply to every enquiry personally, typically within two working days.
                  </p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-45 mb-4">Follow</p>
                  <div className="flex gap-5">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-black/50 hover:text-black transition-colors duration-300"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pinterest"
                      className="text-black/50 hover:text-black transition-colors duration-300"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.76 1.52 1.68 0 1.02-.66 2.56-.98 3.98-.28 1.18.58 2.14 1.74 2.14 2.1 0 3.7-2.2 3.7-5.38 0-2.82-2.02-4.78-4.92-4.78-3.36 0-5.32 2.5-5.32 5.1 0 1.02.38 2.1.88 2.7.1.12.1.22.08.32l-.34 1.36c-.04.18-.16.22-.36.14-1.36-.64-2.2-2.62-2.2-4.22 0-3.44 2.5-6.6 7.2-6.6 3.78 0 6.72 2.7 6.72 6.28 0 3.76-2.36 6.78-5.66 6.78-1.1 0-2.14-.58-2.5-1.26l-.68 2.58c-.24.94-.9 2.12-1.34 2.84A12 12 0 1 0 12 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={initial(20)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.2, ease: luxuryEase }}
              className="lg:col-span-6 lg:col-start-7"
            >
              {submitState === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: luxuryEase }}
                  className="pt-4 md:pt-8"
                >
                  <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-4">Received</p>
                  <h2 className="font-[family-name:var(--font-playfair),Georgia,serif] text-[2rem] md:text-[2.5rem] leading-[1.1] -tracking-[0.005em] font-normal mb-6">
                    Thank you, {firstName}.
                  </h2>
                  <p className="font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.75] opacity-70 max-w-[42ch] mb-10">
                    Your note has reached the studio. We&rsquo;ll be in touch personally within two working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm(initialState); setSubmitState("idle"); setFieldErrors({}); }}
                    className="
                      text-[10px] tracking-[0.22em] uppercase
                      bg-transparent border-none cursor-pointer
                      border-b border-black/40 pb-0.5 text-black
                      hover:border-black transition-colors duration-300
                    "
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="pt-4 md:pt-8">

                  {/* Enquiry type */}
                  <FormField>
                    <span className={LABEL}>Type of enquiry</span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {ENQUIRY_TYPES.map((type) => {
                        const active = form.enquiryType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => update("enquiryType", type.id)}
                            aria-pressed={active}
                            className={`
                              text-left px-3.5 py-3.5 border
                              transition-[border-color,background-color] duration-300
                              cursor-pointer
                              ${active
                                ? "border-black bg-offwhite"
                                : "border-black/[0.14] bg-white hover:border-black/40"}
                            `}
                          >
                            <span className={`block text-[12px] tracking-[0.04em] mb-1 ${active ? "text-black" : "text-black/70"}`}>
                              {type.label}
                            </span>
                            <span className="block text-[10px] leading-[1.4] text-black/40">
                              {type.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </FormField>

                  {/* Name */}
                  <FormField>
                    <label htmlFor="c-name" className={LABEL}>Name</label>
                    <input
                      ref={firstFieldRef}
                      id="c-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
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
                      id="c-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      className={`${INPUT} ${fieldErrors.email ? INPUT_ERR : ""}`}
                    />
                    {fieldErrors.email && <FieldErr>{fieldErrors.email}</FieldErr>}
                  </FormField>

                  {/* Telephone + Location — side by side on md+ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4 mb-5 md:mb-6">
                    <div>
                      <label htmlFor="c-tel" className={LABEL}>
                        Telephone <span className={OPTIONAL}>optional</span>
                      </label>
                      <input
                        id="c-tel"
                        type="tel"
                        autoComplete="tel"
                        value={form.telephone}
                        onChange={(e) => update("telephone", e.target.value)}
                        placeholder="Including country code"
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label htmlFor="c-location" className={LABEL}>
                        Location <span className={OPTIONAL}>optional</span>
                      </label>
                      <input
                        id="c-location"
                        type="text"
                        autoComplete="address-level2"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="City, Country"
                        className={INPUT}
                      />
                    </div>
                  </div>

                  {/* Timeline (only for commission) */}
                  {form.enquiryType === "commission" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: luxuryEase }}
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
                                  text-[12px] tracking-[0.04em]
                                  py-3 px-3.5 text-left border
                                  transition-[border-color,background-color] duration-200
                                  cursor-pointer
                                  ${active
                                    ? "border-black bg-offwhite text-black"
                                    : "border-black/[0.14] bg-white text-black/60 hover:border-black/40"}
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

                  {/* Message */}
                  <FormField>
                    <label htmlFor="c-message" className={LABEL}>Message</label>
                    <textarea
                      id="c-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={
                        form.enquiryType === "commission"
                          ? "Tell us about the piece, the space, and anything you have in mind."
                          : form.enquiryType === "trade"
                          ? "Tell us about your practice and the project."
                          : "Tell us a little about what you have in mind."
                      }
                      aria-invalid={Boolean(fieldErrors.message)}
                      className={`${INPUT} resize-y min-h-36 leading-[1.6] ${fieldErrors.message ? INPUT_ERR : ""}`}
                    />
                    {fieldErrors.message && <FieldErr>{fieldErrors.message}</FieldErr>}
                  </FormField>

                  {/* Newsletter */}
                  <FormField>
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={form.newsletter}
                        onChange={(e) => update("newsletter", e.target.checked)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className={`
                          mt-[3px] shrink-0 w-4 h-4 border
                          flex items-center justify-center
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
                      <span className="text-[13px] leading-[1.55] text-black/65 group-hover:text-black/85 transition-colors">
                        Keep me in mind for occasional studio news. Rare, considered.
                      </span>
                    </label>
                  </FormField>

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

                  {submitState === "error" && (
                    <div role="alert" className="mb-5 px-4 py-3 border border-[#8a1f1f]/25 bg-[#8a1f1f]/[0.035] text-[13px] leading-[1.55] text-[#6e1818]">
                      {submitError || "Something didn't send. Please try again."}
                      {" "}
                      <a href="mailto:info@copaandglas.com" className="underline decoration-[#6e1818]/40 underline-offset-2 hover:decoration-[#6e1818]">
                        Write to us directly.
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
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
                    <p className="text-[11px] leading-[1.5] text-black/40">
                      Two working days, typically.
                    </p>
                  </div>
                </form>
              )}
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
