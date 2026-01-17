
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

async function getHadith(id: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
        const apiKey = process.env.API_KEY || 'sk_mumin_test_key_1234567890abcdef12345678';

        const res = await fetch(`${baseUrl}/hadiths/${id}?language=en`, {
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error(`OG Image Fetch Error: ${res.status} ${res.statusText}`);
            return null;
        }
        const json = await res.json();
        return json.data;
    } catch (e) {
        console.error('OG Image Fetch Exception:', e);
        return null;
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const hadith = await getHadith(params.id);

    // Common styles
    const emerald900 = '#064e3b';
    const emerald950 = '#022c22';
    const gold500 = '#d4af37';
    const sand100 = '#f5f5f0';

    // Fallback if hadith not found
    if (!hadith) {
        return new ImageResponse(
            (
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: emerald900,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                }}>
                    Hadith Not Found
                </div>
            ),
            { ...size }
        );
    }

    const cream = '#fffdf9';
    const gold400 = '#fbbf24';

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
                    backgroundColor: emerald950,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Background with rich radial gradient */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at center, ${emerald900} 0%, ${emerald950} 100%)`,
                        display: 'flex',
                    }}
                />

                {/* Decorative Islamic Geometric Patterns (Corners) */}
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '400px',
                            height: '400px',
                            opacity: 0.1,
                            border: `2px solid ${gold500}`,
                            transform: `rotate(${i * 22.5}deg) scale(1.2)`,
                            top: i < 2 ? '-200px' : 'auto',
                            bottom: i >= 2 ? '-200px' : 'auto',
                            left: i % 2 === 0 ? '-200px' : 'auto',
                            right: i % 2 !== 0 ? '-200px' : 'auto',
                            display: 'flex',
                        }}
                    />
                ))}

                {/* Outer decorative borders */}
                <div
                    style={{
                        position: 'absolute',
                        top: '40px',
                        left: '40px',
                        right: '40px',
                        bottom: '40px',
                        border: `1px solid ${gold500}`,
                        opacity: 0.4,
                        display: 'flex',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '55px',
                        left: '55px',
                        right: '55px',
                        bottom: '55px',
                        border: `3px solid ${gold500}`,
                        opacity: 0.2,
                        display: 'flex',
                    }}
                />

                {/* Main Content Area */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        padding: '100px',
                        zIndex: '10',
                        position: 'relative',
                    }}
                >
                    {/* Header: Collection & Number */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: gold400, fontSize: '20px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                Collection
                            </div>
                            <div style={{ color: 'white', fontSize: '32px', fontWeight: 800 }}>
                                {hadith.collection || 'Sahih Collection'}
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '10px 24px', backgroundColor: 'rgba(212,175,55,0.1)', border: `1px solid ${gold500}`, borderRadius: '4px' }}>
                            <div style={{ color: gold400, fontSize: '24px', fontWeight: 'bold' }}>Hadith #{hadith.hadithNumber}</div>
                        </div>
                    </div>

                    {/* Hadith Text with automatic sizing/flex */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px 0'
                    }}>
                        <div style={{
                            color: cream,
                            fontSize: (hadith.translation?.text || '').length > 300 ? '28px' : '36px',
                            lineHeight: 1.6,
                            textAlign: 'center',
                            fontStyle: 'italic',
                            fontWeight: 500,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            "{(hadith.translation?.text || '').length > 500 ? (hadith.translation?.text || '').substring(0, 500) + '...' : (hadith.translation?.text || '')}"
                        </div>
                    </div>

                    {/* Footer Branding */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        marginTop: '40px',
                        width: '100%'
                    }}>
                        <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, transparent, ${gold500})`, opacity: 0.3 }} />
                        <div style={{ color: gold400, fontSize: '20px', letterSpacing: '0.1em', fontWeight: 600 }}>hadith.mumin.ink</div>
                        <div style={{ height: '1px', flex: 1, background: `linear-gradient(to left, transparent, ${gold500})`, opacity: 0.3 }} />
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
