'use client';

import { useState } from 'react';
import { NavButton } from '@/components/ui/NavButton';
import { NavOverlay } from './NavOverlay';

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[10000]">
      <div className="absolute top-16 right-8">
        <NavButton onClick={() => setIsNavOpen(!isNavOpen)} isOpen={isNavOpen} />
      </div>
      <NavOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </header>
  );
}
