"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Code, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  stars: number;
  isLoading: boolean;
  error: string | null;
}

const initialStats: GitHubStats = {
  publicRepos: 0,
  followers: 0,
  stars: 0,
  isLoading: true,
  error: null,
};

const GitHubActivity = () => {
  const [stats, setStats] = useState<GitHubStats>(initialStats);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          stars: starredCount,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                  ) : stats.error ? (
                    <p className="text-xl font-medium text-muted-foreground whitespace-nowrap">
                      N/A
                    </p>
                  ) : (
                    <p className="text-3xl font-bold text-primary">
                      {item.value.toLocaleString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Error Fallback */}
        {stats.error && (
          <div className="text-center mb-8 relative z-10">
            <p className="text-muted-foreground bg-primary/5 inline-block py-2 px-4 rounded-lg border border-primary/10">
              API limits reached. Check out my code directly on GitHub!
            </p>
          </div>
        )}

        {/* GitHub Contribution Graph (real data via ghchart) */}
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

              <div className="w-full overflow-x-auto">
                {/* ghchart.rshah.org renders a real GitHub contribution graph as an SVG */}
                <img
                  src="https://ghchart.rshah.org/0066ff/shuja990"
                  alt="Shuja Ali's GitHub contribution graph"
                  className="w-full min-w-[680px]"
                />
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  asChild
                  className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                >
                  <a
                    href="https://github.com/shuja990"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Full Profile on GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
