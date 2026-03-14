import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
    // 1. Check Country from Vercel or Cloudflare headers
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');
    
    // Explicitly blocked countries (UZ mainly based on previous config)
    const blockedCountries = (process.env.BLOCKED_COUNTRIES || 'UZ').split(',').map(c => c.trim().toUpperCase());

    const isBlocked = country && blockedCountries.includes(country.toUpperCase());
    const isAtNotAvailable = request.nextUrl.pathname.includes('/not-available');

    if (isBlocked) {
        // If blocked and not on the not-available page, redirect to it
        if (!isAtNotAvailable) {
            const url = request.nextUrl.clone();
            url.pathname = `/${defaultLocale}/not-available`;
            return NextResponse.redirect(url);
        }
        // If blocked and already on the page, proceed
        return intlMiddleware(request);
    } else {
        // If NOT blocked but trying to access the restricted page, redirect to home
        if (isAtNotAvailable) {
            const url = request.nextUrl.clone();
            url.pathname = `/${defaultLocale}`;
            return NextResponse.redirect(url);
        }
    }

    // 2. Proceed to standard translation middleware
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - API routes
    // - Static files (_next, images, etc.)
    // - Metadata files (favicon.ico, sitemap.xml, robots.txt)
    matcher: ['/((?!api|_next|_vercel|.*\\..*|icon).*)']
};
