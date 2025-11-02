'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * A Client Component wrapper for the Next.js Image component to safely handle
 * client-side events like onError, providing a fallback image URL.
 */
interface ClientImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function ClientImage({
  src,
  fallbackSrc = 'https://placehold.co/320x320/0A0A0A/FFF?text=MH',
  ...props
}: ClientImageProps) {
  // State is required to switch the image source on error
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    // Only set the fallback if the current source isn't already the fallback
    // to prevent an infinite error loop.
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <Image
      // Use the stateful source
      src={'/profile_picture.png'}
      // The event handler is now safely contained within this Client Component
      onError={handleError}
      {...props}
    />
  );
}
