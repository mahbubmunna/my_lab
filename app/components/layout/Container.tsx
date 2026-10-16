import { cn } from '@/lib/utils';

// The one page width used by the header, home sections and footer.
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1200px] px-4 sm:px-8 lg:px-12', className)}>
      {children}
    </div>
  );
}
