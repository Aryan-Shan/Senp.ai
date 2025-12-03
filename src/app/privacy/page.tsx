import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-lg text-muted-foreground">
                    <p>
                        At AOSSIE Project Matcher, we prioritize your privacy. This tool is designed to run entirely on the client-side (in your browser).
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Data Collection</h2>
                    <p>
                        We do not collect, store, or transmit your personal data to our servers. All data fetching from GitHub is done directly from your browser to the GitHub API.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">API Tokens</h2>
                    <p>
                        If you choose to provide a GitHub Personal Access Token or an LLM API Key, it is stored locally in your browser's memory or Local Storage and is only used to make authenticated requests on your behalf. It is never sent to us.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Third-Party Services</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>GitHub API:</strong> Used to fetch public repository and user data.</li>
                        <li><strong>Google Gemini API:</strong> (Optional) Used for the repository chat feature if you provide a key.</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
