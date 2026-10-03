import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { faqSections } from "@/app/lib/faqs";
import { CONTACT } from "@/app/lib/site";

const BODY =
  "font-[family-name:var(--font-playfair),Georgia,serif] text-[15px] md:text-base leading-[1.85] text-black/80";

const LINK =
  "text-inherit underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-colors duration-300";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white text-dark">
      <Header variant="dark" />

      <main
        className="
          pt-28 md:pt-36 lg:pt-44
          pb-20 md:pb-28 lg:pb-36
          px-[max(1.25rem,env(safe-area-inset-left))]
          md:px-[max(2.25rem,env(safe-area-inset-left))]
          lg:px-[max(3.5rem,env(safe-area-inset-left))]
        "
      >
        <div className="max-w-[1400px] 3xl:max-w-[1680px] mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-y-1.5 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-14 md:mb-20"
          >
            <Link
              href="/"
              className="text-inherit no-underline opacity-50 hover:opacity-90 transition-opacity duration-500"
            >
              Home
            </Link>
            <span className="opacity-25 mx-2">/</span>
            <span className="opacity-90">Questions</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            <header className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="text-[9px] tracking-[0.28em] uppercase text-black/62 font-medium mb-7">
                Information
              </p>

              <h1
                className="
                  font-[family-name:var(--font-playfair),Georgia,serif]
                  text-[clamp(2.5rem,6vw,4.25rem)]
                  leading-[1.03] -tracking-[0.01em] font-normal
                  mb-8 md:mb-10
                "
              >
                Matters of detail.
              </h1>

              <div className="w-10 h-px bg-black/15 mb-8" />

              <p className={`max-w-[32rem] ${BODY}`}>
                A few notes for collectors, designers, and those commissioning
                a piece for the first time: how the work is made, how it is
                acquired, and how it is cared for. For anything further, write
                to the studio at{" "}
                <a href={`mailto:${CONTACT.email}`} className={LINK}>
                  {CONTACT.email}
                </a>
                .
              </p>
            </header>

            <div className="lg:col-span-7">
              <div className="divide-y divide-black/[0.08]">
                {faqSections.map((section) => (
                  <section
                    key={section.title}
                    id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    className="py-10 md:py-12 first:pt-0"
                  >
                    <h2 className="text-[10px] tracking-[0.22em] uppercase font-medium text-black/55 mb-8">
                      {section.title}
                    </h2>

                    <div className="space-y-10">
                      {section.faqs.map((faq) => (
                        <div key={faq.question}>
                          <h3
                            className="
                              font-[family-name:var(--font-playfair),Georgia,serif]
                              text-[clamp(1.15rem,1.8vw,1.35rem)]
                              leading-[1.25] font-normal text-black/90
                              mb-4
                            "
                          >
                            {faq.question}
                          </h3>
                          <p className={BODY}>{faq.answer}</p>
                          {faq.link && (
                            <p className="mt-4">
                              <Link
                                href={faq.link.href}
                                className="
                                  text-[10px] tracking-[0.22em] uppercase font-medium no-underline
                                  text-black/45 hover:text-black/80
                                  border-b border-black/15 hover:border-black/40 pb-1
                                  transition-colors duration-300
                                "
                              >
                                {faq.link.label}
                              </Link>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
