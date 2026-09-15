import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { BookOpen, Search, Clock, Tag, X } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { articles } from "@/data/portfolio";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/articles")({
  head: () =>
    pageSeo({
      path: "/articles",
      title: "Articles | Jaswant Yuvarajan — Notes on Python, DSA & Web Development",
      description:
        "Technical write-ups and learning notes by Jaswant Yuvarajan on Python, Data Structures & Algorithms and full-stack web development.",
    }),
  component: Articles,
});

type ArticleType = (typeof articles)[number];

function ArticleModal({ article, onClose }: { article: ArticleType | null; onClose: () => void }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 text-foreground shadow-2xl">
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-primary">
              {article.category}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold">{article.title}</h2>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{article.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-primary" /> {article.readingTime}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground text-base">{article.description}</p>
          <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-2">
            <h3 className="font-display font-semibold text-xs text-primary uppercase tracking-wider">
              Key Insights & Notes
            </h3>
            <p className="text-xs">
              1. Breakdown of core patterns rather than memorizing individual solutions.
            </p>
            <p className="text-xs">
              2. Consistently documenting edge cases (empty inputs, single elements, integer overflow).
            </p>
            <p className="text-xs">
              3. Converting thought processes into pseudocode before writing actual syntax.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground lift"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}

function Articles() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <PageShell variant="blur">
      <section className="shell pb-20">
        <SectionHeading
          eyebrow="Learning Notes"
          title="Writing & Observations"
          description="Notes written while studying Data Structures, C programming, Python, and Full Stack Development."
        />

        {/* Search */}
        <div className="mt-8 flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <TiltCard className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-7" intensity={8}>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-primary">
                      {a.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="h-3 w-3" /> {a.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold">{a.title}</h2>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                  <ul className="flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <li key={t} className="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] text-muted-foreground">
                        #{t}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(a)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Read Note</span>
                    <BookOpen className="h-3.5 w-3.5" />
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-3xl glass p-8 text-center text-xs text-muted-foreground">
            No notes found matching "{search}".
          </p>
        )}
      </section>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </PageShell>
  );
}
