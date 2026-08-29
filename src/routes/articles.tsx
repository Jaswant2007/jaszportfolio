import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { articles } from "@/data/portfolio";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Jaswant" },
      {
        name: "description",
        content: "Technical articles and notes on Python, DSA, web development and learning in public.",
      },
      { property: "og:title", content: "Articles — Jaswant" },
      { property: "og:description", content: "Notes and technical write-ups from my learning journey." },
    ],
  }),
  component: Articles,
});

function Articles() {
  return (
    <PageShell variant="blur">
      <section className="shell pb-20">
        <SectionHeading
          eyebrow="Articles"
          title="Writing & notes."
          description="Short technical write-ups from what I'm learning — practical, honest and beginner-friendly."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <TiltCard className="flex h-full flex-col rounded-3xl border border-border bg-card p-7" intensity={9}>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-secondary-foreground">
                    {a.category}
                  </span>
                  <span>{a.date}</span>
                  <span>· {a.readingTime}</span>
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold">{a.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      #{t}
                    </li>
                  ))}
                </ul>
                <a
                  href={a.url || "#"}
                  {...(a.url ? { target: "_blank", rel: "noreferrer noopener" } : { "aria-disabled": true })}
                  className={`mt-6 inline-flex w-fit rounded-full px-5 py-2.5 text-sm font-semibold ${
                    a.url
                      ? "bg-primary text-primary-foreground lift"
                      : "cursor-not-allowed border border-border text-muted-foreground"
                  }`}
                >
                  {a.url ? "Read Article ↗" : "Coming soon"}
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
