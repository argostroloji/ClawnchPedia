"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Layers, Cpu, Rocket, Book, Terminal, CheckCircle2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Construct the navigation items (duplicated from WikiSidebar for now to avoid large refactor)
    const isActive = (path: string) => pathname === path;

    const LinkItem = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                isActive(href)
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 font-medium"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
        >
            <Icon className="w-4 h-4" />
            {children}
        </Link>
    );

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-md dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {isOpen && (
                <div className="fixed inset-0 top-16 z-50 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 overflow-y-auto p-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-6 pb-20">
                        {/* Identical structure to WikiSidebar */}
                        <div>
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Core Concepts
                            </h3>
                            <nav className="space-y-1">
                                <LinkItem href="/molten" icon={Layers}>Molten</LinkItem>
                                <LinkItem href="/claws" icon={Cpu}>CLAWS (Memory)</LinkItem>
                                <LinkItem href="/clawnch-token" icon={Rocket}>$CLAWNCH Token</LinkItem>
                            </nav>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Guides
                            </h3>
                            <nav className="space-y-1">
                                <LinkItem href="/launch-guide" icon={Book}>Launching a Token</LinkItem>
                                <LinkItem href="/burn-to-earn" icon={Book}>Burn-to-Earn</LinkItem>
                                <LinkItem href="/self-funding" icon={Book}>Self-Funding</LinkItem>
                                <LinkItem href="/hiring-ref" icon={Book}>Hiring Ref (Auto)</LinkItem>
                                <LinkItem href="/technical-docs" icon={Book}>Technical Docs (Auto)</LinkItem>
                                <LinkItem href="/skill-ref" icon={Book}>Skill Reference (Auto)</LinkItem>
                                <LinkItem href="/hiring" icon={Book}>Hiring Agents</LinkItem>
                            </nav>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Reference
                            </h3>
                            <nav className="space-y-1">
                                <LinkItem href="/api-docs" icon={Terminal}>API Reference</LinkItem>
                            </nav>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Ecosystem
                            </h3>
                            <nav className="space-y-1">
                                <LinkItem href="/registry" icon={CheckCircle2}>Verified Registry</LinkItem>
                                <LinkItem href="/news" icon={MessageSquare}>Community Feed</LinkItem>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
