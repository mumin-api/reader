import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Enhanced Color Palette
const nobleCream = '#fffdf9';
const emeraldRadiant = '#10b981';
const goldSpiritual = '#fbbf24';
const deepForest = '#064e3b';
const lightEmerald = '#d1fae5';
const teal = '#14b8a6';
const amber = '#f59e0b';
const emeraldDark = '#047857';

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
                    background: `linear-gradient(135deg, ${deepForest} 0%, ${emeraldDark} 50%, ${teal} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Massive Glowing Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '-200px',
                    left: '-200px',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${emeraldRadiant}60, transparent 70%)`,
                    filter: 'blur(80px)',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '-250px',
                    right: '-250px',
                    width: '700px',
                    height: '700px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${goldSpiritual}50, transparent 70%)`,
                    filter: 'blur(100px)',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${teal}30, transparent 70%)`,
                    filter: 'blur(90px)',
                    display: 'flex'
                }} />

                {/* Islamic Geometric Patterns */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08 }}>
                    {/* Stars pattern */}
                    {[...Array(12)].map((_, i) => (
                        <circle
                            key={`star-${i}`}
                            cx={100 + (i % 4) * 300}
                            cy={100 + Math.floor(i / 4) * 200}
                            r="80"
                            fill="none"
                            stroke={nobleCream}
                            strokeWidth="2"
                        />
                    ))}
                    {/* Connecting lines */}
                    {[...Array(8)].map((_, i) => (
                        <line
                            key={`line-${i}`}
                            x1={i * 150}
                            y1="0"
                            x2={i * 150}
                            y2="630"
                            stroke={nobleCream}
                            strokeWidth="1"
                            opacity="0.3"
                        />
                    ))}
                </svg>

                {/* Floating Decorative Shapes */}
                <div style={{
                    position: 'absolute',
                    top: '100px',
                    right: '120px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '30px',
                    background: `linear-gradient(135deg, ${emeraldRadiant}30, ${teal}20)`,
                    transform: 'rotate(15deg)',
                    border: `2px solid ${emeraldRadiant}40`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '120px',
                    left: '80px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${goldSpiritual}35, ${amber}25)`,
                    border: `2px solid ${goldSpiritual}50`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    top: '250px',
                    left: '100px',
                    width: '80px',
                    height: '80px',
                    background: `linear-gradient(135deg, ${teal}25, ${emeraldRadiant}20)`,
                    transform: 'rotate(45deg)',
                    border: `2px solid ${teal}40`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '200px',
                    right: '150px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${amber}20, ${goldSpiritual}30)`,
                    transform: 'rotate(-20deg)',
                    border: `2px solid ${amber}35`,
                    display: 'flex'
                }} />

                {/* Intricate Corner Ornaments */}
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    left: '30px',
                    width: '120px',
                    height: '120px',
                    display: 'flex'
                }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <path d="M0,0 L120,0 L120,40 Q90,40 90,70 Q60,70 60,100 L0,100 Z" fill={`${emeraldRadiant}40`} />
                        <circle cx="60" cy="60" r="25" fill="none" stroke={goldSpiritual} strokeWidth="3" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    width: '120px',
                    height: '120px',
                    display: 'flex',
                    transform: 'scaleX(-1)'
                }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <path d="M0,0 L120,0 L120,40 Q90,40 90,70 Q60,70 60,100 L0,100 Z" fill={`${goldSpiritual}40`} />
                        <circle cx="60" cy="60" r="25" fill="none" stroke={emeraldRadiant} strokeWidth="3" />
                    </svg>
                </div>

                {/* Main Content Card - Glassmorphism */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '880px',
                    padding: '70px 60px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '48px',
                    border: `2px solid rgba(255, 255, 255, 0.25)`,
                    boxShadow: `0 30px 60px rgba(0, 0, 0, 0.3), 
                                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                                0 0 80px ${emeraldRadiant}20`,
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    {/* Logo with Stunning Glow */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                        <div style={{
                            width: '90px', 
                            height: '90px', 
                            background: `linear-gradient(135deg, ${emeraldRadiant}, ${teal})`,
                            borderRadius: '28px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginBottom: '28px',
                            boxShadow: `0 0 40px ${emeraldRadiant}80, 
                                       0 0 80px ${emeraldRadiant}50,
                                       0 20px 40px rgba(0, 0, 0, 0.3),
                                       inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
                            border: `3px solid rgba(255, 255, 255, 0.3)`,
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent)`,
                                borderRadius: '28px',
                                display: 'flex'
                            }} />
                            <svg width="48" height="48" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 1 }}>
                                <LogoPath color="white" />
                            </svg>
                        </div>

                        <div style={{
                            color: nobleCream, 
                            fontSize: '16px', 
                            fontWeight: 900, 
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase', 
                            marginBottom: '12px', 
                            display: 'flex',
                            textShadow: `0 0 20px ${goldSpiritual}80, 0 0 40px ${goldSpiritual}40, 0 2px 4px rgba(0,0,0,0.3)`,
                        }}>
                            {collection}
                        </div>

                        <div style={{ 
                            color: lightEmerald, 
                            fontSize: '20px', 
                            fontWeight: 700, 
                            display: 'flex',
                            letterSpacing: '0.08em',
                            textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                        }}>
                            {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                        </div>
                    </div>

                    {/* Quote with Beautiful Typography */}
                    <div style={{
                        color: nobleCream,
                        fontSize: truncatedText.length > 120 ? '34px' : '42px',
                        lineHeight: 1.7,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        marginBottom: '50px',
                        padding: '0 30px',
                        fontStyle: 'italic',
                        display: 'flex',
                        textShadow: `0 4px 12px rgba(0, 0, 0, 0.5), 0 0 40px ${emeraldRadiant}30`
                    }}>
                        "{truncatedText}"
                    </div>

                    {/* Gorgeous Divider */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '280px', 
                        justifyContent: 'center',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            height: '3px', 
                            flex: 1, 
                            background: `linear-gradient(to right, transparent, ${goldSpiritual}, ${goldSpiritual}80)`,
                            borderRadius: '10px',
                            boxShadow: `0 0 10px ${goldSpiritual}60`
                        }} />
                        <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            background: `linear-gradient(135deg, ${goldSpiritual}, ${amber})`, 
                            transform: 'rotate(45deg)',
                            boxShadow: `0 0 20px ${goldSpiritual}90, 0 0 40px ${goldSpiritual}50`,
                            border: `2px solid rgba(255, 255, 255, 0.5)`
                        }} />
                        <div style={{ 
                            height: '3px', 
                            flex: 1, 
                            background: `linear-gradient(to left, transparent, ${goldSpiritual}, ${goldSpiritual}80)`,
                            borderRadius: '10px',
                            boxShadow: `0 0 10px ${goldSpiritual}60`
                        }} />
                    </div>
                </div>

                {/* Premium Footer Badge */}
                <div style={{
                    position: 'absolute', 
                    bottom: '50px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    zIndex: 10,
                    padding: '20px 40px',
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))`,
                    backdropFilter: 'blur(10px)',
                    borderRadius: '100px',
                    border: `2px solid rgba(255, 255, 255, 0.25)`,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}>
                    <span style={{ 
                        color: nobleCream, 
                        fontSize: '24px', 
                        fontWeight: 900, 
                        letterSpacing: '0.15em', 
                        display: 'flex',
                        textShadow: `0 0 20px ${emeraldRadiant}60, 0 2px 4px rgba(0, 0, 0, 0.4)`
                    }}>
                        MUMIN
                    </span>
                    <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: goldSpiritual, 
                        margin: '0 20px', 
                        display: 'flex',
                        boxShadow: `0 0 12px ${goldSpiritual}90, 0 0 24px ${goldSpiritual}50`
                    }} />
                    <span style={{ 
                        color: lightEmerald, 
                        fontSize: '20px', 
                        fontWeight: 600, 
                        display: 'flex',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'
                    }}>
                        hadith.mumin.ink
                    </span>
                </div>
            </div>
        ),
        size
    );
}