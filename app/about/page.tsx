import type { Metadata } from "next";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutPurposeSection from "@/components/about/AboutPurposeSection";
import AboutInfoSection from "@/components/about/AboutInfoSection";

export const metadata: Metadata = {
   title: "About | BookPulse",
  description: "About page",
};

export default function AboutPage() {
  return (
    <div>
      <AboutHeroSection />
      <AboutPurposeSection />
      <AboutInfoSection />
    </div>
  );
}
