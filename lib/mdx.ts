import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface DocMetadata {
    title: string;
    description?: string;
    category?: string;
}

export interface Doc {
    slug: string;
    metadata: DocMetadata;
    content: string;
}

export function getDocs(): Doc[] {
    console.log("[MDX] getDocs called. CWD:", process.cwd());
    console.log("[MDX] contentDirectory:", contentDirectory);

    if (!fs.existsSync(contentDirectory)) {
        console.warn("[MDX] Content directory does not exist!");
        return [];
    }

    try {
        const fileNames = fs.readdirSync(contentDirectory);
        console.log("[MDX] Files found:", fileNames);

        const allDocsData = fileNames.filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md')).map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, "");
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                metadata: data as DocMetadata,
                content,
            };
        });

        return allDocsData;
    } catch (err) {
        console.error("[MDX] Error reading docs:", err);
        return [];
    }
}

export function getDocBySlug(slug: string): Doc | null {
    console.log(`[MDX] getDocBySlug called for: ${slug}`);
    try {
        const fullPath = path.join(contentDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            // Try .md
            const mdPath = path.join(contentDirectory, `${slug}.md`);
            if (!fs.existsSync(mdPath)) {
                console.warn(`[MDX] File not found for slug: ${slug} at ${fullPath} nor ${mdPath}`);
                return null;
            }
            const fileContents = fs.readFileSync(mdPath, "utf8");
            const { data, content } = matter(fileContents);
            return { slug, metadata: data as DocMetadata, content };
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
            slug,
            metadata: data as DocMetadata,
            content,
        };
    } catch (error) {
        console.error(`[MDX] Error getting doc ${slug}:`, error);
        return null;
    }
}
