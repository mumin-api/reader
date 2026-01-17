import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

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

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const { locale, id } = params;
    const hadith = await getHadith(id);

    if (!hadith) return new Response('Not Found', { status: 404 });

    const rawText = hadith.translation?.text || '';
    const collection = hadith.collection || 'Sahih Collection';
    const num = hadith.hadithNumber;

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
                }}
            >
                {/* Layer 1: Split Gradients */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `radial-gradient(circle at top left, ${lightEmerald}, transparent)`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `radial-gradient(circle at bottom right, ${goldSpiritual}20, transparent)`,
                    display: 'flex'
                }} />

                {/* Layer 2: Manuscript Frames */}
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
                    borderRadius: '48px',
                    border: `1px solid ${emeraldRadiant}15`,
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                        <div style={{
                            width: '64px', height: '64px', background: emeraldRadiant,
                            borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '24px'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24">
                                <LogoPath color="white" />
                            </svg>
                        </div>

                        <div style={{
                            color: emeraldRadiant, fontSize: '14px', fontWeight: 800, letterSpacing: '0.3em',
                            textTransform: 'uppercase', marginBottom: '8px', display: 'flex'
                        }}>
                            {collection}
                        </div>

                        <div style={{ color: deepForest, fontSize: '20px', opacity: 0.4, fontWeight: 500, display: 'flex' }}>
                            {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                        </div>
                    </div>

                    <div style={{
                        color: deepForest,
                        fontSize: truncatedText.length > 120 ? '32px' : '40px',
                        lineHeight: 1.5,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        marginBottom: '40px',
                        padding: '0 20px',
                        fontStyle: 'italic',
                        display: 'flex'
                    }}>
                        "{truncatedText}"
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', width: '200px', justifyContent: 'space-between' }}>
                        <div style={{ height: '1px', flex: 1, backgroundImage: `linear-gradient(to right, transparent, ${goldSpiritual})` }} />
                        <div style={{ width: '8px', height: '8px', background: goldSpiritual, transform: 'rotate(45deg)', margin: '0 15px' }} />
                        <div style={{ height: '1px', flex: 1, backgroundImage: `linear-gradient(to left, transparent, ${goldSpiritual})` }} />
                    </div>
                </div>

                <div style={{
                    position: 'absolute', bottom: '80px', display: 'flex', alignItems: 'center', zIndex: 10
                }}>
                    <span style={{ color: deepForest, fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em', display: 'flex' }}>MUMIN</span>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: emeraldRadiant, margin: '0 12px', display: 'flex' }} />
                    <span style={{ color: deepForest, fontSize: '18px', fontWeight: 400, opacity: 0.4, display: 'flex' }}>hadith.mumin.ink</span>
                </div>
            </div>
        ),
        size
    );
}