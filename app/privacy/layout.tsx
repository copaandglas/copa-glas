import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Copa + Glas Studio — how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — Copa + Glas",
    description: "Privacy Policy for Copa + Glas Studio — how we collect, use, and protect your personal information.",
    url: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
