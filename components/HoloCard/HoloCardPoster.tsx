// V0 stub — static <img> fallback for Suspense + share-page poster.
export interface HoloCardPosterProps {
  src: string;
  alt: string;
}

export default function HoloCardPoster({ src, alt }: HoloCardPosterProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="w-full h-auto" />;
}
