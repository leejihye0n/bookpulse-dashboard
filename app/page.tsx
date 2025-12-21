import type { Metadata } from "next";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeFeatureSection from "@/components/home/HomeFeatureSection";

export const metadata: Metadata = {
  	title: "Home | BookPulse",
  	description: "Home page",
};

export default function Home() {
  return (
    <div>
      <HomeHeroSection />
      <HomeFeatureSection />
    </div>
  );
}
