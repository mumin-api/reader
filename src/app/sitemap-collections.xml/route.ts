import { hadithApi } from '@/lib/api/client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export async function GET() {
    let entries: string[] = [];

    try {
        const collections = await hadithApi.getCollections();
        if (Array.isArray(collections)) {
            entries = collections.map((col: any) => `
  <url>
    <loc>${BASE_URL}/collections/${col.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
        }
    } catch (err) {
        console.error('Failed to fetch collections for sitemap', err);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.join('')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
