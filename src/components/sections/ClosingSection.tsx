'use client';

import { Button } from '@/components/ui/button';

export function ClosingSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Let&apos;s Create Something Amazing</h2>
        <p className="text-xl text-foreground-secondary mb-12">
          Have a project in mind? Let&apos;s bring it to life.
        </p>
        <Button size="lg">
          Get in Touch
        </Button>
      </div>
    </section>
  );
}
