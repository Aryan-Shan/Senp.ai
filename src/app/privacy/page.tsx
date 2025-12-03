import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground">
                        Your data stays with you. Always.
                    </p>
                </div>

                <div className="space-y-12">
                    <section className="space-y-4">
                        <div className="p-6 bg-muted/30 rounded-2xl border">
                            <p className="text-lg leading-relaxed">
                                At AOSSIE Project Matcher, we prioritize your privacy. This tool is designed to run entirely on the client-side (in your browser).
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Data Collection</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We do not collect, store, or transmit your personal data to our servers. All data fetching from GitHub is done directly from your browser to the GitHub API.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">API Tokens</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you choose to provide a GitHub Personal Access Token or an OpenRouter API Key, it is stored locally in your browser's memory or Local Storage and is only used to make authenticated requests on your behalf. It is never sent to us.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Third-Party Services</h2>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            <li className="p-4 border rounded-xl bg-background">
                                <strong className="block mb-1">GitHub API</strong>
                                <span className="text-sm text-muted-foreground">Used to fetch public repository and user data.</span>
                            </li>
                            <li className="p-4 border rounded-xl bg-background">
                                <strong className="block mb-1">OpenRouter API</strong>
                                <span className="text-sm text-muted-foreground">(Optional) Used for the repository chat feature if you provide a key.</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
