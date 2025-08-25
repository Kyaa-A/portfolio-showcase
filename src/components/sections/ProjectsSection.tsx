'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Project One</CardTitle>
              <CardDescription>
                A brief description of the project and its key features
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Two</CardTitle>
              <CardDescription>
                A brief description of the project and its key features
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
