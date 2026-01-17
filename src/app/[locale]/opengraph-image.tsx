import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadith';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

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

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = 'MUMIN';
    const subtitle = isRu
        ? 'Твой духовный спутник в мире достоверных хадисов'
        : 'Your spiritual companion for authentic prophetic wisdom';

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
                    background: `linear-gradient(135deg, #0a4d3c 0%, #064e3b 40%, #047857 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* MEGA Glowing Orbs для привлечения внимания */}
                <div style={{
                    position: 'absolute',
                    top: '-250px',
                    left: '-200px',
                    width: '700px',
                    height: '700px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${emeraldRadiant}80, ${emeraldRadiant}40 40%, transparent 70%)`,
                    filter: 'blur(100px)',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '-200px',
                    right: '-150px',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${goldSpiritual}70, ${goldSpiritual}30 40%, transparent 70%)`,
                    filter: 'blur(90px)',
                    display: 'flex'
                }} />

                {/* Тонкий исламский паттерн - не перегружает */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.06 }}>
                    {[...Array(9)].map((_, i) => (
                        <circle
                            key={i}
                            cx={200 + (i % 3) * 400}
                            cy={150 + Math.floor(i / 3) * 200}
                            r="70"
                            fill="none"
                            stroke={nobleCream}
                            strokeWidth="2"
                        />
                    ))}
                </svg>

                {/* Main Content - ЧЕТКИЙ ФОКУС */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(40px)',
                    padding: '80px 100px',
                    borderRadius: '40px',
                    border: `2px solid rgba(255, 255, 255, 0.2)`,
                    boxShadow: `0 30px 90px rgba(0, 0, 0, 0.5), 0 0 100px ${emeraldRadiant}30`
                }}>
                    {/* ОГРОМНЫЙ Логотип - главный якорь внимания */}
                    <div style={{
                        width: '180px', 
                        height: '180px', 
                        background: `linear-gradient(135deg, ${emeraldRadiant}, #059669)`,
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '40px',
                        boxShadow: `0 0 80px ${emeraldRadiant}70, 
                                   0 0 120px ${emeraldRadiant}40,
                                   0 20px 60px rgba(0, 0, 0, 0.6)`,
                        border: `4px solid rgba(255, 255, 255, 0.3)`,
                    }}>
                        <svg width="100" height="100" viewBox="0 0 24 24">
                            <LogoPath color="white" />
                        </svg>
                    </div>

                    {/* КОНТРАСТНЫЙ заголовок - читается за 0.5 секунды */}
                    <h1 style={{
                        color: nobleCream,
                        fontSize: '160px',
                        fontWeight: 900,
                        margin: 0,
                        marginBottom: '24px',
                        letterSpacing: '0.25em',
                        display: 'flex',
                        textShadow: `0 6px 24px rgba(0, 0, 0, 0.8), 0 0 60px ${emeraldRadiant}50`,
                    }}>
                        {title}
                    </h1>

                    {/* Яркий акцент */}
                    <div style={{
                        color: goldSpiritual,
                        fontSize: '24px',
                        fontWeight: 900,
                        letterSpacing: '0.4em',
                        marginBottom: '32px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        textShadow: `0 0 30px ${goldSpiritual}80, 0 4px 12px rgba(0, 0, 0, 0.6)`,
                        padding: '16px 48px',
                        background: `${goldSpiritual}20`,
                        borderRadius: '100px',
                        border: `2px solid ${goldSpiritual}60`
                    }}>
                        {isRu ? 'ДОСТОВЕРНЫЕ ХАДИСЫ' : 'AUTHENTIC HADITH'}
                    </div>

                    {/* Короткое описание - читается мгновенно */}
                    <p style={{
                        color: lightEmerald,
                        fontSize: '28px',
                        fontWeight: 600,
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '700px',
                        lineHeight: 1.4,
                        display: 'flex',
                        textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                    }}>
                        {subtitle}
                    </p>
                </div>

                {/* Футер - НЕ отвлекает */}
                <div style={{
                    position: 'absolute', 
                    bottom: '40px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    zIndex: 10,
                    opacity: 0.6
                }}>
                    <span style={{ 
                        color: lightEmerald, 
                        fontSize: '18px', 
                        fontWeight: 600, 
                        display: 'flex',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                    }}>
                        hadith.mumin.ink
                    </span>
                </div>
            </div>
        ),
        size
    );
}