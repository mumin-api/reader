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
                    backgroundColor: nobleCream,
                    position: 'relative',
                    padding: '60px',
                }}
            >
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle at 0% 0%, ${lightEmerald} 0%, transparent 50%), radial-gradient(circle at 100% 100%, ${goldSpiritual}15 0%, transparent 50%)`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', top: '40px', left: '40px', right: '40px', bottom: '40px',
                    border: `1px solid ${emeraldRadiant}30`,
                    borderRadius: '32px',
                    display: 'flex'
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    <div style={{
                        width: '120px', height: '120px', background: emeraldRadiant,
                        borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '48px', boxShadow: `0 20px 40px ${emeraldRadiant}30`
                    }}>
                        <svg width="64" height="64" viewBox="0 0 24 24">
                            <LogoPath color="white" />
                        </svg>
                    </div>

                    <h1 style={{
                        color: deepForest,
                        fontSize: '110px',
                        fontWeight: 900,
                        margin: 0,
                        marginBottom: '12px',
                        letterSpacing: '0.15em',
                        display: 'flex',
                    }}>
                        {title}
                    </h1>

                    <div style={{
                        color: goldSpiritual,
                        fontSize: '18px',
                        fontWeight: 800,
                        letterSpacing: '0.4em',
                        marginBottom: '48px',
                        textTransform: 'uppercase',
                        display: 'flex',
                    }}>
                        {isRu ? 'ДОСТОВЕРНЫЕ ХАДИСЫ' : 'AUTHENTIC HADITH'}
                    </div>

                    <p style={{
                        color: deepForest,
                        fontSize: '28px',
                        fontWeight: 500,
                        opacity: 0.6,
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: 1.4,
                        display: 'flex',
                    }}>
                        {subtitle}
                    </p>
                </div>

                <div style={{
                    position: 'absolute', bottom: '80px', display: 'flex', alignItems: 'center', zIndex: 10
                }}>
                    <span style={{ color: deepForest, fontSize: '18px', fontWeight: 400, opacity: 0.4 }}>hadith.mumin.ink</span>
                </div>
            </div>
        ),
        size
    );
}
