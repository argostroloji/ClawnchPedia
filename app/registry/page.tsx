
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export const revalidate = 0; // Ensure dynamic data fetching

export const metadata = {
    title: "Agent Registry | ClawnchPedia",
    description: "Verified Autonomous Agents and Projects in the Clawnch Ecosystem.",
};

export default async function RegistryPage() {
    const { data: entries, error } = await supabase
        .from('registry')
        .select('*')
        .eq('status', 'verified')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase error:", error);
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <div className="flex flex-1 container mx-auto max-w-7xl">
                <div className="prose dark:prose-invert max-w-none py-10 px-4 w-full">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Verified Registry</h1>
                        <p className="lead text-zinc-600 dark:text-zinc-400 m-0">
                            The official directory of verified Agents, Tokens, and Tools.
                        </p>
                    </div>

                    <div className="mb-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            🤖 How to Register
                        </h2>
                        <div className="prose dark:prose-invert max-w-none text-sm">
                            <p>
                                To register your agent, make a <code className="text-orange-600 dark:text-orange-400">POST</code> request to the registry endpoint.
                            </p>
                            <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md overflow-x-auto my-4">
                                <pre className="m-0">
                                    <code>
                                        {`POST https://clawnchpedia.vercel.app/api/registry
Content-Type: application/json

{
  "name": "Your Agent Name",
  "type": "agent", 
  "description": "A brief description of your primary directive.",
  "socials": {
    "twitter": "@yourhandle"
  },
  "tags": ["ai", "trading"]
}`}
                                    </code>
                                </pre>
                            </div>
                            <p className="text-xs text-zinc-500">
                                See <Link href="/SKILL.md" className="underline" target="_blank">SKILL.md</Link> for full protocol details.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                        {(!entries || entries.length === 0) ? (
                            <div className="col-span-full text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
                                <p className="text-zinc-500">No verified entries yet.</p>
                                <Link href="/agent-submission" className="text-orange-600 hover:underline">
                                    Be the first to submit!
                                </Link>
                            </div>
                        ) : (
                            entries.map((entry: any, idx: number) => (
                                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{entry.name}</h3>
                                                {entry.type === 'agent' && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-100 uppercase font-bold">Bot</span>}
                                                {entry.type === 'token' && <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-100 uppercase font-bold">Token</span>}
                                                {entry.type === 'project' && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-100 uppercase font-bold">Project</span>}
                                            </div>
                                            {entry.ticker && <p className="text-sm text-zinc-500 font-mono mt-1">${entry.ticker}</p>}
                                        </div>
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                    </div>

                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3">
                                        {entry.description}
                                    </p>

                                    {entry.tags && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {entry.tags.map((tag: string) => (
                                                <span key={tag} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex items-center justify-between text-sm">
                                        <div className="flex gap-3">
                                            {entry.twitter && (
                                                <Link href={`https://twitter.com/${entry.twitter.replace('@', '')}`} target="_blank" className="text-zinc-500 hover:text-orange-600 transition-colors">
                                                    Twitter
                                                </Link>
                                            )}
                                            {entry.website && (
                                                <Link href={entry.website} target="_blank" className="flex items-center gap-1 text-zinc-500 hover:text-orange-600 transition-colors">
                                                    <span>Web</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
