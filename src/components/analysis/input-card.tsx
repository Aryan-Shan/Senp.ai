"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { fetchUserProfile, fetchUserRepos, fetchAOSSIEProjects, fetchProjectIssues } from "@/lib/github";
import { extractSkills, matchProjects } from "@/lib/matcher";
import { UserProfile, Skill, ProjectMatch } from "@/types";

interface InputCardProps {
    onAnalysisComplete: (data: { user: UserProfile; skills: Skill[]; matches: ProjectMatch[] }) => void;
}

export function InputCard({ onAnalysisComplete }: InputCardProps) {
    const [username, setUsername] = React.useState("");
    const [token, setToken] = React.useState("");
    const [showTokenInput, setShowTokenInput] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [status, setStatus] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username) return;

        setIsLoading(true);
        setError(null);
        setStatus("Fetching user profile...");

        try {
            // 1. Fetch User Data
            const user = await fetchUserProfile(username, token);
            setStatus("Fetching repositories...");
            const repos = await fetchUserRepos(username, token);

            // 2. Extract Skills
            setStatus("Analyzing skills...");
            const skills = extractSkills(repos);

            // 3. Fetch AOSSIE Projects
            setStatus("Fetching AOSSIE projects...");
            const aossieProjects = await fetchAOSSIEProjects(token);

            // 4. Match
            setStatus("Matching projects...");
            const matches = matchProjects(skills, aossieProjects);

            // 5. Fetch Issues for Top Matches (Parallel)
            setStatus("Finding good first issues...");
            const matchesWithIssues = await Promise.all(
                matches.map(async (match) => {
                    // Only fetch issues for top 10 matches to save requests
                    if (matches.indexOf(match) < 10) {
                        const issues = await fetchProjectIssues(match.project.owner, match.project.name, token);
                        return { ...match, goodFirstIssues: issues };
                    }
                    return { ...match, goodFirstIssues: [] };
                })
            );

            onAnalysisComplete({ user, skills, matches: matchesWithIssues });
        } catch (err) {
            console.error(err);
            setError("Failed to analyze profile. Check username or rate limits.");
        } finally {
            setIsLoading(false);
            setStatus("");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
        >
            <Card className="border-apple-gray/20 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-apple-light/10">
                <CardHeader>
                    <CardTitle className="text-center">Analyze Profile</CardTitle>
                    <CardDescription className="text-center">
                        Enter your GitHub handle to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="github-username"
                                className="pl-9"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoCorrect="off"
                                autoCapitalize="off"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setShowTokenInput(!showTokenInput)}
                                className="text-xs text-apple-blue hover:underline"
                            >
                                {showTokenInput ? "Hide Token Input" : "Add Personal Access Token (Optional)"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {showTokenInput && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            placeholder="ghp_..."
                                            className="pl-9"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-1 text-center">
                                        Increases rate limit. Token is not stored.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-apple-blue hover:bg-apple-blue/90 text-white"
                            disabled={!username || isLoading}
                        >
                            {isLoading ? (
                                status || "Analyzing..."
                            ) : (
                                <>
                                    Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Public data only. No storage.
                        </p>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
