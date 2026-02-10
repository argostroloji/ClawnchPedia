
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function snapshotUrl(url: string, filename: string, title: string, category: string) {
    console.log(`Fetching ${url}...`);
    try {
        const res = await fetch(url);
        const html = await res.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and nav elements to clean up
        $('script').remove();
        $('style').remove();
        $('nav').remove();
        $('header').remove();
        $('footer').remove();

        // Target main content logic - this is a heuristic
        // We might need to adjust this selector based on the actual clawn.ch DOM structure
        // For now, let's grab the 'body' but lean heavily on Turndown cleaning it up
        const contentHtml = $('body').html() || '';

        const markdown = turndownService.turndown(contentHtml);

        const fileContent = `---
title: ${title}
description: Automatically synced from ${url}
category: ${category}
---

# ${title}

> [!NOTE]
> This page is automatically synced from [${url}](${url}).

${markdown}
`;

        fs.writeFileSync(path.join(CONTENT_DIR, filename), fileContent);
        console.log(`Saved ${filename}`);

    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
    }
}

async function main() {
    if (!fs.existsSync(CONTENT_DIR)) {
        fs.mkdirSync(CONTENT_DIR);
    }

    // Map of external URLs to local MDX files
    // Ideally we would want to intelligently parse the structure, but hardcoding key pages is a good start

    // We can't actually scrape clawn.ch easily if it's a SPA or protected. 
    // This is a "best effort" implementation.

    // NOTE: Since I cannot verify the DOM structure of clawn.ch without a browser, 
    // this script assumes a standard static site structure. 

    await snapshotUrl('https://clawn.ch/skill', 'skill-ref.mdx', 'Skill Reference', 'Reference');
    await snapshotUrl('https://clawn.ch/docs', 'technical-docs.mdx', 'Technical Documentation', 'Reference');
    await snapshotUrl('https://clawn.ch/hiring', 'hiring-ref.mdx', 'CEO Hiring', 'Guides');
}

main();
