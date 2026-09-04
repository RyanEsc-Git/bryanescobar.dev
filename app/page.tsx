import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { SelectedWork } from "@/components/sections/selected-work";
import { WhatIDo } from "@/components/sections/what-i-do";
import { TechStack } from "@/components/sections/tech-stack";
import { Process } from "@/components/sections/process";
import { CallToAction } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <WhatIDo />
      <TechStack />
      <Process />
      <CallToAction />
    </>
  );
}
