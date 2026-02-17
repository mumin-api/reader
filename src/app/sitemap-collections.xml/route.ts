import { hadithApi } from '@/lib/api/client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';
const locales = ['en', 'ru', 'ar', 'ur', 'tr', 'id', 'uz'];

export async function GET() {
    let urlEntries = '';

    try {
        const collections = await hadithApi.getCollections();
        if (Array.isArray(collections)) {
            collections.forEach((col: any) => {
                locales.forEach(locale => {
                    const pageUrl = `/collections/${col.slug}`;
                    const fullUrl = `${BASE_URL}/${locale}${pageUrl}`;
                    
                    let alternates = locales.map(l => 
                        `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${pageUrl}"/>`
                    ).join('');
                    
                    // Add x-default (pointing to English)
                    alternates += `<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${pageUrl}"/>`;

                    urlEntries += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${alternates}
  </url>`;
                });
            });
        }
    } catch (err) {
        console.error('Failed to fetch collections for sitemap', err);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urlEntries}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
