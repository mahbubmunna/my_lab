import Link from 'next/link';
import ClientImage from '../ui/ClientImage';
// Import the ClientImage component instead of the default Next.js Image

export default function HeroSection() {
  // Placeholder image URL for the Avatar, styled to look like the design
  const avatarUrl = 'http://127.0.0.1:8000/image';

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Text and CTA Column */}
        <div className="order-2 space-y-6 lg:order-1">
          <h1 className="text-foreground text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            Hello, I&apos;m <span className="text-primary">Mahbub Hassan</span>,
            a Full-Stack Developer
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg">
            Passionate about building digital products and solving problems. I
            specialize in creating modern, intelligent, and user-friendly web
            and mobile applications powered by AI across the entire stack..
          </p>

          {/* CTA Buttons (Styled like the design) */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Link
              href="/about"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/30 inline-flex h-12 items-center justify-center rounded-lg px-8 py-3 text-lg font-medium shadow-lg transition-colors"
            >
              View Resume
            </Link>
            <Link
              href="/about"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border/50 inline-flex h-12 items-center justify-center rounded-lg border px-8 py-3 text-lg font-medium transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Image/Avatar Column */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="border-primary/20 relative h-64 w-64 overflow-hidden rounded-full border-4 shadow-2xl sm:h-80 sm:w-80">
            {/* FIXED: Using ClientImage to safely contain the event handler */}
            <ClientImage
              src={avatarUrl}
              alt="Portrait of Mahbub Hassan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              // onError prop is handled by ClientImage internally
            />
          </div>
        </div>
      </div>
    </section>
  );
}
