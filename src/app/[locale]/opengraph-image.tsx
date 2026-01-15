import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFile } from 'fs/promises';

export const runtime = 'nodejs';

export const alt = 'Mumin Reader - Authentic Hadiths';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    // Brand Colors
    const emerald950 = '#022c22';
    const emerald900 = '#064e3b';
    const emerald800 = '#065f46';
    const gold500 = '#d4af37';
    const gold400 = '#fbbf24';
    const cream = '#fffdf9';

    // Load Logo
    const logoPath = join(process.cwd(), 'public', 'icons', 'logo.png');
    const logoData = await readFile(logoPath);
    const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

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
                {/* Background Gradients */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 100% 0%, ${emerald800} 0%, transparent 25%),
                            radial-gradient(circle at 0% 100%, ${emerald800} 0%, transparent 25%),
                            linear-gradient(to bottom, ${emerald950}, ${emerald900})
                        `,
                    }}
                />

                {/* Islamic Geometric Frame Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        right: '20px',
                        bottom: '20px',
                        border: `1px solid ${gold500}`,
                        borderRadius: '0px', // Detailed corners could be done with pseudo-elements but hard in CSS-in-JS for OG
                        opacity: 0.3,
                    }}
                />

                {/* Inner Decorative Frame */}
                <div
                    style={{
                        position: 'absolute',
                        top: '26px',
                        left: '26px',
                        right: '26px',
                        bottom: '26px',
                        border: `1px solid ${gold500}`,
                        opacity: 0.15,
                    }}
                />

                {/* Central Diamond Graphic (Rotated Square) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        transform: 'rotate(45deg)',
                        border: `2px solid ${emerald800}`,
                        backgroundColor: 'rgba(6, 78, 59, 0.3)', // emerald900 with alpha
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: '480px',
                            height: '480px',
                            border: `1px solid ${gold500}`,
                            opacity: 0.2,
                        }}
                    />
                </div>

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        transform: 'translateY(-10px)', // Slight optical adjustment
                    }}
                >
                    {/* Brand Logo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logoSrc}
                        width="120"
                        height="120"
                        style={{
                            marginBottom: '30px',
                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                        }}
                        alt="Logo"
                    />

                    {/* Main Title */}
                    <div
                        style={{
                            color: cream,
                            fontSize: 72,
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            marginBottom: 20,
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <span>Mumin Reader</span>
                    </div>

                    {/* Subtitle / Tagline */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        <div style={{ width: '40px', height: '1px', backgroundColor: gold500 }} />
                        <div
                            style={{
                                color: gold400,
                                fontSize: 24,
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontFamily: 'monospace', // Adds a nice tech/modern contrast
                            }}
                        >
                            Authentic Prophetic Wisdom
                        </div>
                        <div style={{ width: '40px', height: '1px', backgroundColor: gold500 }} />
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
