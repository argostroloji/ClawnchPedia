"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Layers, Cpu, Rocket, Book, Terminal, CheckCircle2, MessageSquare, Search } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

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

    const drawer = (
        <div className="fixed inset-0 z-[99999] flex justify-start">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <div className="relative z-[100000] w-72 bg-white dark:bg-zinc-950 h-full border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                {/* Drawer Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-full">
                            <Image
                                src="/logo.png"
                                alt="ClawnchLogo"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <span className="font-bold text-xl">ClawnchPedia</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-md dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-6">
                        {/* Search for Mobile */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-none rounded-md focus:ring-2 focus:ring-zinc-500 outline-none text-sm"
                            />
                        </div>

                        {/* Navigation Groups */}
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
            </div>
        </div>
    );

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-md dark:text-zinc-300 dark:hover:bg-zinc-800 -ml-2"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {mounted && isOpen && createPortal(drawer, document.body)}
        </div>
    );
}
