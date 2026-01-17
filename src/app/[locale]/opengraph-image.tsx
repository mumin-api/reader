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
const teal = '#14b8a6';
const amber = '#f59e0b';
const emeraldDark = '#047857';

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
                    background: `linear-gradient(135deg, ${deepForest} 0%, ${emeraldDark} 40%, ${teal} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Epic Glowing Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '-300px',
                    left: '-200px',
                    width: '800px',
                    height: '800px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${emeraldRadiant}70, transparent 65%)`,
                    filter: 'blur(120px)',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '-350px',
                    right: '-300px',
                    width: '900px',
                    height: '900px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${goldSpiritual}60, transparent 65%)`,
                    filter: 'blur(140px)',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    top: '30%',
                    right: '-100px',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${teal}40, transparent 70%)`,
                    filter: 'blur(100px)',
                    display: 'flex'
                }} />

                {/* Mystical Geometric Background */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.06 }}>
                    {/* Islamic Star Pattern */}
                    {[...Array(20)].map((_, i) => (
                        <g key={`pattern-${i}`}>
                            <circle
                                cx={150 + (i % 5) * 220}
                                cy={100 + Math.floor(i / 5) * 150}
                                r="60"
                                fill="none"
                                stroke={nobleCream}
                                strokeWidth="2"
                            />
                            <circle
                                cx={150 + (i % 5) * 220}
                                cy={100 + Math.floor(i / 5) * 150}
                                r="35"
                                fill="none"
                                stroke={nobleCream}
                                strokeWidth="1.5"
                            />
                        </g>
                    ))}
                    {/* Connecting Grid */}
                    {[...Array(6)].map((_, i) => (
                        <line
                            key={`vline-${i}`}
                            x1={i * 240}
                            y1="0"
                            x2={i * 240}
                            y2="630"
                            stroke={nobleCream}
                            strokeWidth="1"
                            opacity="0.4"
                        />
                    ))}
                    {[...Array(4)].map((_, i) => (
                        <line
                            key={`hline-${i}`}
                            x1="0"
                            y1={i * 210}
                            x2="1200"
                            y2={i * 210}
                            stroke={nobleCream}
                            strokeWidth="1"
                            opacity="0.4"
                        />
                    ))}
                </svg>

                {/* Floating Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    right: '100px',
                    width: '180px',
                    height: '180px',
                    borderRadius: '40px',
                    background: `linear-gradient(135deg, ${emeraldRadiant}35, ${teal}25)`,
                    transform: 'rotate(20deg)',
                    border: `3px solid ${emeraldRadiant}50`,
                    boxShadow: `0 0 60px ${emeraldRadiant}40`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '60px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${goldSpiritual}40, ${amber}30)`,
                    border: `3px solid ${goldSpiritual}60`,
                    boxShadow: `0 0 50px ${goldSpiritual}50`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    top: '300px',
                    left: '80px',
                    width: '100px',
                    height: '100px',
                    background: `linear-gradient(135deg, ${teal}30, ${emeraldRadiant}25)`,
                    transform: 'rotate(45deg)',
                    border: `3px solid ${teal}50`,
                    boxShadow: `0 0 40px ${teal}40`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '220px',
                    right: '120px',
                    width: '130px',
                    height: '130px',
                    borderRadius: '25px',
                    background: `linear-gradient(135deg, ${amber}25, ${goldSpiritual}35)`,
                    transform: 'rotate(-25deg)',
                    border: `3px solid ${amber}45`,
                    boxShadow: `0 0 45px ${amber}40`,
                    display: 'flex'
                }} />

                {/* Ornate Corner Decorations */}
                <div style={{
                    position: 'absolute',
                    top: '25px',
                    left: '25px',
                    width: '150px',
                    height: '150px',
                    display: 'flex'
                }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                        <path d="M0,0 L150,0 L150,50 Q110,50 110,90 Q70,90 70,130 L0,130 Z" fill={`${emeraldRadiant}45`} />
                        <circle cx="75" cy="75" r="35" fill="none" stroke={goldSpiritual} strokeWidth="4" />
                        <circle cx="75" cy="75" r="20" fill="none" stroke={nobleCream} strokeWidth="2" opacity="0.6" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '25px',
                    right: '25px',
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    transform: 'scaleX(-1)'
                }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                        <path d="M0,0 L150,0 L150,50 Q110,50 110,90 Q70,90 70,130 L0,130 Z" fill={`${goldSpiritual}45`} />
                        <circle cx="75" cy="75" r="35" fill="none" stroke={emeraldRadiant} strokeWidth="4" />
                        <circle cx="75" cy="75" r="20" fill="none" stroke={nobleCream} strokeWidth="2" opacity="0.6" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    left: '25px',
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    transform: 'scaleY(-1)'
                }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                        <path d="M0,0 L150,0 L150,50 Q110,50 110,90 Q70,90 70,130 L0,130 Z" fill={`${teal}40`} />
                        <circle cx="75" cy="75" r="35" fill="none" stroke={goldSpiritual} strokeWidth="4" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    right: '25px',
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    transform: 'scale(-1)'
                }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                        <path d="M0,0 L150,0 L150,50 Q110,50 110,90 Q70,90 70,130 L0,130 Z" fill={`${amber}35`} />
                        <circle cx="75" cy="75" r="35" fill="none" stroke={emeraldRadiant} strokeWidth="4" />
                    </svg>
                </div>

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    {/* Mega Logo with Epic Glow */}
                    <div style={{
                        width: '160px', 
                        height: '160px', 
                        background: `linear-gradient(135deg, ${emeraldRadiant}, ${teal})`,
                        borderRadius: '48px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '56px',
                        boxShadow: `0 0 80px ${emeraldRadiant}90, 
                                   0 0 140px ${emeraldRadiant}60,
                                   0 30px 60px rgba(0, 0, 0, 0.4),
                                   inset 0 2px 0 rgba(255, 255, 255, 0.4),
                                   inset 0 -2px 20px rgba(0, 0, 0, 0.2)`,
                        border: `4px solid rgba(255, 255, 255, 0.35)`,
                        position: 'relative'
                    }}>
                        {/* Inner light effect */}
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            right: '15px',
                            height: '50%',
                            background: `radial-gradient(ellipse at top, rgba(255, 255, 255, 0.5), transparent)`,
                            borderRadius: '40px',
                            display: 'flex'
                        }} />
                        <svg width="80" height="80" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 1 }}>
                            <LogoPath color="white" />
                        </svg>
                    </div>

                    {/* Title with Gradient & Glow */}
                    <h1 style={{
                        fontSize: '140px',
                        fontWeight: 900,
                        margin: 0,
                        marginBottom: '20px',
                        letterSpacing: '0.2em',
                        display: 'flex',
                        background: `linear-gradient(135deg, ${nobleCream}, ${lightEmerald})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: `0 0 60px ${emeraldRadiant}70, 0 0 100px ${emeraldRadiant}40`,
                        filter: `drop-shadow(0 6px 20px rgba(0, 0, 0, 0.5))`
                    }}>
                        {title}
                    </h1>

                    {/* Subtitle Badge */}
                    <div style={{
                        color: goldSpiritual,
                        fontSize: '20px',
                        fontWeight: 900,
                        letterSpacing: '0.35em',
                        marginBottom: '56px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        padding: '14px 36px',
                        background: `linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15))`,
                        backdropFilter: 'blur(10px)',
                        borderRadius: '100px',
                        border: `2px solid ${goldSpiritual}50`,
                        boxShadow: `0 0 30px ${goldSpiritual}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                        textShadow: `0 0 20px ${goldSpiritual}60, 0 2px 8px rgba(0, 0, 0, 0.4)`
                    }}>
                        {isRu ? 'ДОСТОВЕРНЫЕ ХАДИСЫ' : 'AUTHENTIC HADITH'}
                    </div>

                    {/* Description */}
                    <p style={{
                        color: nobleCream,
                        fontSize: '32px',
                        fontWeight: 600,
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '880px',
                        lineHeight: 1.5,
                        display: 'flex',
                        textShadow: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 40px ${teal}30`,
                        letterSpacing: '-0.01em'
                    }}>
                        {subtitle}
                    </p>
                </div>

                {/* Premium Footer */}
                <div style={{
                    position: 'absolute', 
                    bottom: '50px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    zIndex: 10,
                    padding: '18px 40px',
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))`,
                    backdropFilter: 'blur(12px)',
                    borderRadius: '100px',
                    border: `2px solid rgba(255, 255, 255, 0.25)`,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}>
                    <span style={{ 
                        color: lightEmerald, 
                        fontSize: '22px', 
                        fontWeight: 700, 
                        display: 'flex',
                        textShadow: `0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px ${emeraldRadiant}40`,
                        letterSpacing: '0.05em'
                    }}>
                        hadith.mumin.ink
                    </span>
                </div>
            </div>
        ),
        size
    );
}