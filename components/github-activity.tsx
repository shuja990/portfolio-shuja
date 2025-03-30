"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Code, Star, GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Generate mock contribution data
  const generateMockContributions = useCallback(() => {
    const mockContributions: ContributionDay[] = [];
    const today = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      mockContributions.push({
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
        level: Math.floor(Math.random() * 5),
      });
    }

    return mockContributions;
  }, []);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch basic user data
        const userResponse = await fetch(
          "https://api.github.com/users/shuja990"
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user data");
        }

        const userData = await userResponse.json();

        // Fetch starred repos count
        const starredResponse = await fetch(
          "https://api.github.com/users/shuja990/starred?per_page=1"
        );
        const linkHeader = starredResponse.headers.get("link");
        const starredCount = linkHeader
          ? Number.parseInt(
              linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || "0"
            )
          : (await starredResponse.json()).length;

        // Generate mock contribution data
        const mockContributions = generateMockContributions();
        setContributions(mockContributions);

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

    if (inView) {
      fetchGitHubStats();
    }
  }, [inView, generateMockContributions]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                    <p className="text-3xl font-orbitron font-bold text-primary">
                      {item.value.toLocaleString()}
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

              {stats.isLoading ? (
                <div className="h-24 bg-primary/10 rounded-md animate-pulse"></div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {contributions.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.01 }}
                      className="relative group"
                    >
                      <div
                        className={`w-4 h-4 rounded-sm ${
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
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-background/90 dark:bg-background/90 text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {day.count} contributions on {day.date}
                      </div>
                    </motion.div>
                  ))}
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
