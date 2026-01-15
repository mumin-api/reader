const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
