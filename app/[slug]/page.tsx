import { getDocBySlug, getDocs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const docs = getDocs();
    return docs
        .filter((doc) => doc.slug !== 'index')
        .map((doc) => ({
            slug: doc.slug,
        }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Handle index page specifically if routed here (though app/page.tsx handles root)
    if (slug === 'index') {
        return notFound();
    }

    const doc = getDocBySlug(slug);

    if (!doc) {
        return notFound();
    }

    return (
        <article className="prose dark:prose-invert max-w-none">
            <h1 className="mb-4">{doc.metadata.title}</h1>
            {doc.metadata.description && (
                <p className="lead text-xl text-zinc-600 dark:text-zinc-400 mb-8">{doc.metadata.description}</p>
            )}
            <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
            <MDXRemote source={doc.content} />
        </article>
    );
}
