import Link from 'next/link';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export default function ProjectCard({
  slug,
  title,
  description,
  tags,
}: ProjectCardProps) {
  // Assuming Button component exists and uses 'default' and 'secondary' variants
  // Import the button component from your project's ui folder
  // import { Button } from '@/components/ui/Button';

  return (
    <div className="border-border/50 bg-card hover:border-primary/50 rounded-xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-foreground mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>

      {/* Tags Section */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            // Use subtle secondary background for tags as seen in the design
            className="text-secondary-foreground bg-secondary/50 border-secondary/70 rounded-full border px-3 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {/* Placeholder: Use your actual Button component here */}
        <Link
          href={`/projects/${slug}`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          View Demo
        </Link>
        <a
          href="https://github.com/mahbub" // Placeholder link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50 inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          See on GitHub
        </a>
      </div>
    </div>
  );
}
