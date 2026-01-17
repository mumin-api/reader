
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Explore Hadith Collections - Sahih Bukhari, Muslim, and more';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;
    const emerald900 = '#064e3b';
    const emerald950 = '#022c22';
    const gold500 = '#d4af37';

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

                {/* Main Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: '10',
                        textAlign: 'center',
                        padding: '0 100px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: gold500,
                            fontSize: '24px',
                            fontWeight: 600,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            marginBottom: '30px',
                        }}
                    >
                        ✦ Sacred Library
                    </div>

                    <div
                        style={{
                            fontSize: '80px',
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: 1.1,
                            marginBottom: '50px',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        }}
                    >
                        Explore Authentic Hadith Collections
                    </div>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['Sahih Bukhari', 'Sahih Muslim', 'Sunan an-Nasa\'i', 'Abu Dawood'].map((name) => (
                            <div key={name} style={{
                                padding: '12px 28px',
                                border: `1px solid ${gold500}`,
                                backgroundColor: 'rgba(212,175,55,0.1)',
                                borderRadius: '4px',
                                color: gold400,
                                fontSize: '22px',
                                fontWeight: 600
                            }}>
                                {name}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        color: gold400,
                        fontSize: '24px',
                        opacity: 0.5,
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                    }}
                >
                    hadith.mumin.ink
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
