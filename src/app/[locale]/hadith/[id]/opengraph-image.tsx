import { ImageResponse } from 'next/og';
import { OG_PALETTE, fetchFont } from '@/lib/og-helper';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.hadith.mumin.ink/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function getHadith(id: string) {
    try {
        const res = await fetch(`${API_URL}/hadiths/${id}`, {
            headers: {
                'X-API-Key': API_KEY || '',
            },
            next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || data;
    } catch (e) {
        return null;
    }
}

async function getActiveEvents() {
    try {
        const res = await fetch(`${API_URL}/events/active`, {
            headers: {
                'X-API-Key': API_KEY || '',
            },
            cache: 'no-store' // Don't cache event status for OG images right now to allow rapid testing
        });
        if (!res.ok) return [];
        const json = await res.json();
        
        // Handle various response formats: { success: true, data: [...] } or direct array [...]
        const data = json.data !== undefined ? json.data : json;
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const { locale, id } = params;

    // Parallel data/font loading
    const [hadith, events, cinzel, amiri, amiriBold] = await Promise.all([
        getHadith(id),
        getActiveEvents(),
        fetchFont('Cinzel', 700),
        fetchFont('Amiri', 400),
        fetchFont('Amiri', 700),
    ]);

    if (!hadith) return new Response('Not Found', { status: 404 });

    const isRamadan = events.some((e: any) => 
        e.slug === 'ramadan' || 
        e.name?.toLowerCase().includes('ramadan') ||
        e.isActive === true
    );
    const rawText = hadith.translation?.text || '';
    const collection = hadith.collection?.name || hadith.collection || 'Sahih Collection';
    const num = hadith.hadithNumber;

    // Smarter truncation
    const truncatedText = rawText.length > 200
        ? rawText.substring(0, 200).trim() + '...'
        : rawText;

    const themeColors = isRamadan ? {
        bg: '#011c16', // Darker night green
        border: 'rgba(212, 175, 55, 0.4)',
        accent: OG_PALETTE.gold,
    } : {
        bg: OG_PALETTE.midnightGreen,
        border: OG_PALETTE.glass,
        accent: OG_PALETTE.gold,
    };

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: themeColors.bg,
                    color: OG_PALETTE.cream,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Dynamic Lighting Background */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: isRamadan ? `
                        radial-gradient(circle at 20% 20%, #064e3b 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
                    ` : `
                        radial-gradient(circle at 10% 10%, rgba(20, 83, 45, 0.3) 0%, transparent 40%),
                        radial-gradient(circle at 90% 90%, rgba(212, 175, 55, 0.1) 0%, transparent 40%)
                    `,
                }} />

                {/* Ramadan Specific Decorations */}
                {isRamadan && (
                    <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        {/* Crescent Moon */}
                        <svg 
                            style={{ position: 'absolute', top: '40px', right: '60px' }} 
                            width="120" height="120" viewBox="0 0 100 100"
                        >
                            <path d="M80 20 A40 40 0 1 0 80 80 A32 32 0 1 1 80 20" fill={OG_PALETTE.goldLight} />
                        </svg>

                        {/* Hanging Lantern Left */}
                        <svg style={{ position: 'absolute', top: '-10px', left: '120px' }} width="40" height="180" viewBox="0 0 40 180">
                            <line x1="20" y1="0" x2="20" y2="100" stroke={OG_PALETTE.gold} strokeWidth="1" />
                            <path d="M10 100 L30 100 L35 120 L20 145 L5 120 Z" fill={OG_PALETTE.gold} opacity="0.8" />
                        </svg>

                        {/* Hanging Lantern Right */}
                        <svg style={{ position: 'absolute', top: '-20px', left: '260px' }} width="30" height="140" viewBox="0 0 30 140">
                            <line x1="15" y1="0" x2="15" y2="80" stroke={OG_PALETTE.gold} strokeWidth="1" />
                            <rect x="8" y="80" width="14" height="25" fill={OG_PALETTE.gold} opacity="0.6" />
                            <path d="M8 105 L22 105 L15 125 Z" fill={OG_PALETTE.gold} opacity="0.6" />
                        </svg>

                        {/* Small Stars */}
                        {[
                            { t: '15%', l: '10%' }, { t: '40%', l: '25%' }, { t: '70%', l: '15%' },
                            { t: '10%', l: '50%' }, { t: '25%', l: '75%' }, { t: '80%', l: '90%' }
                        ].map((s, i) => (
                            <div key={i} style={{
                                position: 'absolute', top: s.t, left: s.l,
                                width: '2px', height: '2px', backgroundColor: OG_PALETTE.goldLight,
                                borderRadius: '50%'
                            }} />
                        ))}
                    </div>
                )}

                {/* Glassmorphic Container for Text */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1000px',
                    padding: '80px',
                    border: `1px solid ${themeColors.border}`,
                    backgroundColor: isRamadan ? 'rgba(1, 28, 22, 0.7)' : 'rgba(2, 44, 34, 0.6)',
                    borderRadius: '4px',
                    position: 'relative',
                }}>
                    {/* Decorative Top/Bottom Borders inside glass */}
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '2px', background: themeColors.accent }} />
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '2px', background: themeColors.accent }} />

                    {/* Metadata Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '40px',
                        fontFamily: '"Cinzel"',
                        color: isRamadan ? OG_PALETTE.gold : OG_PALETTE.goldLight,
                        fontSize: '20px',
                        letterSpacing: '0.1em',
                    }}>
                        <span>{collection.toUpperCase()}</span>
                        <div style={{ width: '4px', height: '4px', background: OG_PALETTE.gold, borderRadius: '50%' }} />
                        <span>#{num}</span>
                    </div>

                    {/* The Hadith Text - The Hero */}
                    <div style={{
                        fontFamily: '"Amiri"',
                        fontSize: truncatedText.length > 150 ? '36px' : '44px',
                        lineHeight: 1.6,
                        textAlign: 'center',
                        color: OG_PALETTE.white,
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        marginBottom: '40px',
                    }}>
                        "{truncatedText}"
                    </div>

                    {/* Footer / Attribution */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginTop: '10px',
                        opacity: 0.6,
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                                stroke={OG_PALETTE.cream} strokeWidth="2" />
                        </svg>
                        <span style={{
                            fontFamily: '"Cinzel"',
                            fontSize: '16px',
                            letterSpacing: '0.2em',
                        }}>
                            HADITH.MUMIN.INK
                        </span>
                    </div>
                </div>

                {/* Subtle corner patterns */}
                {!isRamadan && (
                    <>
                        <svg style={{ position: 'absolute', top: '40px', left: '40px', opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100">
                            <path d="M0 0 H100 V2 H40 C20 2 2 20 2 40 V100 H0 V0Z" fill={OG_PALETTE.gold} />
                        </svg>
                        <svg style={{ position: 'absolute', bottom: '40px', right: '40px', transform: 'rotate(180deg)', opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100">
                            <path d="M0 0 H100 V2 H40 C20 2 2 20 2 40 V100 H0 V0Z" fill={OG_PALETTE.gold} />
                        </svg>
                    </>
                )}
            </div>
        ),
        {
            ...size,
            fonts: [
                cinzel && { name: 'Cinzel', data: cinzel, style: 'normal', weight: 700 },
                amiri && { name: 'Amiri', data: amiri, style: 'normal', weight: 400 },
                amiriBold && { name: 'Amiri', data: amiriBold, style: 'normal', weight: 700 },
            ].filter(Boolean) as any,
        }
    );
}