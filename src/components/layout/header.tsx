import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ApiKeyBanner } from "@/components/ai/api-key-banner";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            AOSSIE Matcher
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/how-it-works"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            How it Works
                        </Link>
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Privacy
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" asChild>
                        <Link
                            href="https://github.com/AOSSIE-Org"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <ApiKeyBanner />
        </header >
    );
}
