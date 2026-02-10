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
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);
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
}

export function getDocBySlug(slug: string): Doc | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            // Try .md
            const mdPath = path.join(contentDirectory, `${slug}.md`);
            if (!fs.existsSync(mdPath)) return null;
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
        return null;
    }
}
