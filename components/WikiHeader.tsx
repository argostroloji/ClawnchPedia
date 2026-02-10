import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export function WikiHeader() {
    return (
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm z-50">
            <div className="container mx-auto h-full px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-full">
                        <Image
                            src="/Logo.jpg"
                            alt="ClawnchLogo"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                    <span className="font-bold text-xl hidden sm:block">ClawnchPedia</span>
                </Link>

                <div className="flex-1 max-w-md mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-none rounded-md focus:ring-2 focus:ring-zinc-500 outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="https://clawn.ch" className="text-sm font-medium hover:underline" target="_blank">
                        clawn.ch ↗
                    </Link>
                </div>
            </div>
        </header>
    );
}
