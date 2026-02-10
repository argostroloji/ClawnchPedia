import Link from "next/link";
import { Book, Cpu, Layers, Rocket, Terminal } from "lucide-react";

export function WikiSidebar() {
    return (
        <aside className="w-64 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden md:block">
            <div className="p-4 space-y-6">
                <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Core Concepts
                    </h3>
                    <nav className="space-y-1">
                        <Link
                            href="/molten"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Layers className="w-4 h-4" />
                            Molten
                        </Link>
                        <Link
                            href="/claws"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Cpu className="w-4 h-4" />
                            CLAWS (Memory)
                        </Link>
                        <Link
                            href="/clawnch-token"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Rocket className="w-4 h-4" />
                            $CLAWNCH Token
                        </Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Guides
                    </h3>
                    <nav className="space-y-1">
                        <Link
                            href="/launch-guide"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Launching a Token
                        </Link>
                        <Link
                            href="/burn-to-earn"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Burn-to-Earn
                        </Link>
                        <Link
                            href="/self-funding"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Self-Funding
                        </Link>
                        <Link
                            href="/hiring-ref"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Hiring Ref (Auto)
                        </Link>
                        <Link
                            href="/technical-docs"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Technical Docs (Auto)
                        </Link>
                        <Link
                            href="/skill-ref"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Skill Reference (Auto)
                        </Link>
                        <Link
                            href="/hiring"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Book className="w-4 h-4" />
                            Hiring Agents
                        </Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Reference
                    </h3>
                    <nav className="space-y-1">
                        <Link
                            href="/api"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Terminal className="w-4 h-4" />
                            API Reference
                        </Link>
                    </nav>
                </div>
            </div>
        </aside>
    );
}
