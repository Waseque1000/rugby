"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/images/blog/sevens-vs-fifteens.jpg";

type BlogImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fill?: boolean;
  preload?: boolean;
};

export function BlogImage({ src, alt, sizes, className, fill = false, preload = false }: BlogImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      sizes={sizes}
      fill={fill}
      preload={preload}
      unoptimized
      className={className}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
