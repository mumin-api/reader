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

    console.log('Generating Main OG Image (Flat Version) for locale:', locale);

    // Load fonts
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
                        backgroundColor: OG_PALETTE.midnightGreen, // Solid color
                        color: OG_PALETTE.cream,
                        position: 'relative',
                        // overflow: 'hidden', // Removing overflow for safety
                        // fontFamily: 'sans-serif', // Basic font
                    }}
                >
                    {/* Background Texture & Gradients - REMOVED for Flat Version */}
                    {/* <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: `linear-gradient(135deg, ${OG_PALETTE.midnightGreen} 0%, ${OG_PALETTE.forest} 100%)`,
                    }} /> */}

                    {/* Golden Glow Top - REMOVED */}
                    {/* <div style={{
                        position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
                        width: '800px', height: '300px',
                        background: `${OG_PALETTE.gold}20`,
                        borderRadius: '100%',
                    }} /> */}

                    {/* Islamic Pattern Overlay (Abstract) - REMOVED */}
                    {/* <svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05 }} width="100%" height="100%">
                        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke={OG_PALETTE.cream} strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#pattern)" />
                    </svg> */}

                    {/* Decorative Frame - SIMPLIFIED */}
                    <div style={{
                        position: 'absolute',
                        top: '40px', left: '40px', right: '40px', bottom: '40px',
                        border: `2px solid ${OG_PALETTE.gold}`, // Thicker solid border
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* Inner Border - REMOVED */}
                        {/* <div style={{
                            position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px',
                            border: `1px solid ${OG_PALETTE.border}`,
                            opacity: 0.5,
                        }} /> */}

                        {/* Corner Ornaments - REMOVED */}
                    </div>

                    {/* Content Container */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                        gap: '20px',
                    }}>
                        {/* Logo Icon - Kept simple */}
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                                stroke={OG_PALETTE.gold} strokeWidth="2" />
                        </svg>

                        {/* Main Title - FLAT COLOR */}
                        <div style={{
                            marginTop: '20px',
                            fontFamily: '"Cinzel"', // Restore Font
                            fontSize: '100px', // Slightly smaller
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            lineHeight: 1,
                            // textShadow: `0 0 40px ${OG_PALETTE.gold}60`, // Removed
                            // backgroundImage: `linear-gradient(180deg, ${OG_PALETTE.cream} 0%, ${OG_PALETTE.goldLight} 100%)`, // Removed
                            // backgroundClip: 'text', // Removed
                            color: OG_PALETTE.cream, // Solid color
                        }}>
                            {title}
                        </div>

                        {/* Separator - SIMPLIFIED */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            // opacity: 0.8,
                        }}>
                            <div style={{ width: '60px', height: '2px', background: OG_PALETTE.gold }} />
                            {/* <div style={{ width: '6px', height: '6px', background: OG_PALETTE.gold, transform: 'rotate(45deg)' }} /> */}
                            <div style={{ width: '60px', height: '2px', background: OG_PALETTE.gold }} />
                        </div>

                        {/* Subtitle - FLAT COLOR */}
                        <div style={{
                            fontFamily: '"Cinzel"', // Restore Font
                            fontSize: '32px',
                            color: OG_PALETTE.silver,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                        }}>
                            {subtitle}
                        </div>

                        {/* Tagline - FLAT COLOR */}
                        <div style={{
                            fontFamily: '"Amiri"', // Restore Font
                            fontSize: '24px',
                            color: OG_PALETTE.gold,
                            marginTop: '10px',
                            // opacity: 0.9,
                            fontStyle: 'italic',
                        }}>
                            {tagline}
                        </div>
                    </div>

                    {/* Footer URL */}
                    <div style={{
                        position: 'absolute',
                        bottom: '60px',
                        fontFamily: '"Cinzel"', // Restore Font
                        fontSize: '16px',
                        letterSpacing: '0.3em',
                        color: OG_PALETTE.silver,
                        // opacity: 0.5,
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
                        style: 'normal',
                        weight: 400,
                    },
                ].filter(Boolean) as any,
            }
        );
    } catch (e: any) {
        console.error('OG Image Generation Failed:', e);
        return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
    }
}
