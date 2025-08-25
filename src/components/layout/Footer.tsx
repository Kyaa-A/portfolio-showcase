'use client';

export function Footer() {
  return (
    <footer className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-foreground-secondary text-center">
          © {new Date().getFullYear()} Portfolio Showcase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
