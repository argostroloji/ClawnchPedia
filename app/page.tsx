import { getDocBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function Home() {
  const doc = getDocBySlug("index");

  if (!doc) {
    return notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <MDXRemote source={doc.content} />
    </article>
  );
}
