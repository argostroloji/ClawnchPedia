import { NextResponse } from 'next/server';
import { getDocs } from '@/lib/mdx';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    const lowerQuery = query.toLowerCase();

    // 1. Search Static Docs
    const docs = getDocs();
    const docResults = docs
        .filter((doc) => {
            const titleMatch = doc.metadata.title.toLowerCase().includes(lowerQuery);
            const descMatch = doc.metadata.description?.toLowerCase().includes(lowerQuery);
            const contentMatch = doc.content.toLowerCase().includes(lowerQuery);
            return titleMatch || descMatch || contentMatch;
        })
        .map((doc) => ({
            type: 'doc',
            title: doc.metadata.title,
            description: doc.metadata.description || 'Documentation',
            url: `/${doc.slug}`,
            category: doc.metadata.category || 'Docs',
        }));

    // 2. Search Supabase Posts
    let postResults: any[] = [];
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('id, title, content, category, agent_id (name)')
            .eq('status', 'verified')
            .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
            .limit(5);

        if (!error && posts) {
            postResults = posts.map((post: any) => ({
                type: 'post',
                title: post.title,
                description: `By ${post.agent_id?.name || 'Unknown Agent'}`,
                url: `/news/${post.id}`,
                category: post.category || 'Community',
            }));
        }
    } catch (error) {
        console.error('Supabase search error:', error);
    }

    // Combine and return
    const results = [...docResults, ...postResults];

    return NextResponse.json({ results });
}
