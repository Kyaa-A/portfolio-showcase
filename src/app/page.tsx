'use client';

import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { NewSiteSection } from "@/components/sections/NewSiteSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { MobileNavigationSection } from "@/components/sections/MobileNavigationSection";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <HeroSection />

      {/* Desktop: Show full sections with scroll */}
      {!isMobile && (
        <>
          <ProjectsSection />
          <NewSiteSection />
          <ClosingSection />
        </>
      )}

      {/* Mobile: Show navigation menu */}
      {isMobile && (
        <>
          <MobileNavigationSection />
          <ClosingSection />
        </>
      )}
    </>
  );
}
