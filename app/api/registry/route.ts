
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    const { data, error } = await supabase
        .from("registry")
        .select("*")
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
        const { name, type, description, socials, tags, ticker, contract_address } = body;

        // Basic validation
        if (!name || !type || !description) {
            return NextResponse.json(
                { error: "Missing required fields: name, type, description" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("registry")
            .insert([
                {
                    name,
                    type,
                    description,
                    twitter: socials?.twitter,
                    website: socials?.website,
                    telegram: socials?.telegram,
                    tags, // Array
                    ticker,
                    contract_address,
                },
            ])
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, entry: data[0] }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
