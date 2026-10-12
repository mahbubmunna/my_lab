import ProjectCard, { ProjectCardProps } from '../ui/ProjectCard';

export default function FeaturedProjects({
  projects,
}: {
  projects: ProjectCardProps[];
}) {
  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10">
      <h2 className="text-foreground mb-2 text-3xl">Selected work</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Things I built end to end, and what each one taught me.
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
