"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Please try again.");
      }
      setEmail("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error && err.message ? err.message : "Please try again.");
    }
  };

  return (
    <footer className="bg-dark text-white relative z-20">
      <div className="
        max-w-[1400px] 3xl:max-w-[1680px] mx-auto
        py-12 md:py-16 lg:py-20
        px-[max(1.25rem,env(safe-area-inset-left))]
        md:px-[max(2.25rem,env(safe-area-inset-left))]
        lg:px-[max(3.5rem,env(safe-area-inset-left))]
        3xl:px-[max(5rem,env(safe-area-inset-left))]
      ">
        {/* Newsletter */}
        <div className="mb-10 md:mb-14 lg:mb-[4.5rem] pb-10 md:pb-14 lg:pb-[4.5rem] border-b border-white/[0.08]">
          <div className="max-w-full md:max-w-[400px]">
            <p className="footer-heading mb-3">Stay Informed</p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-2.5 md:gap-0 w-full md:w-[360px] max-w-full"
              aria-describedby={status === "error" || status === "sent" ? "footer-newsletter-msg" : undefined}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage(null);
                  }
                }}
                placeholder="Your email address"
                aria-invalid={status === "error"}
                className={`
                  dark-input flex-1 min-w-0 w-full md:w-auto
                  py-3.5 px-4 bg-transparent
                  border md:border-r-0
                  text-white text-[13px] font-inherit
                  box-border transition-[border-color] duration-200
                  focus:border-white/50
                  ${status === "error" ? "border-[#e09d9d]/60" : "border-white/20"}
                `}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="
                  py-3.5 px-6 bg-white text-dark border-none md:border md:border-white/20
                  text-[10px] tracking-[0.15em] uppercase font-medium
                  cursor-pointer font-inherit transition-colors duration-200
                  shrink-0 w-full md:w-auto min-h-12
                  hover:bg-white/85 disabled:opacity-60 disabled:cursor-wait
                "
              >
                {status === "sent"
                  ? "Subscribed"
                  : status === "sending"
                    ? "Subscribing…"
                    : "Subscribe"}
              </button>
            </form>
            {(status === "sent" || status === "error") && (
              <p
                id="footer-newsletter-msg"
                role={status === "error" ? "alert" : undefined}
                className={`
                  mt-3 text-[11.5px] leading-[1.55]
                  ${status === "error" ? "text-[#e09d9d]" : "text-white/55 italic"}
                `}
              >
                {status === "sent"
                  ? "Thank you. You'll hear from us occasionally."
                  : errorMessage}
              </p>
            )}
          </div>
        </div>

        <p
          className="
            text-center text-[9px] sm:text-[10px] md:text-[11px]
            text-white/40 tracking-[0.12em] mb-9 md:mb-11 lg:mb-12
            font-[family-name:var(--font-playfair),Georgia,serif] italic
            max-w-3xl mx-auto leading-[1.6] px-2
          "
        >
          Each piece made to order in our East London workshop.
        </p>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1.2fr] gap-y-8 gap-x-4 md:gap-10 lg:gap-[3.75rem] mb-10 md:mb-14 lg:mb-[4.5rem]">
          <div>
            <p className="footer-heading">Collections</p>
            <nav>
              <Link href="/mirrors" className="footer-link">Mirrors</Link>
              <Link href="/lighting" className="footer-link">Lighting</Link>
              <Link href="/limited-editions" className="footer-link">Limited Editions</Link>
            </nav>
          </div>

          <div>
            <p className="footer-heading">Studio</p>
            <nav>
              <Link href="/about" className="footer-link">About</Link>
              <Link href="/bespoke" className="footer-link">Bespoke</Link>
              <Link href="/origins" className="footer-link">Origins</Link>
              <Link href="/archive" className="footer-link">Archive</Link>
              <Link href="/trade-specification" className="footer-link">Trade &amp; Specification</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </nav>
          </div>

          <div>
            <p className="footer-heading">Information</p>
            <nav>
              <Link href="/shipping" className="footer-link">Shipping &amp; Returns</Link>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
            </nav>
          </div>

          <div>
            <p className="footer-heading">Visit &amp; Contact</p>
            <p className="text-white/55 text-[13px] md:text-sm leading-[1.8] mb-4">
              Copa + Glas Studio<br />
              East London<br />
              United Kingdom
            </p>
            <a
              href="mailto:info@copaandglas.com"
              className="footer-link inline border-b border-white/20 pb-0.5 hover:border-white/50"
            >
              info@copaandglas.com
            </a>

            <div className="flex gap-4 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.76 1.52 1.68 0 1.02-.66 2.56-.98 3.98-.28 1.18.58 2.14 1.74 2.14 2.1 0 3.7-2.2 3.7-5.38 0-2.82-2.02-4.78-4.92-4.78-3.36 0-5.32 2.5-5.32 5.1 0 1.02.38 2.1.88 2.7.1.12.1.22.08.32l-.34 1.36c-.04.18-.16.22-.36.14-1.36-.64-2.2-2.62-2.2-4.22 0-3.44 2.5-6.6 7.2-6.6 3.78 0 6.72 2.7 6.72 6.28 0 3.76-2.36 6.78-5.66 6.78-1.1 0-2.14-.58-2.5-1.26l-.68 2.58c-.24.94-.9 2.12-1.34 2.84A12 12 0 1 0 12 0z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="
        border-t border-white/[0.08]
        max-w-[1400px] 3xl:max-w-[1680px] mx-auto
        flex flex-col md:flex-row justify-between items-start md:items-center
        gap-2 md:gap-0 text-[10px] md:text-[11px] tracking-[0.08em] text-white/25
        pt-5 md:pt-6
        pb-[max(1.25rem,env(safe-area-inset-bottom))]
        md:pb-[max(1.5rem,env(safe-area-inset-bottom))]
        px-[max(1.25rem,env(safe-area-inset-left))]
        md:px-[max(2.25rem,env(safe-area-inset-left))]
        lg:px-[max(3.5rem,env(safe-area-inset-left))]
        3xl:px-[max(5rem,env(safe-area-inset-left))]
      ">
        <p>&copy; {new Date().getFullYear()} Copa + Glas Studio. All rights reserved.</p>
        <p className="italic">Handmade in East London</p>
      </div>
    </footer>
  );
}
