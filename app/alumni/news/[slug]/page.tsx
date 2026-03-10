import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allArticles } from "@/lib/data/alumni";
import Breadcrumb from "@/components/about/Breadcrumb";
import { ShareBar } from "./ShareBar";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = allArticles.find((a) => a.slug === slug);
  if (!article) return { title: "News | Alumni | PFA" };
  return {
    title: `${article.title} | Alumni News | Prudential Fashion Academy`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = allArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <section
        className="relative border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-16 pt-28 lg:px-10 lg:py-20 lg:pt-36"
        aria-labelledby="article-title"
      >
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Alumni", href: "/alumni" },
              { label: "News", href: "/alumni/news" },
              { label: article.title },
            ]}
          />
          <h1
            id="article-title"
            className="mt-4 text-4xl uppercase leading-[1.15] text-[var(--color-ivory)] sm:text-5xl"
          >
            {article.title}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {article.author} · {article.dateFormatted}
          </p>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[var(--color-charcoal)]">
        <div className="aspect-video w-full bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-noir)]" />
      </section>

      <article
        className="border-b border-[var(--color-charcoal)] bg-[var(--color-noir)] px-6 py-20 lg:px-10 lg:py-24"
        aria-label="Article body"
      >
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-invert max-w-none">
            {article.body.map((para, i) => (
              <p
                key={i}
                className="mb-6 text-sm leading-relaxed text-[var(--color-ivory)]/90"
              >
                {para}
              </p>
            ))}
          </div>
          {article.pullQuote && (
            <blockquote className="my-10 border-l-4 border-[var(--color-gold)] pl-6 text-lg italic leading-relaxed text-[var(--color-ivory)]/90">
              {article.pullQuote}
            </blockquote>
          )}
          <footer className="mt-12 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {article.author} · {article.dateFormatted}
            {article.tagged && article.tagged.length > 0 && (
              <> · Tagged: {article.tagged.join(", ")}</>
            )}
          </footer>
          <div className="mt-8">
            <ShareBar title={article.title} slug={article.slug} />
          </div>
          <Link
            href="/alumni/news"
            className="mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            ← Back to News
          </Link>
        </div>
      </article>
    </>
  );
}
