// components/ui/DeviceFrames.tsx
// Device framing for product screenshots: browser chrome for desktop
// screens, a phone frame for mobile screens.

import Image from 'next/image';
import React from 'react';

export interface ScreenShot {
  src: string;
  alt: string;
  caption?: string;
  label?: string; // shown in the browser-chrome title bar
  width: number;
  height: number;
}

export function BrowserFrame({ screen }: { screen: ScreenShot }) {
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-2.5">
      <div className="border-border/60 overflow-hidden rounded-xl border shadow-xl">
        <div className="border-border/60 bg-secondary/70 flex items-center gap-1.5 border-b px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-green-400/80" />
          {screen.label && (
            <span className="text-muted-foreground ml-2.5 truncate font-mono text-[11px] tracking-wide">
              {screen.label}
            </span>
          )}
        </div>
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      {screen.caption && (
        <figcaption className="text-muted-foreground text-sm">
          {screen.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PhoneFrame({ screen }: { screen: ScreenShot }) {
  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      <div className="border-border/70 bg-secondary/40 relative h-[420px] w-52 overflow-hidden rounded-[1.75rem] border-[3px] shadow-xl sm:h-[480px] sm:w-60">
        <Image
          src={screen.src}
          alt={screen.alt}
          fill
          className="object-cover object-top"
          sizes="240px"
        />
        {/* speaker notch */}
        <div className="bg-border/80 absolute top-2 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full" />
      </div>
      {screen.caption && (
        <figcaption className="text-muted-foreground max-w-60 text-center text-sm">
          {screen.caption}
        </figcaption>
      )}
    </figure>
  );
}
