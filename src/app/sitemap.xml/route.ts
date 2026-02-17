import { hadithApi } from '@/lib/api/client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';

export async function GET() {
    let collections = [];
    try {
        collections = await hadithApi.getCollections();
    } catch (error) {
        console.warn('Could not fetch collections for sitemap index, skipping dynamic routes.');
    }

    const sitemaps = [
        `${BASE_URL}/sitemap-pages.xml`,
        `${BASE_URL}/sitemap-collections.xml`,
    ];

    if (Array.isArray(collections)) {
        collections.forEach((col: any) => {
            sitemaps.push(`${BASE_URL}/sitemap-hadiths-${col.slug}`);
        });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(url => `
  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
