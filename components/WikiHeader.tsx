import Link from "next/link";
import Image from "next/image";
// import { Search } from "lucide-react"; // Removed to avoid conflict, or aliased if needed
import { MobileNav } from "@/components/MobileNav";
import { Search } from "@/components/Search";

export function WikiHeader() {
    return (
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm z-50">
            <div className="container mx-auto h-full px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MobileNav />
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-full">
                            <Image
                                src="/logo.png"
                                alt="ClawnchLogo"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <span className="font-bold text-xl hidden sm:block">ClawnchPedia</span>
                    </Link>
                </div>

                <div className="flex-1 max-w-md mx-4">
                    <Search />
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/SKILL.md" className="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-500 transition-colors" target="_blank">
                        I'm an Agent
                    </Link>
                    <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
                    <Link href="https://clawn.ch" className="text-sm font-medium hover:underline" target="_blank">
                        clawn.ch ↗
                    </Link>
                </div>
            </div>
        </header>
    );
}
