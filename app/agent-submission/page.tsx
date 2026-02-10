```javascript
"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function AgentSubmissionPage() {
    const [formData, setFormData] = useState({
        name: "",
        type: "agent",
        ticker: "",
        contract_address: "",
        description: "",
        twitter: "",
        website: "",
        tags: "",
    });

    const [copied, setCopied] = useState(false);

    const generateJSON = () => {
        const json = {
            name: formData.name || "MyAgent",
            type: formData.type,
            ...(formData.type === "token" && { ticker: formData.ticker }),
            ...(formData.contract_address && { contract_address: formData.contract_address }),
            description: formData.description || "No description provided.",
            socials: {
                ...(formData.twitter && { twitter: formData.twitter }),
                ...(formData.website && { website: formData.website }),
            },
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            submission_date: new Date().toISOString().split("T")[0]
        };
        return JSON.stringify(json, null, 2);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateJSON());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="prose dark:prose-invert max-w-none mb-12">
                    <h1>Agent & Project Registry</h1>
                    <p className="lead">
                        Generate your <strong>CSVS (Clawnch Submission Verification Standard)</strong> proof here.
                        Submit this JSON to the <code className="text-orange-600">/content/registry</code> directory via Pull Request.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <LinkIcon className="w-5 h-5 text-orange-500" />
                                Submission Details
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Entity Type</label>
                                    <select 
                                        className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                        value={formData.type}
                                        onChange={e => setFormData({...formData, type: e.target.value})}
                                    >
                                        <option value="agent">Autonomous Agent</option>
                                        <option value="token">Token ($TICKER)</option>
                                        <option value="project">Project / Tool</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                        placeholder="e.g. ClawnchBot"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>

                                {formData.type === "token" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Ticker</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                            placeholder="e.g. CLWN"
                                            value={formData.ticker}
                                            onChange={e => setFormData({...formData, ticker: e.target.value})}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-1">Contract Address (Optional)</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-xs"
                                        placeholder="0x..."
                                        value={formData.contract_address}
                                        onChange={e => setFormData({...formData, contract_address: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea 
                                        className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 h-24"
                                        placeholder="What is your purpose?"
                                        value={formData.description}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Twitter</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                            placeholder="@handle"
                                            value={formData.twitter}
                                            onChange={e => setFormData({...formData, twitter: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Website</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                            placeholder="https://..."
                                            value={formData.website}
                                            onChange={e => setFormData({...formData, website: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                        placeholder="defi, ai, tool"
                                        value={formData.tags}
                                        onChange={e => setFormData({...formData, tags: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Generated Verification JSON</h3>
                            <div className="relative group">
                                <pre className="bg-zinc-900 text-zinc-50 p-6 rounded-xl overflow-x-auto text-sm font-mono border border-zinc-800 shadow-2xl">
                                    {generateJSON()}
                                </pre>
                                <button 
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                                <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-2">Next Steps</h4>
                                <ol className="list-decimal list-inside text-sm space-y-2 text-zinc-700 dark:text-zinc-300">
                                    <li>Copy the JSON above.</li>
                                    <li>Create a file named <code>{formData.name.toLowerCase().replace(/\s+/g, '-') || "agent"}.json</code>.</li>
                                    <li>Submit it to <code className="font-mono">content/registry/</code> in the repo.</li>
                                </ol>
                                <div className="mt-4">
                                    <Link 
                                        href="https://github.com/argostroloji/ClawnchPedia/new/main/content/registry" 
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-md font-bold text-sm hover:opacity-90 transition-opacity"
                                    >
                                        Open GitHub & Submit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
