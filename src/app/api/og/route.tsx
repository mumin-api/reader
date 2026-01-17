import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Celestial Miracle Palette (Premium Edition)
const nobleCream = '#fffdf9';
const emeraldRadiant = '#10b981';
const goldSpiritual = '#fbbf24';
const deepForest = '#064e3b';
const lightEmerald = '#d1fae5';

const LogoPath = ({ color = deepForest }: { color?: string }) => (
    <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4L16.95 10.5L19.5 12L16.95 13.5L12 20L7.05 13.5L4.5 12L7.05 10.5L12 4Z"
        fill={color}
    />
);

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

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const locale = searchParams.get('locale') || 'en';

        if (!id) return new Response('Missing ID', { status: 400 });

        const hadith = await getHadith(id);
        if (!hadith) return new Response('Hadith not found', { status: 404 });

        const rawText = hadith.translation?.text || '';
        const collection = hadith.collection || 'Sahih Collection';
        const num = hadith.hadithNumber;

        // Designer-led Truncation (approx 200 chars for elegance)
        const truncatedText = rawText.length > 180
            ? rawText.substring(0, 180).trim() + '...'
            : rawText;

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
                        backgroundColor: nobleCream,
                        position: 'relative',
                        padding: '60px',
                    }}
                >
                    {/* Layer 1: Celestial Aurora Gradients */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: `radial-gradient(circle at 0% 0%, ${lightEmerald} 0%, transparent 50%), radial-gradient(circle at 100% 100%, ${goldSpiritual}15 0%, transparent 50%)`,
                        display: 'flex'
                    }} />

                    {/* Layer 2: Manuscript Inner Frame */}
                    <div style={{
                        position: 'absolute', top: '40px', left: '40px', right: '40px', bottom: '40px',
                        border: `1px solid ${emeraldRadiant}30`,
                        borderRadius: '32px',
                        display: 'flex'
                    }} />

                    <div style={{
                        position: 'absolute', top: '50px', left: '50px', right: '50px', bottom: '50px',
                        border: `1px solid ${goldSpiritual}40`,
                        borderRadius: '24px',
                        display: 'flex'
                    }} />

                    {/* Main Content Card */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '900px',
                        padding: '60px',
                        background: 'white',
                        boxShadow: '0 40px 100px rgba(6, 78, 59, 0.08)',
                        borderRadius: '48px',
                        border: `1px solid ${emeraldRadiant}15`,
                        zIndex: 10,
                        textAlign: 'center',
                    }}>
                        {/* Elegant Header */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                            <div style={{
                                width: '64px', height: '64px', background: emeraldRadiant,
                                borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '24px', boxShadow: `0 12px 24px ${emeraldRadiant}30`
                            }}>
                                <svg width="32" height="32" viewBox="0 0 24 24">
                                    <LogoPath color="white" />
                                </svg>
                            </div>

                            <div style={{
                                color: emeraldRadiant, fontSize: '14px', fontWeight: 800, letterSpacing: '0.3em',
                                textTransform: 'uppercase', marginBottom: '8px'
                            }}>
                                {collection}
                            </div>

                            <div style={{ color: deepForest, fontSize: '20px', opacity: 0.4, fontWeight: 500 }}>
                                {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                            </div>
                        </div>

                        {/* Beautifully Balanced Text */}
                        <div style={{
                            color: deepForest,
                            fontSize: truncatedText.length > 120 ? '32px' : '40px',
                            lineHeight: 1.5,
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            marginBottom: '40px',
                            padding: '0 20px',
                            fontStyle: 'italic',
                        }}>
                            "{truncatedText}"
                        </div>

                        {/* Ornamental Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', width: '200px', justifyContent: 'space-between' }}>
                            <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, transparent, ${goldSpiritual})` }} />
                            <div style={{ width: '8px', height: '8px', background: goldSpiritual, transform: 'rotate(45deg)', margin: '0 15px' }} />
                            <div style={{ height: '1px', flex: 1, background: `linear-gradient(to left, transparent, ${goldSpiritual})` }} />
                        </div>
                    </div>

                    {/* Branding Footer */}
                    <div style={{
                        position: 'absolute', bottom: '80px', display: 'flex', alignItems: 'center', zIndex: 10
                    }}>
                        <span style={{ color: deepForest, fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em' }}>MUMIN</span>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: emeraldRadiant, margin: '0 12px' }} />
                        <span style={{ color: deepForest, fontSize: '18px', fontWeight: 400, opacity: 0.4 }}>hadith.mumin.ink</span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response('Internal Server Error', { status: 500 });
    }
}