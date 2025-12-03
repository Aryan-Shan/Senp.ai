import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HowItWorksPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">How it Works</h1>

                <div className="space-y-8 text-lg text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Profile Analysis</h2>
                        <p>
                            We use the GitHub API to fetch your public profile and repositories. We analyze your code to identify the languages and topics you use most frequently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Skill Extraction</h2>
                        <p>
                            Our algorithm extracts a "skill signature" from your activity. For example, if you have many repositories written in Python and tagged with "machine-learning", we identify these as your core strengths.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Project Matching</h2>
                        <p>
                            We compare your skills against the requirements of open-source projects within the AOSSIE organization. We look for language matches, topic overlaps, and "good first issue" availability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Privacy First</h2>
                        <p>
                            All analysis happens directly in your browser. We do not store your data, your token, or your profile information on any server.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
