import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Celestial Miracle Palette (Premium Edition)
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

async function getHadith(id: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.hadith.mumin.ink/v1';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    try {
        const res = await fetch(`${API_URL}/hadiths/${id}`, {
            headers: {
                'X-API-Key': API_KEY || '',
            },
            next: { revalidate: 86400 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || data;
    } catch (e) {
        return null;
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const { locale, id } = params;
    const hadith = await getHadith(id);

    if (!hadith) return new Response('Not Found', { status: 404 });

    const rawText = hadith.translation?.text || '';
    const collection = hadith.collection || 'Sahih Collection';
    const num = hadith.hadithNumber;

    const truncatedText = rawText.length > 180
        ? rawText.substring(0, 180).trim() + '...'
        : rawText;

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
                {/* Enhanced Background Gradients */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `radial-gradient(circle at 20% 30%, ${lightEmerald}, transparent 50%)`,
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `radial-gradient(circle at 80% 70%, ${goldSpiritual}25, transparent 50%)`,
                    display: 'flex'
                }} />

                {/* Subtle Pattern Overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `repeating-linear-gradient(45deg, ${emeraldRadiant}03 0px, ${emeraldRadiant}03 1px, transparent 1px, transparent 60px)`,
                    display: 'flex'
                }} />

                {/* Decorative Islamic Corner Ornaments */}
                <div style={{
                    position: 'absolute', top: '30px', left: '30px',
                    width: '80px', height: '80px',
                    borderTop: `3px solid ${emeraldRadiant}40`,
                    borderLeft: `3px solid ${emeraldRadiant}40`,
                    borderTopLeftRadius: '12px',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', top: '30px', right: '30px',
                    width: '80px', height: '80px',
                    borderTop: `3px solid ${goldSpiritual}50`,
                    borderRight: `3px solid ${goldSpiritual}50`,
                    borderTopRightRadius: '12px',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', bottom: '30px', left: '30px',
                    width: '80px', height: '80px',
                    borderBottom: `3px solid ${goldSpiritual}50`,
                    borderLeft: `3px solid ${goldSpiritual}50`,
                    borderBottomLeftRadius: '12px',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', bottom: '30px', right: '30px',
                    width: '80px', height: '80px',
                    borderBottom: `3px solid ${emeraldRadiant}40`,
                    borderRight: `3px solid ${emeraldRadiant}40`,
                    borderBottomRightRadius: '12px',
                    display: 'flex'
                }} />

                {/* Main Content Card with Enhanced Shadow */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '900px',
                    padding: '60px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '48px',
                    border: `2px solid ${emeraldRadiant}20`,
                    boxShadow: `0 25px 50px -12px ${deepForest}15, 0 0 0 1px ${goldSpiritual}20`,
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    {/* Logo Badge with Glow Effect */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                        <div style={{
                            width: '72px', 
                            height: '72px', 
                            background: `linear-gradient(135deg, ${emeraldRadiant}, ${emeraldRadiant}dd)`,
                            borderRadius: '24px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginBottom: '24px',
                            boxShadow: `0 8px 24px ${emeraldRadiant}40, 0 0 0 4px ${emeraldRadiant}10`
                        }}>
                            <svg width="36" height="36" viewBox="0 0 24 24">
                                <LogoPath color="white" />
                            </svg>
                        </div>

                        <div style={{
                            color: emeraldRadiant, 
                            fontSize: '15px', 
                            fontWeight: 800, 
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase', 
                            marginBottom: '10px', 
                            display: 'flex',
                            background: `linear-gradient(90deg, ${emeraldRadiant}, ${goldSpiritual})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            {collection}
                        </div>

                        <div style={{ 
                            color: deepForest, 
                            fontSize: '18px', 
                            opacity: 0.5, 
                            fontWeight: 600, 
                            display: 'flex',
                            letterSpacing: '0.05em'
                        }}>
                            {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                        </div>
                    </div>

                    {/* Enhanced Quote Text */}
                    <div style={{
                        color: deepForest,
                        fontSize: truncatedText.length > 120 ? '32px' : '40px',
                        lineHeight: 1.6,
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        marginBottom: '40px',
                        padding: '0 20px',
                        fontStyle: 'italic',
                        display: 'flex',
                        textShadow: `0 1px 2px ${deepForest}10`
                    }}>
                        "{truncatedText}"
                    </div>

                    {/* Elegant Divider with Enhanced Design */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '240px', 
                        justifyContent: 'space-between' 
                    }}>
                        <div style={{ 
                            height: '2px', 
                            flex: 1, 
                            background: `linear-gradient(to right, transparent, ${goldSpiritual}60, ${goldSpiritual})` 
                        }} />
                        <div style={{ 
                            width: '10px', 
                            height: '10px', 
                            background: `linear-gradient(135deg, ${emeraldRadiant}, ${goldSpiritual})`, 
                            transform: 'rotate(45deg)', 
                            margin: '0 20px',
                            boxShadow: `0 0 12px ${goldSpiritual}60`
                        }} />
                        <div style={{ 
                            height: '2px', 
                            flex: 1, 
                            background: `linear-gradient(to left, transparent, ${goldSpiritual}60, ${goldSpiritual})` 
                        }} />
                    </div>
                </div>

                {/* Enhanced Footer Branding */}
                <div style={{
                    position: 'absolute', 
                    bottom: '70px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    zIndex: 10,
                    padding: '16px 32px',
                    background: `${nobleCream}90`,
                    borderRadius: '100px',
                    border: `1px solid ${emeraldRadiant}15`
                }}>
                    <span style={{ 
                        color: deepForest, 
                        fontSize: '20px', 
                        fontWeight: 900, 
                        letterSpacing: '0.12em', 
                        display: 'flex',
                        background: `linear-gradient(90deg, ${deepForest}, ${emeraldRadiant})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        MUMIN
                    </span>
                    <div style={{ 
                        width: '5px', 
                        height: '5px', 
                        borderRadius: '50%', 
                        background: emeraldRadiant, 
                        margin: '0 16px', 
                        display: 'flex',
                        boxShadow: `0 0 8px ${emeraldRadiant}`
                    }} />
                    <span style={{ 
                        color: deepForest, 
                        fontSize: '18px', 
                        fontWeight: 500, 
                        opacity: 0.6, 
                        display: 'flex' 
                    }}>
                        hadith.mumin.ink
                    </span>
                </div>
            </div>
        ),
        size
    );
}