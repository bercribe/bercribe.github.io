import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import fs from 'node:fs';
import path from 'node:path';

function shaderLoader() {
    return {
        name: 'shader-loader',
        async load({ store, generateDigest }: any) {
            const baseDir = path.resolve('../shaders');
            store.clear();

            function walk(dir: string) {
                const entries = fs.readdirSync(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        walk(fullPath);
                    } else if (entry.name.endsWith('.frag')) {
                        const source = fs.readFileSync(fullPath, 'utf-8');
                        const relPath = path.relative(baseDir, fullPath);
                        const id = relPath.replace('.frag', '');
                        const title = entry.name.replace('.frag', '').replace(/^\d+[-_]?\d*_?/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                        const category = path.dirname(relPath).replace(/-/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase());
                        store.set({
                            id,
                            data: { title, filename: entry.name, source, category: category === '.' ? '' : category },
                            digest: generateDigest(source),
                        });
                    }
                }
            }
            walk(baseDir);
        },
    };
}

export const collections = {
    work: defineCollection({
        // Load Markdown files in the src/content/work directory.
        loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            tags: z.array(z.string()),
            img: z.string(),
            img_alt: z.string().optional(),
            link: z.string().optional(),
            link_text: z.string().optional(),
        }),
    }),
    shaders: defineCollection({
        loader: shaderLoader(),
        schema: z.object({
            title: z.string(),
            filename: z.string(),
            source: z.string(),
            category: z.string(),
        }),
    }),
};
