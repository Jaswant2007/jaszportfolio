import { createServerFn } from "@tanstack/react-start";

/**
 * Fetches public LeetCode profile stats through LeetCode's GraphQL endpoint.
 * Runs on the server so the browser never talks to leetcode.com directly
 * (avoids CORS and keeps the request shape in one place). No API key needed.
 */

export type LeetCodeStats = {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | null;
  contestRating: number | null;
  contestRanking: number | null;
  contestsAttended: number | null;
};

const QUERY = `
  query portfolioStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
      attendedContestsCount
    }
  }
`;

type AcNum = { difficulty: string; count: number };

export const getLeetCodeStats = createServerFn({ method: "GET" })
  .inputValidator((data: { username: string }) => {
    if (!data?.username || !/^[\w.-]{1,40}$/.test(data.username)) {
      throw new Error("Invalid LeetCode username");
    }
    return data;
  })
  .handler(async ({ data }): Promise<LeetCodeStats> => {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: `https://leetcode.com/u/${data.username}/`,
        "user-agent": "Mozilla/5.0 (portfolio-stats)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: data.username } }),
    });

    if (!res.ok) {
      console.error(`LeetCode stats fetch failed for "${data.username}": HTTP ${res.status}`);
      throw new Error(`LeetCode API responded with ${res.status}`);
    }

    const json = (await res.json()) as {
      data?: {
        matchedUser?: {
          username: string;
          profile?: { ranking?: number | null } | null;
          submitStatsGlobal?: { acSubmissionNum?: AcNum[] } | null;
        } | null;
        userContestRanking?: {
          rating?: number | null;
          globalRanking?: number | null;
          attendedContestsCount?: number | null;
        } | null;
      };
      errors?: { message: string }[];
    };

    if (json.errors?.length) {
      console.error(`LeetCode GraphQL errors for "${data.username}":`, json.errors);
      throw new Error(json.errors[0]!.message);
    }

    const user = json.data?.matchedUser;
    if (!user) {
      console.error(`LeetCode profile not found for username "${data.username}"`);
      throw new Error("LeetCode profile not found");
    }

    const buckets = user.submitStatsGlobal?.acSubmissionNum ?? [];
    const count = (difficulty: string) =>
      buckets.find((b) => b.difficulty === difficulty)?.count ?? 0;

    const contest = json.data?.userContestRanking ?? null;

    return {
      username: user.username,
      totalSolved: count("All"),
      easySolved: count("Easy"),
      mediumSolved: count("Medium"),
      hardSolved: count("Hard"),
      ranking: user.profile?.ranking ?? null,
      contestRating: contest?.rating != null ? Math.round(contest.rating) : null,
      contestRanking: contest?.globalRanking ?? null,
      contestsAttended: contest?.attendedContestsCount ?? null,
    };
  });
