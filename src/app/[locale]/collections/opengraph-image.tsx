import { ImageResponse } from 'next/og';
import { OG_PALETTE, fetchFont } from '@/lib/og-helper';

export const runtime = 'edge';


export const alt = 'Mumin Reader - Collections';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = isRu ? 'Сборники Хадисов' : 'Hadith Collections';
    const subtitle = isRu
        ? 'Великое Наследие Ислама'
        : 'The Grand Heritage of Islam';

    // Load fonts
    const cinzel = await fetchFont('Cinzel', 700);
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
                {/* Background: Abstract Library shelves sensation */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: `linear-gradient(90deg, ${OG_PALETTE.midnightGreen} 0%, #05332f 50%, ${OG_PALETTE.midnightGreen} 100%)`,
                }} />

                {/* Vertical Book Spine Effects */}
                {[...Array(5)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        top: '-20%', bottom: '-20%',
                        left: `${15 + i * 18}%`,
                        width: '1px',
                        background: `linear-gradient(to bottom, transparent, ${OG_PALETTE.forest}20, transparent)`,
                        opacity: 0.3,
                        transform: 'rotate(15deg)',
                    }} />
                ))}

                {/* Central "Card" or Book Cover Look */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '600px',
                    height: '420px',
                    border: `2px solid ${OG_PALETTE.gold}`,
                    borderRadius: '8px', // Slightly rounded like a book cover
                    backgroundColor: 'rgba(2, 44, 34, 0.8)', // Semi-transparent
                    position: 'relative',
                    boxShadow: `0 20px 50px -10px #000`,
                }}>
                    {/* Inner Border */}
                    <div style={{
                        position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
                        border: `1px solid ${OG_PALETTE.gold}40`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                    }}>
                        {/* Ornament Top */}
                        <div style={{ marginBottom: '30px' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill={OG_PALETTE.gold}>
                                <path d="M12 2L14.4 8.2L21 9.2L16.2 14L17.3 20.6L11.5 17.4L5.7 20.6L6.8 14L2 9.2L8.6 8.2L11 2Z" opacity="0.8" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            margin: 0,
                            fontFamily: '"Cinzel"',
                            fontSize: '64px',
                            textAlign: 'center',
                            color: OG_PALETTE.cream,
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            lineHeight: 1.1,
                        }}>
                            {title.toUpperCase()}
                        </h1>

                        <div style={{
                            width: '100px',
                            height: '2px',
                            backgroundColor: OG_PALETTE.gold,
                            margin: '30px 0',
                            opacity: 0.6,
                        }} />

                        {/* Subtitle */}
                        <p style={{
                            margin: 0,
                            fontFamily: '"Amiri"',
                            fontSize: '32px',
                            textAlign: 'center',
                            color: OG_PALETTE.goldLight,
                            opacity: 0.9,
                        }}>
                            {subtitle}
                        </p>
                    </div>

                    {/* Decorative Vertical Lines on left (spine feel) */}
                    <div style={{
                        position: 'absolute', top: 0, bottom: 0, left: '20px',
                        width: '4px',
                        borderLeft: `1px solid ${OG_PALETTE.gold}40`,
                        borderRight: `1px solid ${OG_PALETTE.gold}40`,
                    }} />
                </div>

                {/* Footer */}
                <div style={{
                    position: 'absolute', bottom: '40px',
                    fontFamily: '"Cinzel"',
                    fontSize: '18px',
                    letterSpacing: '0.2em',
                    color: OG_PALETTE.muted,
                }}>
                    MUMIN READER
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                cinzel && { name: 'Cinzel', data: cinzel, style: 'normal', weight: 700 },
                amiri && { name: 'Amiri', data: amiri, style: 'normal', weight: 400 },
            ].filter(Boolean) as any,
        }
    );
}