import { Octokit } from "octokit";
import { UserProfile, Repository, Issue } from "@/types";

function getOctokit(token?: string) {
    return new Octokit({ auth: token });
}

export async function fetchUserProfile(username: string, token?: string): Promise<UserProfile> {
    const octokit = getOctokit(token);
    try {
        const { data } = await octokit.rest.users.getByUsername({
            username,
        });

        return {
            login: data.login,
            name: data.name,
            avatarUrl: data.avatar_url,
            bio: data.bio,
            publicRepos: data.public_repos,
            followers: data.followers,
            following: data.following,
            htmlUrl: data.html_url,
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("User not found or API limit reached");
    }
}

export async function fetchUserRepos(username: string, token?: string): Promise<Repository[]> {
    const octokit = getOctokit(token);
    try {
        const { data } = await octokit.rest.repos.listForUser({
            username,
            sort: "updated",
            per_page: 100, // Fetch last 100 updated repos
            type: "owner", // Only repos owned by user
        });

        return data.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazersCount: repo.stargazers_count,
            forksCount: repo.forks_count,
            topics: repo.topics || [],
            htmlUrl: repo.html_url,
            updatedAt: repo.updated_at,
            openIssuesCount: repo.open_issues_count,
            owner: repo.owner.login,
        }));
    } catch (error) {
        console.error("Error fetching user repos:", error);
        throw new Error("Failed to fetch repositories");
    }
}

export async function fetchAOSSIEProjects(token?: string): Promise<Repository[]> {
    const octokit = getOctokit(token);
    try {
        const { data } = await octokit.rest.repos.listForOrg({
            org: "AOSSIE-Org",
            sort: "updated",
            per_page: 100,
        });

        return data.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stargazersCount: repo.stargazers_count,
            forksCount: repo.forks_count,
            topics: repo.topics || [],
            htmlUrl: repo.html_url,
            updatedAt: repo.updated_at,
            openIssuesCount: repo.open_issues_count,
            owner: repo.owner.login,
        }));
    } catch (error) {
        console.error("Error fetching AOSSIE projects:", error);
        // Fallback data or empty array if API fails
        return [];
    }
}

export async function fetchProjectIssues(owner: string, repo: string, token?: string): Promise<Issue[]> {
    const octokit = getOctokit(token);
    try {
        const { data } = await octokit.rest.issues.listForRepo({
            owner,
            repo,
            state: "open",
            labels: "good first issue", // Filter by label
            sort: "updated",
            per_page: 5,
        });

        return data.map((issue: any) => ({
            title: issue.title,
            htmlUrl: issue.html_url,
            number: issue.number,
            labels: issue.labels.map((l: any) => l.name),
        }));
    } catch (error) {
        console.error(`Error fetching issues for ${repo}:`, error);
        return [];
    }
}
