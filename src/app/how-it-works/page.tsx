import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HowItWorksPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How it Works</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find your perfect open-source match in four simple steps.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <span className="text-xl font-bold">1</span>
                        </div>
                        <h2 className="text-2xl font-semibold">Profile Analysis</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use the GitHub API to fetch your public profile and repositories. We analyze your code to identify the languages and topics you use most frequently.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <span className="text-xl font-bold">2</span>
                        </div>
                        <h2 className="text-2xl font-semibold">Skill Extraction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Our algorithm extracts a "skill signature" from your activity. For example, if you have many repositories written in Python and tagged with "machine-learning", we identify these as your core strengths.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <span className="text-xl font-bold">3</span>
                        </div>
                        <h2 className="text-2xl font-semibold">Project Matching</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We compare your skills against the requirements of open-source projects within the AOSSIE organization. We look for language matches, topic overlaps, and "good first issue" availability.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <span className="text-xl font-bold">4</span>
                        </div>
                        <h2 className="text-2xl font-semibold">Privacy First</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            All analysis happens directly in your browser. We do not store your data, your token, or your profile information on any server.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
