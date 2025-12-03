import { Repository, Skill, ProjectMatch } from "@/types";

export function extractSkills(repos: Repository[]): Skill[] {
    const skillMap = new Map<string, number>();
    const categoryMap = new Map<string, Skill["category"]>();

    repos.forEach((repo) => {
        // Process Language
        if (repo.language) {
            const lang = repo.language;
            skillMap.set(lang, (skillMap.get(lang) || 0) + 1);
            categoryMap.set(lang, "language");
        }

        // Process Topics
        repo.topics.forEach((topic) => {
            // Simple heuristic: if it's not already a language, assume it's a tool/framework
            // In a real app, we'd have a dictionary of known frameworks
            if (!skillMap.has(topic)) { // Avoid double counting if topic == language
                skillMap.set(topic, (skillMap.get(topic) || 0) + 1);
                categoryMap.set(topic, "framework"); // Defaulting to framework for topics
            }
        });
    });

    return Array.from(skillMap.entries()).map(([name, count]) => ({
        name,
        count,
        category: categoryMap.get(name) || "other",
    })).sort((a, b) => b.count - a.count);
}

export function matchProjects(userSkills: Skill[], projects: Repository[]): ProjectMatch[] {
    const userSkillNames = new Set(userSkills.map(s => s.name.toLowerCase()));

    return projects.map(project => {
        const projectSkills = new Set<string>();
        if (project.language) projectSkills.add(project.language.toLowerCase());
        project.topics.forEach(t => projectSkills.add(t.toLowerCase()));

        const matchingSkills: string[] = [];
        const missingSkills: string[] = [];

        projectSkills.forEach(skill => {
            if (userSkillNames.has(skill)) {
                matchingSkills.push(skill);
            } else {
                missingSkills.push(skill);
            }
        });

        // Simple scoring: (matches / total_project_skills) * 100
        // Weighted by importance? For now, linear.
        const totalSkills = projectSkills.size;
        let score = 0;
        if (totalSkills > 0) {
            score = Math.round((matchingSkills.length / totalSkills) * 100);
        }

        // Boost score if main language matches
        if (project.language && userSkillNames.has(project.language.toLowerCase())) {
            score = Math.min(100, score + 20);
        }

        return {
            project,
            score,
            matchingSkills,
            missingSkills,
            reason: `Matches ${matchingSkills.length} of ${totalSkills} skills.`,
            goodFirstIssues: [],
        };
    }).sort((a, b) => b.score - a.score);
}
