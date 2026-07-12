"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Code, Star, GitCommit } from "lucide-react";
import { site } from "@/data";
import { gsap } from "@/lib/gsap";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  avatarUrl: string;
  bio: string;
  name: string;
  isLoading: boolean;
  error: string | null;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 for intensity
}

const initialStats: GitHubStats = {
  publicRepos: 0,
  followers: 0,
  following: 0,
  stars: 0,
  avatarUrl: "",
  bio: "",
  name: "",
  isLoading: true,
  error: null,
};

const GitHubActivity = () => {
  const [stats, setStats] = useState<GitHubStats>(initialStats);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [contributionsError, setContributionsError] = useState(false);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Count the stat numbers up once real values arrive
  useEffect(() => {
    if (stats.isLoading || stats.error || !statsGridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = statsGridRef.current.querySelectorAll<HTMLElement>(".gh-stat-value");
    const tween = gsap.from(targets, {
      innerText: 0,
      snap: { innerText: 1 },
      duration: 1.4,
      ease: "power2.out",
      stagger: 0.12,
    });
    return () => {
      tween.kill();
    };
  }, [stats.isLoading, stats.error]);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch basic user data
        const userResponse = await fetch(
          `https://api.github.com/users/${site.githubUsername}`
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user data");
        }

        const userData = await userResponse.json();

        // Fetch starred repos count
        const starredResponse = await fetch(
          `https://api.github.com/users/${site.githubUsername}/starred?per_page=1`
        );
        const linkHeader = starredResponse.headers.get("link");
        const starredCount = linkHeader
          ? Number.parseInt(
              linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || "0"
            )
          : (await starredResponse.json()).length;

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          stars: starredCount,
          avatarUrl: userData.avatar_url,
          bio: userData.bio || "Full Stack Developer",
          name: userData.name || userData.login,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load GitHub stats",
        }));
      }
    };

    // Real contribution data (github.com profile graph), last ~6 months
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${site.githubUsername}?y=last`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch contribution data");
        }
        const data: { contributions: ContributionDay[] } =
          await response.json();
        setContributions(data.contributions.slice(-364));
      } catch (error) {
        console.error("Error fetching contribution data:", error);
        setContributionsError(true);
      }
    };

    if (inView) {
      fetchGitHubStats();
      fetchContributions();
    }
  }, [inView]);

  const statItems = [
    {
      label: "Repositories",
      value: stats.publicRepos,
      icon: <Code className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: "Followers",
      value: stats.followers,
      icon: <Github className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: "Following",
      value: stats.following,
      icon: <GitCommit className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: "Stars",
      value: stats.stars,
      icon: <Star className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <section id="github" ref={ref} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-70 z-0"></div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 animate-text-shimmer">
            <span className="relative inline-block">
              GitHub Profile
              <Github
                className="absolute -top-6 -right-6 h-6 w-6 text-accent"
                aria-hidden="true"
              />
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            A snapshot of my GitHub activity and statistics
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <div ref={statsGridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full border-none overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-background to-primary/5">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.label}</h3>
                  {stats.isLoading ? (
                    <div className="w-16 h-8 bg-primary/10 rounded-md animate-pulse"></div>
                  ) : (
                    <p className="gh-stat-value text-3xl font-orbitron font-bold text-primary">
                      {item.value}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-none overflow-hidden shadow-lg">
            <CardContent className="p-6 md:p-8 bg-gradient-to-br from-background to-primary/5">
              <h3 className="text-xl font-semibold mb-6 gradient-text">
                Contribution Activity
              </h3>

              {contributionsError ? (
                <p className="text-sm text-foreground/60 py-6">
                  Contribution data is unavailable right now — see the full graph on{" "}
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    my GitHub profile
                  </a>
                  .
                </p>
              ) : contributions.length === 0 ? (
                <div className="h-24 bg-primary/10 rounded-md animate-pulse"></div>
              ) : (
                <div className="overflow-x-auto pb-2">
                  <div
                    className="grid grid-rows-7 grid-flow-col gap-[3px] w-full min-w-[760px]"
                    style={{ gridAutoColumns: "1fr" }}
                  >
                    {contributions.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                        className={`aspect-square w-full rounded-sm ${
                          day.level === 0
                            ? "bg-primary/10"
                            : day.level === 1
                            ? "bg-primary/30"
                            : day.level === 2
                            ? "bg-primary/50"
                            : day.level === 3
                            ? "bg-primary/70"
                            : "bg-primary"
                        }`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                        role="img"
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4 text-xs text-foreground/60">
                <span>Less</span>
                <div
                  className="flex gap-1"
                  aria-label="Contribution intensity scale"
                >
                  <div className="w-3 h-3 rounded-sm bg-primary/10"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary/30"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary"></div>
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
