const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hadith.mumin.ink';
const locales = ['en', 'ru', 'ar', 'ur', 'tr', 'id', 'uz'];

export async function GET() {
    const pages = [
        { url: '', priority: '1.0', changefreq: 'daily' },
        { url: '/collections', priority: '0.8', changefreq: 'daily' },
        { url: '/random', priority: '0.6', changefreq: 'always' },
        { url: '/about', priority: '0.5', changefreq: 'monthly' },
        { url: '/methodology', priority: '0.5', changefreq: 'monthly' },
        { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
        { url: '/terms', priority: '0.3', changefreq: 'monthly' },
    ];

    let urlEntries = '';

    pages.forEach(page => {
        locales.forEach(locale => {
            const fullUrl = `${BASE_URL}/${locale}${page.url}`;
            let alternates = locales.map(l => 
                `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${page.url}"/>`
            ).join('');
            
            // Add x-default (pointing to English)
            alternates += `<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${page.url}"/>`;

            urlEntries += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${alternates}
  </url>`;
        });
    });

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
