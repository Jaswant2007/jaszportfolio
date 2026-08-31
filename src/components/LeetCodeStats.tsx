import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLeetCodeStats } from "@/lib/leetcode.functions";
import { leetcodeUsername, codingProfiles } from "@/data/portfolio";

const profileUrl =
  codingProfiles.find((p) => p.label === "LeetCode")?.href ??
  `https://leetcode.com/u/${leetcodeUsername}/`;

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-4 text-center">
      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-xl font-semibold">{value}</dd>
    </div>
  );
}

export function LeetCodeStats() {
  const fetchStats = useServerFn(getLeetCodeStats);

  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: ["leetcode-stats", leetcodeUsername],
    queryFn: () => fetchStats({ data: { username: leetcodeUsername } }),
    staleTime: 1000 * 60 * 10, // 10 minutes — plenty fresh for a portfolio
    retry: 1,
  });

  const nf = new Intl.NumberFormat("en-US");

  return (
    <div className="h-full rounded-3xl border border-border bg-card p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">LeetCode</h2>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary disabled:opacity-60"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Daily DSA practice. Stats are pulled live from my public LeetCode profile.
      </p>

      {isPending && (
        <p className="mt-6 text-sm text-muted-foreground" role="status" aria-live="polite">
          Loading LeetCode stats…
        </p>
      )}

      {isError && !isPending && (
        <div className="mt-6 rounded-2xl bg-secondary p-5 text-center" role="status" aria-live="polite">
          <p className="text-sm font-medium">Live stats unavailable</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Couldn't reach the LeetCode API just now — this is usually temporary. Hit Refresh, or
            view my latest stats directly on{" "}
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-primary hover:underline"
            >
              my LeetCode profile ↗
            </a>
            .
          </p>
        </div>
      )}

      {data && (
        <>
          <div className="mt-6 rounded-2xl bg-secondary p-5 text-center">
            <p className="font-display text-4xl font-semibold">{nf.format(data.totalSolved)}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
              Problems solved
            </p>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-3">
            <StatTile label="Easy" value={nf.format(data.easySolved)} />
            <StatTile label="Medium" value={nf.format(data.mediumSolved)} />
            <StatTile label="Hard" value={nf.format(data.hardSolved)} />
          </dl>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            <StatTile
              label="Global rank"
              value={data.ranking != null ? nf.format(data.ranking) : "—"}
            />
            <StatTile
              label="Contest rating"
              value={data.contestRating != null ? nf.format(data.contestRating) : "—"}
            />
          </dl>
        </>
      )}

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        View LeetCode profile ↗
      </a>
    </div>
  );
}
