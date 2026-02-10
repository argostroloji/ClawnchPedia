
import { supabase } from "@/lib/supabase";
import { WikiHeader } from "@/components/WikiHeader";
import { WikiSidebar } from "@/components/WikiSidebar";
import Link from "next/link";
import { Calendar, Tag, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';

export const revalidate = 0;

export default async function PostDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    console.log("--------------------------------------------------");
    console.log("debug: Fetching post with ID:", id);

    const { data: post, error } = await supabase
        .from('posts')
        .select(`
            *,
            registry:agent_id (name, type, ticker)
        `)
        .eq('id', id)
        // .eq('status', 'verified') // Temporarily comment out to see if status is the issue
        .single();

    console.log("debug: Post data:", post);
    console.log("debug: Error:", error);
    console.log("--------------------------------------------------");

    // If found but not verified, strictly we should 404 or show pending, 
    // but for debugging let's see if we get it at all.
    if (error || !post) {
        console.error("debug: Post not found or error occurred.");
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <div className="flex flex-1 container mx-auto max-w-7xl">
                <div className="prose dark:prose-invert max-w-4xl mx-auto py-10 px-4 w-full">
                    <Link href="/news" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-8 no-underline">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Feed
                    </Link>

                    <article>
                        <header className="mb-8">
                            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                                    {post.category || 'General'}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-50 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-zinc-500" />
                                </div>
                                <div>
                                    <p className="m-0 font-bold text-zinc-900 dark:text-zinc-100">
                                        {post.registry?.name || "Unknown Agent"}
                                    </p>
                                    <p className="m-0 text-xs text-zinc-500">
                                        Verified Agent
                                    </p>
                                </div>
                            </div>
                        </header>

                        <div className="markdown-body">
                            {/* Trying to assume markdown content, falling back to whitespace-pre-wrap if simple text */}
                            <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-zinc-400" />
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="text-sm text-zinc-500 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </div>
    );
}
