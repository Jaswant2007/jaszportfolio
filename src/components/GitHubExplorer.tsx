import { useState, useEffect } from "react";
import { Github, Star, GitFork, BookOpen, ExternalLink, RefreshCw } from "lucide-react";
import { codingProfiles } from "@/data/portfolio";

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  login: string;
};

export function GitHubExplorer() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const githubUrl = codingProfiles.find((p) => p.label === "GitHub")?.href || "https://github.com/Jaswant2007";
  const username = "Jaswant2007";

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      console.error("GitHub fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Github className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-semibold">GitHub Live Activity</h2>
        </div>
        <button
          type="button"
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Syncing..." : "Refresh"}
        </button>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Live repositories and public activity directly from my GitHub profile (@{username}).
      </p>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-6 space-y-4">
          <div className="h-16 w-full animate-pulse rounded-2xl bg-secondary" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-secondary" />
            ))}
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {error && !loading && (
        <div className="mt-6 rounded-2xl bg-secondary/70 p-5 text-center">
          <p className="text-sm font-semibold">GitHub Live Feed Unavailable</p>
          <p className="mt-1 text-xs text-muted-foreground">
            API rate limit reached or network connection interrupted.
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground lift"
          >
            Visit @{username} on GitHub ↗
          </a>
        </div>
      )}

      {/* Live Content */}
      {!loading && !error && (
        <>
          {user && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary p-4">
              <div className="flex items-center gap-3">
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="h-10 w-10 rounded-full border border-border"
                  />
                )}
                <div>
                  <h3 className="font-display text-sm font-semibold">@{user.login}</h3>
                  <p className="text-xs text-muted-foreground">{user.public_repos} Public Repositories</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span>{user.followers} Followers</span>
                <span>{user.following} Following</span>
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 lift"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-display text-sm font-semibold group-hover:text-primary transition-colors">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      {repo.name}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                    {repo.description || "Public repository"}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40 pt-2.5">
                  {repo.language && (
                    <span className="font-semibold text-primary">{repo.language}</span>
                  )}
                  <div className="flex items-center gap-3 ml-auto">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        View Full GitHub Profile ↗
      </a>
    </div>
  );
}
