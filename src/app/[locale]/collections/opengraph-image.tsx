
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

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Left aligned for variety
                    justifyContent: 'center',
                    backgroundColor: emerald950,
                    backgroundImage: `linear-gradient(to right, ${emerald950}, ${emerald900})`,
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        right: '-100px',
                        top: '-50px',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(212,175,55,0.05)',
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: gold500,
                        fontSize: '24px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                    }}
                >
                    ✦ Library
                </div>

                <div
                    style={{
                        fontSize: '80px',
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.1,
                        marginBottom: '40px',
                        maxWidth: '800px',
                        textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    }}
                >
                    Explore Authentic Hadith Collections
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {/* Pills representing collections */}
                    <div style={{ padding: '10px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '99px', color: 'white', fontSize: '24px' }}>
                        Sahih al-Bukhari
                    </div>
                    <div style={{ padding: '10px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '99px', color: 'white', fontSize: '24px' }}>
                        Sahih Muslim
                    </div>
                    <div style={{ padding: '10px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '99px', color: 'white', fontSize: '24px' }}>
                        + More
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '60px',
                        left: '80px',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '24px',
                    }}
                >
                    mumin.ink
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
