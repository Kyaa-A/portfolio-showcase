'use client';

import Link from 'next/link';

export default function ColorExtractorPage() {
  return (
    <div className="min-h-screen bg-background text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Color-Extractor</h1>
        <p className="text-white/70 mb-8">Project details coming soon.</p>
        <Link href="/projects" className="underline">Back to Projects</Link>
      </div>
    </div>
  );
}


