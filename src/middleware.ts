import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
});

export const config = {
    // Match all pathnames except for
    // - API routes
    // - Static files (_next, images, etc.)
    // - Metadata files (favicon.ico, sitemap.xml, robots.txt)
    matcher: ['/((?!api|_next|_vercel|.*\\..*|icon).*)']
};
