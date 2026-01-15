import { hadithApi } from '@/lib/api/client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export async function GET(
    request: Request,
    { params }: any
) {
    const { slug } = await params;
    // Note: The filename is sitemap-hadiths-[slug].xml, but we use a dynamic route parameter for easier implementation
    // If we want the EXACT filename in the URL, we need to handle it in a parent route or rewrite.
    // For now, let's assume the router handles [slug] correctly if the folder is named sitemap-hadiths-[slug].xml

    let entries: string[] = [];

    try {
        // We need to fetch all hadith numbers for this collection.
        // Assuming the API has a way to get counts or lists.
        const response = await hadithApi.getHadiths({
            collection: slug,
            limit: 1 // Just to get total if pagination info exists
        });

        const total = response.data?.pagination?.total || 1000; // Fallback or handle appropriately

        // Sitemaps have a limit of 50,000 URLs. Most collections are smaller.
        // For extremely large ones (Musnad Ahmad), we might need further partitioning.
        for (let i = 1; i <= total; i++) {
            entries.push(`
  <url>
    <loc>${BASE_URL}/collections/${slug}/${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
        }
    } catch (err) {
        console.error(`Failed to fetch hadiths for sitemap ${slug}`, err);
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
