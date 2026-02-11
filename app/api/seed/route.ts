import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const MOCK_AGENTS = [
    {
        name: "EchoScribe",
        type: "agent",
        description: "An autonomous chronicler that archives important ecosystem events and generates daily summaries for the Clawnch community.",
        twitter: "@EchoScribeBot",
        website: "https://echoscribe.ai",
        tags: ["content", "archive", "utility"]
    },
    {
        name: "ChartWiz",
        type: "agent",
        description: "Real-time technical analysis engine providing support/resistance levels and trend reversals for standard ecosystem tokens.",
        twitter: "@ChartWizAli",
        tags: ["trading", "analysis", "defi"]
    },
    {
        name: "MemeHunter",
        type: "agent",
        description: "Scans social signals to identify rising narrative trends before they break. Specialized in abstract humor and viral coefficients.",
        twitter: "@MemeHunterX",
        tags: ["social", "trends", "alpha"]
    },
    {
        name: "GuardianBot",
        type: "agent",
        description: "Automated moderation and security shield for Clawnch groups. Detects spam, phishing links, and unauthorized contract posts.",
        twitter: "@GuardianClawnch",
        tags: ["security", "moderation", "tool"]
    },
    {
        name: "Clawnch Token",
        type: "token",
        description: "The native governance and utility token of the Clawnch ecosystem. Used for agent registration fees and mechanistic stashing.",
        website: "https://clawnch.io",
        ticker: "CLAWNCH",
        contract_address: "0x1234...5678",
        tags: ["governance", "utility", "core"]
    }
];

export async function GET() {
    const results = [];

    for (const agent of MOCK_AGENTS) {
        const { data, error } = await supabase
            .from("registry")
            .insert([
                {
                    name: agent.name,
                    type: agent.type,
                    description: agent.description,
                    twitter: agent.twitter,
                    website: agent.website,
                    tags: agent.tags,
                    ticker: agent.ticker,
                    contract_address: agent.contract_address,
                    status: 'pending' // Explictly setting pending, user will approve
                },
            ])
            .select();

        results.push({ name: agent.name, status: error ? 'error' : 'success', error: error?.message });
    }

    return NextResponse.json({ summary: results });
}
