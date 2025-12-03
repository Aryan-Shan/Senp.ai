import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built for{" "}
                        <a
                            href="https://aossie.org"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            AOSSIE
                        </a>
                        . Open source and privacy-focused.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/privacy"
                        className="text-sm font-medium underline underline-offset-4"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="https://github.com/AOSSIE-Org"
                        className="text-sm font-medium underline underline-offset-4"
                    >
                        GitHub
                    </Link>
                </div>
            </div>
        </footer>
    );
}
