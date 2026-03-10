"use client";

import { Twitter, Linkedin, Facebook } from "lucide-react";

type Props = { title: string; slug: string };

const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://prudentialfashionacademy.com";

function shareUrl(platform: string, url: string, text: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    default:
      return url;
  }
}

export function ShareBar({ title, slug }: Props) {
  const url = `${baseUrl}/alumni/news/${slug}`;
  const text = title;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]">
        Share:
      </span>
      <a
        href={shareUrl("twitter", url, text)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        aria-label="Share on Twitter/X"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={shareUrl("linkedin", url, text)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={shareUrl("facebook", url, text)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[var(--color-ivory)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={shareUrl("whatsapp", url, text)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] hover:underline"
      >
        WhatsApp
      </a>
    </div>
  );
}
