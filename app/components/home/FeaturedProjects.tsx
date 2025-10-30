'use client';

import ProjectCard from '../ui/ProjectCard';

interface Project {
  slug: string;
  title: string;
  href: string;
  description: string;
  tags: string[];
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // NOTE: Filtering/Sorting logic (using useTransition) will be added here in a future step (Phase 2 tasks).

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-foreground mb-8 text-3xl font-bold">
        Featured Projects
      </h2>

      {/* Project Grid */}
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
