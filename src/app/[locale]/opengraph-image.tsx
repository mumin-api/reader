import { ImageResponse } from 'next/og';
import { OG_PALETTE, fetchFont } from '@/lib/og-helper';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadith';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = 'MUMIN';
    const subtitle = isRu
        ? 'Твой Духовный Спутник'
        : 'Your Spiritual Companion';
    const tagline = isRu
        ? 'Свет Достоверной Мудрости'
        : 'The Light of Authentic Wisdom';

    console.log('Generating Premium OG Image for locale:', locale);

    try {
        const cynzelRegular = await fetchFont('Cinzel', 400);
        const cinzelBold = await fetchFont('Cinzel', 700);
        const amiri = await fetchFont('Amiri', 400);

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
                        background: `radial-gradient(ellipse 80% 80% at 50% -20%, #1a3a3a 0%, ${OG_PALETTE.midnightGreen} 45%, #0a1a1a 100%)`,
                        color: OG_PALETTE.cream,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Divine Light Rays from Top */}
                    <div style={{
                        position: 'absolute',
                        top: '-300px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '1400px',
                        height: '800px',
                        background: `radial-gradient(ellipse at center, ${OG_PALETTE.gold}25 0%, transparent 70%)`,
                        opacity: 0.6,
                        display: 'flex',
                    }} />

                    {/* Animated Light Beams */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08 }}>
                        <defs>
                            <linearGradient id="beam1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={OG_PALETTE.gold} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={OG_PALETTE.gold} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M 600 0 L 550 630" stroke="url(#beam1)" strokeWidth="80" />
                        <path d="M 600 0 L 650 630" stroke="url(#beam1)" strokeWidth="80" />
                        <path d="M 600 0 L 400 630" stroke="url(#beam1)" strokeWidth="60" />
                        <path d="M 600 0 L 800 630" stroke="url(#beam1)" strokeWidth="60" />
                    </svg>

                    {/* Sacred Islamic Geometric Pattern */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.06 }}>
                        <defs>
                            <pattern id="islamicPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <g stroke={OG_PALETTE.gold} fill="none" strokeWidth="1.5">
                                    <circle cx="60" cy="60" r="30" />
                                    <circle cx="60" cy="60" r="20" />
                                    <path d="M 60 30 L 60 90 M 30 60 L 90 60" />
                                    <path d="M 42 42 L 78 78 M 78 42 L 42 78" />
                                    <polygon points="60,35 70,55 85,55 73,65 78,80 60,70 42,80 47,65 35,55 50,55" />
                                </g>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#islamicPattern)" />
                    </svg>

                    {/* Glowing Particles */}
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '10%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: OG_PALETTE.gold,
                        boxShadow: `0 0 20px ${OG_PALETTE.gold}`,
                        opacity: 0.7,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '25%',
                        right: '15%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: OG_PALETTE.goldLight,
                        boxShadow: `0 0 15px ${OG_PALETTE.goldLight}`,
                        opacity: 0.6,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '30%',
                        left: '20%',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: OG_PALETTE.silver,
                        boxShadow: `0 0 12px ${OG_PALETTE.silver}`,
                        opacity: 0.5,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '12%',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: OG_PALETTE.gold,
                        boxShadow: `0 0 18px ${OG_PALETTE.gold}`,
                        opacity: 0.6,
                        display: 'flex',
                    }} />

                    {/* Ornate Border Frame - Triple Layer */}
                    <div style={{
                        position: 'absolute',
                        top: '30px',
                        left: '30px',
                        right: '30px',
                        bottom: '30px',
                        border: `3px solid ${OG_PALETTE.gold}`,
                        borderRadius: '8px',
                        boxShadow: `inset 0 0 60px ${OG_PALETTE.gold}20, 0 0 40px ${OG_PALETTE.gold}30`,
                        display: 'flex',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            right: '8px',
                            bottom: '8px',
                            border: `1px solid ${OG_PALETTE.gold}60`,
                            borderRadius: '4px',
                            display: 'flex',
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '4px',
                                left: '4px',
                                right: '4px',
                                bottom: '4px',
                                border: `1px solid ${OG_PALETTE.border}40`,
                                borderRadius: '2px',
                                display: 'flex',
                            }} />
                        </div>
                    </div>

                    {/* Corner Ornaments - Islamic Star Motifs */}
                    {[
                        { top: '20px', left: '20px', rotate: 0 },
                        { top: '20px', right: '20px', rotate: 90 },
                        { bottom: '20px', left: '20px', rotate: 270 },
                        { bottom: '20px', right: '20px', rotate: 180 }
                    ].map(({ rotate, ...pos }, i) => (
                        <svg
                            key={i}
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            style={{
                                position: 'absolute',
                                ...pos,
                                transform: `rotate(${rotate}deg)`,
                                opacity: 0.8,
                            }}
                        >
                            <defs>
                                <linearGradient id={`cornerGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={OG_PALETTE.gold} />
                                    <stop offset="100%" stopColor={OG_PALETTE.goldLight} />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 30 5 L 35 20 L 50 20 L 38 29 L 43 44 L 30 35 L 17 44 L 22 29 L 10 20 L 25 20 Z"
                                fill={`url(#cornerGrad${i})`}
                                stroke={OG_PALETTE.gold}
                                strokeWidth="1"
                            />
                            <circle cx="30" cy="30" r="8" fill="none" stroke={OG_PALETTE.gold} strokeWidth="1.5" opacity="0.6" />
                        </svg>
                    ))}

                    {/* Main Content Container with Depth */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                        gap: '16px',
                        textAlign: 'center',
                        padding: '0 80px',
                    }}>
                        {/* Premium Logo Icon with Glow */}
                        <div style={{
                            display: 'flex',
                            position: 'relative',
                            marginBottom: '10px',
                        }}>
                            {/* Outer Glow */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${OG_PALETTE.gold}40 0%, transparent 70%)`,
                                display: 'flex',
                            }} />

                            <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={OG_PALETTE.goldLight} />
                                        <stop offset="50%" stopColor={OG_PALETTE.gold} />
                                        <stop offset="100%" stopColor="#b8860b" />
                                    </linearGradient>
                                    <filter id="starGlow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <path
                                    d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                                    fill="url(#starGrad)"
                                    stroke={OG_PALETTE.goldLight}
                                    strokeWidth="1.5"
                                    filter="url(#starGlow)"
                                />
                            </svg>
                        </div>

                        {/* Main Title - Ultra Premium with 3D Effect */}
                        <div style={{
                            fontFamily: '"Cinzel"',
                            fontSize: '110px',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            lineHeight: 0.9,
                            background: `linear-gradient(180deg, #ffffff 0%, ${OG_PALETTE.cream} 30%, ${OG_PALETTE.goldLight} 70%, ${OG_PALETTE.gold} 100%)`,
                            backgroundClip: 'text',
                            color: 'transparent',
                            textShadow: `
                                0 2px 0 ${OG_PALETTE.gold}40,
                                0 4px 8px ${OG_PALETTE.gold}60,
                                0 8px 24px ${OG_PALETTE.gold}40,
                                0 0 60px ${OG_PALETTE.gold}30
                            `,
                            display: 'flex',
                            position: 'relative',
                        }}>
                            <span style={{
                                background: `linear-gradient(180deg, #ffffff 0%, ${OG_PALETTE.cream} 30%, ${OG_PALETTE.goldLight} 70%, ${OG_PALETTE.gold} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}>
                                {title}
                            </span>
                        </div>

                        {/* Elegant Separator with Sacred Geometry */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginTop: '8px',
                            marginBottom: '8px',
                        }}>
                            <div style={{
                                width: '80px',
                                height: '2px',
                                background: `linear-gradient(90deg, transparent 0%, ${OG_PALETTE.gold} 50%, transparent 100%)`,
                                display: 'flex',
                            }} />

                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="8" fill="none" stroke={OG_PALETTE.gold} strokeWidth="1.5" />
                                <circle cx="10" cy="10" r="3" fill={OG_PALETTE.gold} />
                                <path d="M 10 2 L 10 18 M 2 10 L 18 10" stroke={OG_PALETTE.gold} strokeWidth="1" opacity="0.6" />
                            </svg>

                            <div style={{
                                width: '80px',
                                height: '2px',
                                background: `linear-gradient(90deg, transparent 0%, ${OG_PALETTE.gold} 50%, transparent 100%)`,
                                display: 'flex',
                            }} />
                        </div>

                        {/* Subtitle - Glowing */}
                        <div style={{
                            fontFamily: '"Cinzel"',
                            fontSize: '34px',
                            fontWeight: 400,
                            background: `linear-gradient(180deg, ${OG_PALETTE.silver} 0%, ${OG_PALETTE.cream}80 100%)`,
                            backgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            textShadow: `0 0 30px ${OG_PALETTE.silver}40`,
                            display: 'flex',
                        }}>
                            <span style={{
                                background: `linear-gradient(180deg, ${OG_PALETTE.silver} 0%, ${OG_PALETTE.cream}80 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}>
                                {subtitle}
                            </span>
                        </div>

                        {/* Tagline - Mystical */}
                        <div style={{
                            fontFamily: '"Amiri"',
                            fontSize: '26px',
                            fontWeight: 400,
                            color: OG_PALETTE.gold,
                            marginTop: '4px',
                            fontStyle: 'italic',
                            opacity: 0.95,
                            textShadow: `0 0 20px ${OG_PALETTE.gold}60`,
                            letterSpacing: '0.05em',
                            display: 'flex',
                        }}>
                            {tagline}
                        </div>
                    </div>

                    {/* Footer URL with Underline Effect */}
                    <div style={{
                        position: 'absolute',
                        bottom: '55px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <div style={{
                            fontFamily: '"Cinzel"',
                            fontSize: '17px',
                            letterSpacing: '0.35em',
                            color: OG_PALETTE.silver,
                            opacity: 0.7,
                            display: 'flex',
                        }}>
                            HADITH.MUMIN.INK
                        </div>
                        <div style={{
                            width: '200px',
                            height: '1px',
                            background: `linear-gradient(90deg, transparent 0%, ${OG_PALETTE.gold}60 50%, transparent 100%)`,
                            display: 'flex',
                        }} />
                    </div>

                    {/* Ambient Bottom Glow */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '600px',
                        height: '200px',
                        background: `radial-gradient(ellipse at center, ${OG_PALETTE.gold}15 0%, transparent 70%)`,
                        opacity: 0.5,
                        display: 'flex',
                    }} />
                </div>
            ),
            {
                ...size,
                fonts: [
                    cynzelRegular && {
                        name: 'Cinzel',
                        data: cynzelRegular,
                        style: 'normal',
                        weight: 400,
                    },
                    cinzelBold && {
                        name: 'Cinzel',
                        data: cinzelBold,
                        style: 'normal',
                        weight: 700,
                    },
                    amiri && {
                        name: 'Amiri',
                        data: amiri,
                        style: 'normal',
                        weight: 400,
                    },
                ].filter(Boolean) as any,
            }
        );
    } catch (e: any) {
        console.error('Premium OG Image Generation Failed:', e);
        return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
    }
}