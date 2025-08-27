import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { NewSiteSection } from "@/components/sections/NewSiteSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <NewSiteSection />
      <ClosingSection />
    </>
  );
}
