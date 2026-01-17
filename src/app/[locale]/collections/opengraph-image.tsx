import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Collections';
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
    const title = isRu ? 'Сборники Хадисов' : 'Hadith Collections';
    const subtitle = isRu
        ? 'Все великие сборники в одном месте'
        : 'All major authentic collections in one place';

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
                }}
            >
                {/* Layer 1: Split Gradients */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `radial-gradient(circle at top left, ${lightEmerald}, transparent)`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `radial-gradient(circle at bottom right, ${goldSpiritual}20, transparent)`,
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
                        width: '80px', height: '80px', background: emeraldRadiant,
                        borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '40px'
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24">
                            <LogoPath color="white" />
                        </svg>
                    </div>

                    <h1 style={{
                        color: deepForest,
                        fontSize: '72px',
                        fontWeight: 900,
                        margin: 0,
                        marginBottom: '16px',
                        letterSpacing: '-0.02em',
                        display: 'flex',
                    }}>
                        {title}
                    </h1>

                    <div style={{
                        display: 'flex', alignItems: 'center', width: '300px', justifyContent: 'space-between', marginBottom: '32px'
                    }}>
                        <div style={{ height: '2px', flex: 1, backgroundImage: `linear-gradient(to right, transparent, ${goldSpiritual})` }} />
                        <div style={{ width: '6px', height: '6px', background: goldSpiritual, transform: 'rotate(45deg)', margin: '0 12px' }} />
                        <div style={{ height: '2px', flex: 1, backgroundImage: `linear-gradient(to left, transparent, ${goldSpiritual})` }} />
                    </div>

                    <p style={{
                        color: deepForest,
                        fontSize: '32px',
                        fontWeight: 500,
                        opacity: 0.6,
                        margin: 0,
                        display: 'flex',
                    }}>
                        {subtitle}
                    </p>
                </div>

                <div style={{
                    position: 'absolute', bottom: '80px', display: 'flex', alignItems: 'center', zIndex: 10
                }}>
                    <span style={{ color: deepForest, fontSize: '18px', fontWeight: 400, opacity: 0.4, display: 'flex' }}>hadith.mumin.ink</span>
                </div>
            </div>
        ),
        size
    );
}