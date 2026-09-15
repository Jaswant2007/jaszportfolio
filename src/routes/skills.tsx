import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Search, Code2, Layers, Wrench, Database, Cpu } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { GitHubExplorer } from "@/components/GitHubExplorer";
import { skillGroups, codingProfiles, profile } from "@/data/portfolio";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/skills")({
  head: () =>
    pageSeo({
      path: "/skills",
      title: "Skills | Jaswant Yuvarajan",
      description:
        "Languages, frontend, backend, database and tooling skills of Jaswant Yuvarajan, full-stack developer and CSE student, plus live GitHub and LeetCode profiles.",
    }),
  component: Skills,
});

type SkillItem = {
  name: string;
  category: string;
  status: "Building with" | "Practicing" | "Familiar" | "Learning";
};

const detailedSkills: SkillItem[] = [
  { name: "C", category: "Programming", status: "Practicing" },
  { name: "Python", category: "Programming", status: "Building with" },
  { name: "Java", category: "Programming", status: "Familiar" },
  { name: "JavaScript", category: "Programming", status: "Building with" },
  { name: "TypeScript", category: "Programming", status: "Building with" },

  { name: "HTML5 & CSS3", category: "Frontend", status: "Building with" },
  { name: "React", category: "Frontend", status: "Building with" },
  { name: "Tailwind CSS", category: "Frontend", status: "Building with" },
  { name: "Responsive Design", category: "Frontend", status: "Building with" },

  { name: "Node.js", category: "Backend", status: "Learning" },
  { name: "Express.js", category: "Backend", status: "Learning" },
  { name: "REST APIs", category: "Backend", status: "Practicing" },

  { name: "Supabase", category: "Databases", status: "Building with" },
  { name: "SQL", category: "Databases", status: "Practicing" },
  { name: "DBMS Concepts", category: "Databases", status: "Practicing" },

  { name: "Git & GitHub", category: "Tools", status: "Building with" },
  { name: "VS Code", category: "Tools", status: "Building with" },
  { name: "Vercel", category: "Tools", status: "Building with" },

  { name: "Data Structures", category: "Concepts", status: "Practicing" },
  { name: "Algorithms", category: "Concepts", status: "Practicing" },
  { name: "OOP Principles", category: "Concepts", status: "Practicing" },
];

function Skills() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Programming", "Frontend", "Backend", "Databases", "Tools", "Concepts"];

  const filteredSkills = useMemo(() => {
    return detailedSkills.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <PageShell variant="scale">
      <section className="shell pb-14">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Skills & Technologies"
          description="A complete breakdown of languages, frameworks, databases, and computer science concepts I actively practice and build with."
        />

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card hover:bg-secondary text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((sk, idx) => (
            <motion.div
              key={sk.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <TiltCard className="h-full rounded-3xl border border-border bg-card p-5" intensity={6}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {sk.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      sk.status === "Building with"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : sk.status === "Practicing"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {sk.status}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{sk.name}</h3>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <p className="mt-8 rounded-3xl glass p-8 text-center text-sm text-muted-foreground">
            No skills found matching "{search}".
          </p>
        )}
      </section>

      {/* Coding Profiles & GitHub Explorer */}
      <section className="shell py-14" aria-labelledby="profiles">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Competitive & Social</span>
          <h2 id="profiles" className="mt-1 font-display text-3xl font-semibold">
            Coding Profiles
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Where I solve algorithmic challenges and host repositories.</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {codingProfiles.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 lift"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
                </div>
                <span className="mt-6 text-xs font-semibold text-primary transition-transform group-hover:translate-x-1">
                  Visit Profile ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live Integrations Feed */}
      <section className="shell grid gap-6 py-14 lg:grid-cols-2" aria-label="GitHub & LeetCode Integrations">
        <Reveal>
          <GitHubExplorer />
        </Reveal>
        <Reveal delay={0.08}>
          <LeetCodeStats />
        </Reveal>
      </section>

      <p className="shell pb-6 text-xs text-muted-foreground">
        Interested in collaboration? Send an email to{" "}
        <a href={`mailto:${profile.email}`} className="font-semibold text-primary hover:underline">
          {profile.email}
        </a>
      </p>
    </PageShell>
  );
}
