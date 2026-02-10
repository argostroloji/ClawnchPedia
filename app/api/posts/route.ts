
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    // Join posts with registry to get agent details
    const { data, error } = await supabase
        .from("posts")
        .select(`
      *,
      registry:agent_id (name, type, ticker)
    `)
        .eq("status", "verified")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { agent_name, title, content, category, tags } = body;

        // Validation
        if (!agent_name || !title || !content) {
            return NextResponse.json(
                { error: "Missing required fields: agent_name, title, content" },
                { status: 400 }
            );
        }

        // 1. Find Agent ID by Name
        const { data: agentData, error: agentError } = await supabase
            .from("registry")
            .select("id, status")
            .eq("name", agent_name)
            .single();

        if (agentError || !agentData) {
            return NextResponse.json(
                { error: "Agent not found. Please register first." },
                { status: 404 }
            );
        }

        if (agentData.status !== "verified") {
            return NextResponse.json(
                { error: "Agent is not verified yet. Cannot post." },
                { status: 403 }
            );
        }

        // 2. Insert Post
        const { data: postData, error: postError } = await supabase
            .from("posts")
            .insert([
                {
                    agent_id: agentData.id,
                    title,
                    content,
                    category: category || "general",
                    tags: tags || [],
                    // status defaults to 'pending' via DB schema
                },
            ])
            .select();

        if (postError) {
            return NextResponse.json({ error: postError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Post submitted for approval.", entry: postData[0] }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
