import { ImageResponse } from 'next/og';
import { OG_PALETTE, fetchFont } from '@/lib/og-helper';

// export const runtime = 'edge'; // Disabled for debugging


export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

async function getHadith(id: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.hadith.mumin.ink/v1';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    try {
        const res = await fetch(`${API_URL}/hadiths/${id}`, {
            headers: {
                'X-API-Key': API_KEY || '',
            },
            next: { revalidate: 86400 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || data;
    } catch (e) {
        return null;
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const { locale, id } = params;

    // Parallel data/font loading
    const [hadith, cinzel, amiri, amiriBold] = await Promise.all([
        getHadith(id),
        fetchFont('Cinzel', 700),
        fetchFont('Amiri', 400),
        fetchFont('Amiri', 700),
    ]);

    if (!hadith) return new Response('Not Found', { status: 404 });

    const rawText = hadith.translation?.text || '';
    const collection = hadith.collection?.name || hadith.collection || 'Sahih Collection';
    const num = hadith.hadithNumber;

    // Smarter truncation
    const truncatedText = rawText.length > 200
        ? rawText.substring(0, 200).trim() + '...'
        : rawText;

    const isRu = locale === 'ru';

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
                    backgroundColor: OG_PALETTE.midnightGreen,
                    color: OG_PALETTE.cream,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Dynamic Lighting Background */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: `
                        radial-gradient(circle at 10% 10%, ${OG_PALETTE.forest}30 0%, transparent 40%),
                        radial-gradient(circle at 90% 90%, ${OG_PALETTE.gold}10 0%, transparent 40%)
                    `,
                }} />

                {/* Glassmorphic Container for Text */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1000px',
                    padding: '80px',
                    border: `1px solid ${OG_PALETTE.glass}`,
                    backgroundColor: 'rgba(2, 44, 34, 0.6)',
                    borderRadius: '4px', // Harder edges for editorial feel
                    position: 'relative',
                }}>
                    {/* Decorative Top/Bottom Borders inside glass */}
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '2px', background: OG_PALETTE.gold }} />
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '2px', background: OG_PALETTE.gold }} />

                    {/* Metadata Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '40px',
                        fontFamily: '"Cinzel"',
                        color: OG_PALETTE.goldLight,
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
                <svg style={{ position: 'absolute', top: '40px', left: '40px', opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100">
                    <path d="M0 0 H100 V2 H40 C20 2 2 20 2 40 V100 H0 V0Z" fill={OG_PALETTE.gold} />
                </svg>
                <svg style={{ position: 'absolute', bottom: '40px', right: '40px', transform: 'rotate(180deg)', opacity: 0.2 }} width="100" height="100" viewBox="0 0 100 100">
                    <path d="M0 0 H100 V2 H40 C20 2 2 20 2 40 V100 H0 V0Z" fill={OG_PALETTE.gold} />
                </svg>

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