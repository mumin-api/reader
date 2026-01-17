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

    // Load fonts
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
                    backgroundColor: OG_PALETTE.midnightGreen,
                    color: OG_PALETTE.cream,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Background Texture & Gradients */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle at center, ${OG_PALETTE.forest}40 0%, transparent 70%)`,
                }} />

                {/* Golden Glow Top */}
                <div style={{
                    position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
                    width: '800px', height: '300px',
                    background: `radial-gradient(ellipse at center, ${OG_PALETTE.gold}30, transparent 70%)`,
                    filter: 'blur(80px)',
                }} />

                {/* Islamic Pattern Overlay (Abstract) */}
                <svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05 }} width="100%" height="100%">
                    <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke={OG_PALETTE.cream} strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>

                {/* Decorative Frame */}
                <div style={{
                    position: 'absolute',
                    top: '40px', left: '40px', right: '40px', bottom: '40px',
                    border: `1px solid ${OG_PALETTE.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px',
                        border: `1px solid ${OG_PALETTE.border}`,
                        opacity: 0.5,
                    }} />

                    {/* Corner Ornaments */}
                    {[0, 90, 180, 270].map((deg, i) => (
                        <svg key={i} width="60" height="60" viewBox="0 0 60 60" style={{
                            position: 'absolute',
                            left: deg === 0 || deg === 270 ? -1 : undefined,
                            right: deg === 90 || deg === 180 ? -1 : undefined,
                            top: deg === 0 || deg === 90 ? -1 : undefined,
                            bottom: deg === 180 || deg === 270 ? -1 : undefined,
                            transform: `rotate(${deg}deg)`,
                        }}>
                            <path d="M0 0 H60 V2 H20 C10 2 2 10 2 20 V60 H0 V0Z" fill={OG_PALETTE.gold} />
                        </svg>
                    ))}
                </div>

                {/* Content Container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                    gap: '20px',
                }}>
                    {/* Logo Icon */}
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                            stroke={OG_PALETTE.gold} strokeWidth="1.5" fill={`${OG_PALETTE.gold}20`} />
                    </svg>

                    {/* Main Title */}
                    <div style={{
                        marginTop: '20px',
                        fontFamily: '"Cinzel"',
                        fontSize: '120px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        lineHeight: 1,
                        textShadow: `0 0 40px ${OG_PALETTE.gold}60`,
                        backgroundImage: `linear-gradient(180deg, ${OG_PALETTE.cream} 0%, ${OG_PALETTE.goldLight} 100%)`,
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}>
                        MUMIN
                    </div>

                    {/* Separator */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        opacity: 0.8,
                    }}>
                        <div style={{ width: '60px', height: '1px', background: OG_PALETTE.gold }} />
                        <div style={{ width: '6px', height: '6px', background: OG_PALETTE.gold, transform: 'rotate(45deg)' }} />
                        <div style={{ width: '60px', height: '1px', background: OG_PALETTE.gold }} />
                    </div>

                    {/* Subtitle */}
                    <div style={{
                        fontFamily: '"Cinzel"',
                        fontSize: '32px',
                        color: OG_PALETTE.silver,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                    }}>
                        {subtitle}
                    </div>

                    {/* Tagline / Arabic touch */}
                    <div style={{
                        fontFamily: '"Amiri"',
                        fontSize: '28px',
                        color: OG_PALETTE.gold,
                        marginTop: '10px',
                        opacity: 0.9,
                        fontStyle: 'italic',
                    }}>
                        {tagline}
                    </div>
                </div>

                {/* Footer URL */}
                <div style={{
                    position: 'absolute',
                    bottom: '60px',
                    fontFamily: '"Cinzel"',
                    fontSize: '16px',
                    letterSpacing: '0.3em',
                    color: OG_PALETTE.silver,
                    opacity: 0.5,
                }}>
                    HADITH.MUMIN.INK
                </div>
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
                    style: 'normal', // Amiri doesn't strictly have italic, usually just regular/bold. Italic is often simulated or distinct font.
                    weight: 400,
                },
            ].filter(Boolean) as any,
        }
    );
}
