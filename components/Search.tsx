'use client';

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Loader2, Book, MessageSquare, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard shortcut (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Search effect
    useEffect(() => {
        const search = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(search, 300); // 300ms debounce
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (url: string) => {
        setIsOpen(false);
        setQuery('');
        router.push(url);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full max-w-md flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-left"
            >
                <SearchIcon className="w-4 h-4" />
                <span className="flex-1">Search documentation...</span>
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        ref={searchRef}
                        className="w-full max-w-xl bg-white dark:bg-zinc-950 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200"
                    >
                        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-4">
                            <SearchIcon className="w-5 h-5 text-zinc-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for docs, agents, updates..."
                                className="flex-1 h-16 bg-transparent border-none outline-none px-4 text-lg placeholder:text-zinc-400"
                            />
                            {loading && <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />}
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {!query && (
                                <div className="p-8 text-center text-zinc-500 text-sm">
                                    Type to search across documentation and community posts.
                                </div>
                            )}

                            {query && !loading && results.length === 0 && (
                                <div className="p-8 text-center text-zinc-500 text-sm">
                                    No results found for "{query}".
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="space-y-1">
                                    {results.map((result, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelect(result.url)}
                                            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-left group"
                                        >
                                            <div className="mt-1 p-2 bg-zinc-100 dark:bg-zinc-900 rounded-md group-hover:bg-white dark:group-hover:bg-zinc-800 transition-colors">
                                                {result.type === 'doc' ? (
                                                    <Book className="w-4 h-4 text-zinc-500" />
                                                ) : (
                                                    <MessageSquare className="w-4 h-4 text-zinc-500" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                                        {result.title}
                                                    </span>
                                                    <span className="text-xs text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                                                        {result.category}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-zinc-500 truncate">
                                                    {result.description}
                                                </p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex justify-end">
                            <kbd className="inline-flex h-5 items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                                ESC
                            </kbd>
                            <span className="text-xs text-zinc-400 ml-2 pt-0.5">to close</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
