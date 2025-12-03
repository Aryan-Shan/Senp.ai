export interface UserProfile {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    publicRepos: number;
    followers: number;
    following: number;
    htmlUrl: string;
}

export interface Repository {
    name: string;
    description: string | null;
    language: string | null;
    stargazersCount: number;
    forksCount: number;
    topics: string[];
    htmlUrl: string;
    updatedAt: string;
    openIssuesCount: number;
    owner: string;
}

export interface Issue {
    title: string;
    htmlUrl: string;
    number: number;
    labels: string[];
}

export interface Skill {
    name: string;
    count: number; // Number of repos using this skill
    category: "language" | "framework" | "tool" | "other";
}

export interface ProjectMatch {
    project: Repository;
    score: number;
    matchingSkills: string[];
    missingSkills: string[];
    reason: string;
    goodFirstIssues: Issue[];
}
