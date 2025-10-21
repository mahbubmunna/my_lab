import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';

interface TimelineEntryProps {
  title: string;
  subtitle: string;
  period: string;
  description: string | string[];
}

/**
 * Renders a single entry for experience or education, styled as a timeline item.
 */
export default function TimelineEntry({
  title,
  subtitle,
  period,
  description,
}: TimelineEntryProps) {
  const descriptionArray = Array.isArray(description)
    ? description
    : [description];

  return (
    <div className="hover:bg-muted/50 hover:border-border flex flex-col space-y-2 rounded-lg border border-transparent p-4 transition-colors duration-200 md:flex-row md:justify-between md:space-y-0">
      {/* Title and Subtitle (Left/Top) */}
      <div className="min-w-0 flex-1">
        <h3 className="text-foreground text-xl font-semibold">{title}</h3>
        <p className="text-primary/80 text-sm font-medium">{subtitle}</p>

        {/* Description List */}
        <ul className="text-muted-foreground mt-2 list-none space-y-1 text-sm">
          {descriptionArray.map((line, index) => (
            <li key={index} className="flex items-start">
              <Dot className="text-primary/50 mt-0.5 h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Period (Right/Bottom) */}
      <div className="flex-shrink-0 pt-1 md:w-40 md:text-right">
        <p className="text-foreground/70 text-sm font-semibold">{period}</p>
      </div>
    </div>
  );
}
