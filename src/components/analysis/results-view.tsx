"use client";

import { motion } from "framer-motion";
import { UserProfile, Skill, ProjectMatch } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, GitFork, ExternalLink, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ChatModal } from "@/components/ai/chat-modal";

interface ResultsViewProps {
    user: UserProfile;
    skills: Skill[];
    matches: ProjectMatch[];
    onReset: () => void;
}

export function ResultsView({ user, skills, matches, onReset }: ResultsViewProps) {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onReset} className="pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
                </Button>
            </div>

            {/* User Profile Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-apple-gray/20 bg-white/80 dark:bg-apple-light/10 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center gap-6">
                        <img
                            src={user.avatarUrl}
                            alt={user.login}
                            className="h-20 w-20 rounded-full border-2 border-apple-light"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                            <p className="text-muted-foreground">@{user.login}</p>
                            <p className="mt-2 text-sm max-w-xl">{user.bio}</p>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                {skills.slice(0, 5).map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="inline-flex items-center rounded-full bg-apple-blue/10 px-2.5 py-0.5 text-xs font-medium text-apple-blue"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Project Matches */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match, index) => (
                    <motion.div
                        key={match.project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col border-apple-gray/20 hover:border-apple-blue/50 transition-colors">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl truncate" title={match.project.name}>
                                        {match.project.name}
                                    </CardTitle>
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                                        {match.score}% Match
                                    </span>
                                </div>
                                <CardDescription className="line-clamp-2 h-10">
                                    {match.project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center" title="Stars">
                                        <Star className="mr-1 h-4 w-4" /> {match.project.stargazersCount}
                                    </span>
                                    <span className="flex items-center" title="Forks">
                                        <GitFork className="mr-1 h-4 w-4" /> {match.project.forksCount}
                                    </span>
                                    <span className="flex items-center" title="Last Updated">
                                        <Calendar className="mr-1 h-4 w-4" />
                                        {new Date(match.project.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {match.project.language && (
                                    <div className="flex items-center text-sm">
                                        <span className="mr-2 h-3 w-3 rounded-full bg-apple-blue" />
                                        {match.project.language}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-muted-foreground">Matching Skills:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {match.matchingSkills.slice(0, 3).map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-apple-blue/10 text-apple-blue text-xs rounded-md">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {match.goodFirstIssues && match.goodFirstIssues.length > 0 && (
                                    <div className="space-y-2 pt-2 border-t border-dashed">
                                        <p className="text-xs font-semibold text-muted-foreground flex items-center">
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            Good First Issues
                                        </p>
                                        <ul className="space-y-1">
                                            {match.goodFirstIssues.slice(0, 2).map(issue => (
                                                <li key={issue.number}>
                                                    <Link
                                                        href={issue.htmlUrl}
                                                        target="_blank"
                                                        className="text-xs text-apple-blue hover:underline truncate block"
                                                    >
                                                        #{issue.number} {issue.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button className="w-full" asChild>
                                    <Link href={match.project.htmlUrl} target="_blank">
                                        View Project <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <ChatModal repo={match.project} />
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
