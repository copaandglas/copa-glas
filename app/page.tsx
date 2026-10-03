import type { Metadata } from "next";
import HomePage from "@/app/components/HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
