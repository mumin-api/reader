
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadiths';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    // Brand Colors
    const emerald900 = '#064e3b';
    const emerald800 = '#065f46';
    const gold500 = '#d4af37'; // Approximation of gold

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
                    backgroundColor: emerald900,
                    backgroundImage: `linear-gradient(to bottom right, ${emerald900}, ${emerald800})`,
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Geometric Background Pattern (Simplified) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                />

                {/* Central Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                    }}
                >
                    {/* Logo/Icon Placeholder - Using CSS shapes for a book/arch idea if image loading fails, 
              but let's try a simple text logo first which is safer */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '240px',
                            height: '120px',
                            marginBottom: '40px',
                            color: gold500,
                            fontSize: '48px',
                            fontWeight: 'bold',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Mumin
                    </div>

                    <div
                        style={{
                            color: '#ffffff',
                            fontSize: 80,
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            marginBottom: 20,
                            textShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        }}
                    >
                        Mumin Reader
                    </div>

                    <div
                        style={{
                            color: gold500,
                            fontSize: 32,
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Authentic Hadith Collections
                    </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '16px',
                        backgroundColor: gold500,
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
